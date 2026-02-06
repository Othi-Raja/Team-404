import React, { useRef, useState, useCallback, useEffect } from 'react';

const VoiceAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState([]);
  const [voiceMetrics, setVoiceMetrics] = useState({
    pitchVariation: 0,
    speechRate: 0,
    pauseDuration: 0,
    monotonicity: 0,
    emotionalValence: 0
  });
  const [voiceRiskScore, setVoiceRiskScore] = useState(0);
  const [pitchHistory, setPitchHistory] = useState([]);
  const [volumeHistory, setVolumeHistory] = useState([]);
  
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize audio context
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 4096;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }
  }, []);

  // Calculate pitch from frequency data
  const calculatePitch = useCallback((frequencyData) => {
    if (!frequencyData || frequencyData.length === 0) return 0;
    
    const sampleRate = audioContextRef.current?.sampleRate || 44100;
    const nyquist = sampleRate / 2;
    const binFreq = nyquist / frequencyData.length;
    
    // Find the dominant frequency
    let maxValue = 0;
    let maxIndex = 0;
    
    for (let i = 1; i < frequencyData.length / 2; i++) {
      if (frequencyData[i] > maxValue) {
        maxValue = frequencyData[i];
        maxIndex = i;
      }
    }
    
    // Convert bin index to frequency
    const dominantFreq = maxIndex * binFreq;
    
    // Filter for voice frequency range (80-400 Hz for fundamental frequency)
    if (dominantFreq >= 80 && dominantFreq <= 400 && maxValue > 10) {
      return dominantFreq;
    }
    
    return 0;
  }, []);

  // Calculate volume from time domain data
  const calculateVolume = useCallback((timeData) => {
    if (!timeData || timeData.length === 0) return 0;
    
    let sum = 0;
    for (let i = 0; i < timeData.length; i++) {
      const normalized = (timeData[i] - 128) / 128;
      sum += normalized * normalized;
    }
    
    return Math.sqrt(sum / timeData.length) * 100;
  }, []);

  // Calculate speech rate based on pitch variations
  const calculateSpeechRate = useCallback((pitchHistory) => {
    if (!pitchHistory || pitchHistory.length < 20) return 0;
    
    let variations = 0;
    const threshold = 20; // Hz variation threshold
    
    for (let i = 1; i < pitchHistory.length; i++) {
      if (pitchHistory[i] > 0 && pitchHistory[i-1] > 0) {
        const diff = Math.abs(pitchHistory[i] - pitchHistory[i-1]);
        if (diff > threshold) {
          variations++;
        }
      }
    }
    
    return Math.min((variations / pitchHistory.length) * 200, 100);
  }, []);

  // Calculate pause duration
  const calculatePauseDuration = useCallback((volumeHistory) => {
    if (!volumeHistory || volumeHistory.length < 20) return 0;
    
    let silenceCount = 0;
    const threshold = 5; // Volume threshold for silence
    
    for (let i = 0; i < volumeHistory.length; i++) {
      if (volumeHistory[i] < threshold) {
        silenceCount++;
      }
    }
    
    return Math.min((silenceCount / volumeHistory.length) * 100, 100);
  }, []);

  // Calculate monotonicity (inverse of pitch variation)
  const calculateMonotonicity = useCallback((pitchHistory) => {
    if (!pitchHistory || pitchHistory.length < 20) return 0;
    
    const validPitches = pitchHistory.filter(p => p > 0);
    if (validPitches.length < 10) return 0;
    
    const mean = validPitches.reduce((a, b) => a + b, 0) / validPitches.length;
    const variance = validPitches.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / validPitches.length;
    const stdDev = Math.sqrt(variance);
    
    // Lower standard deviation = more monotonic
    const monotonicity = Math.max(0, 100 - stdDev);
    return Math.min(monotonicity, 100);
  }, []);

  // Calculate emotional valence based on pitch and volume variation
  const calculateEmotionalValence = useCallback((pitchHistory, volumeHistory) => {
    if (!pitchHistory || !volumeHistory || pitchHistory.length < 20) return 0;
    
    const pitchVariation = 100 - calculateMonotonicity(pitchHistory);
    const avgVolume = volumeHistory.reduce((a, b) => a + b, 0) / volumeHistory.length;
    
    // Higher pitch variation and volume = more emotional expression
    const emotionalExpression = (pitchVariation * 0.6 + avgVolume * 0.4);
    return Math.min(emotionalExpression, 100);
  }, [calculateMonotonicity]);

  // Calculate voice risk score
  const calculateVoiceRiskScore = useCallback((metrics) => {
    const weights = {
      pitchVariation: 0.25,
      speechRate: 0.2,
      pauseDuration: 0.2,
      monotonicity: 0.2,
      emotionalValence: 0.15
    };
    
    let score = 0;
    Object.keys(weights).forEach(key => {
      // Inverse some metrics where lower values indicate risk
      let value = metrics[key];
      if (key === 'pitchVariation' || key === 'speechRate' || key === 'emotionalValence') {
        value = 100 - value; // Lower values are riskier
      }
      score += value * weights[key];
    });
    
    return Math.min(score, 100);
  }, []);

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      initAudioContext();
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleRate: 44100
        } 
      });
      
      streamRef.current = stream;
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      let frameCount = 0;
      
      const analyzeAudio = () => {
        if (!isRecording) return;
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        const frequencyData = new Uint8Array(bufferLength);
        const timeData = new Uint8Array(bufferLength);
        
        analyserRef.current.getByteFrequencyData(frequencyData);
        analyserRef.current.getByteTimeDomainData(timeData);
        
        frameCount++;
        
        // Calculate pitch and volume
        const pitch = calculatePitch(frequencyData);
        const volume = calculateVolume(timeData);
        
        // Update history
        setPitchHistory(prev => {
          const newHistory = [...prev, pitch];
          return newHistory.slice(-100); // Keep last 100 frames
        });
        
        setVolumeHistory(prev => {
          const newHistory = [...prev, volume];
          return newHistory.slice(-100);
        });
        
        // Update metrics every 10 frames to reduce noise
        if (frameCount % 10 === 0 && pitchHistory.length >= 20) {
          const newMetrics = {
            pitchVariation: calculateMonotonicity(pitchHistory),
            speechRate: calculateSpeechRate(pitchHistory),
            pauseDuration: calculatePauseDuration(volumeHistory),
            monotonicity: calculateMonotonicity(pitchHistory),
            emotionalValence: calculateEmotionalValence(pitchHistory, volumeHistory)
          };
          
          setVoiceMetrics(newMetrics);
          setVoiceRiskScore(calculateVoiceRiskScore(newMetrics));
        }
        
        // Update visualization data
        setAudioData(Array.from(timeData));
        
        animationRef.current = requestAnimationFrame(analyzeAudio);
      };
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      analyzeAudio();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to use voice analysis');
    }
  }, [isRecording, initAudioContext, calculatePitch, calculateVolume, pitchHistory, volumeHistory, calculateSpeechRate, calculatePauseDuration, calculateMonotonicity, calculateEmotionalValence, calculateVoiceRiskScore]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    setIsRecording(false);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [isRecording]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopRecording();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopRecording]);

  const getVoiceRiskLevel = (score) => {
    if (score < 20) return { level: 'Low', color: 'text-green-400' };
    if (score < 40) return { level: 'Moderate', color: 'text-yellow-400' };
    if (score < 60) return { level: 'Elevated', color: 'text-orange-400' };
    return { level: 'High', color: 'text-red-400' };
  };

  const voiceRiskInfo = getVoiceRiskLevel(voiceRiskScore);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Preventive AI - Voice Analysis System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Audio Visualization */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Audio Waveform</h2>
              <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                {isRecording ? (
                  <svg width="100%" height="100%" viewBox="0 0 400 256">
                    {audioData.map((value, index) => {
                      const x = (index / audioData.length) * 400;
                      const y = 128 + (value - 128) * 2;
                      return (
                        <line
                          key={index}
                          x1={x}
                          y1={128}
                          x2={x}
                          y2={y}
                          stroke="#00ff00"
                          strokeWidth="1"
                        />
                      );
                    })}
                  </svg>
                ) : (
                  <div className="text-gray-500 text-center">
                    <div className="text-6xl mb-4">🎤</div>
                    <p>Click "Start Recording" to begin voice analysis</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center mt-4">
                {isRecording && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500">Recording...</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={startRecording}
                disabled={isRecording}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isRecording ? 'Recording...' : 'Start Recording'}
              </button>
              <button
                onClick={stopRecording}
                disabled={!isRecording}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Stop Recording
              </button>
            </div>
          </div>
          
          {/* Voice Metrics */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Voice Metrics</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Pitch Variation</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${voiceMetrics.pitchVariation}%` }}
                      />
                    </div>
                    <span className="text-sm w-12 text-right">{voiceMetrics.pitchVariation.toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Speech Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${voiceMetrics.speechRate}%` }}
                      />
                    </div>
                    <span className="text-sm w-12 text-right">{voiceMetrics.speechRate.toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Pause Duration</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${voiceMetrics.pauseDuration}%` }}
                      />
                    </div>
                    <span className="text-sm w-12 text-right">{voiceMetrics.pauseDuration.toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Monotonicity</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${voiceMetrics.monotonicity}%` }}
                      />
                    </div>
                    <span className="text-sm w-12 text-right">{voiceMetrics.monotonicity.toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Emotional Valence</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${voiceMetrics.emotionalValence}%` }}
                      />
                    </div>
                    <span className="text-sm w-12 text-right">{voiceMetrics.emotionalValence.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Voice Risk Score */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Voice Risk Assessment</h2>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{voiceRiskScore.toFixed(1)}</div>
                <div className={`text-2xl font-semibold ${voiceRiskInfo.color}`}>
                  {voiceRiskInfo.level} Risk
                </div>
                <div className="text-gray-400 mt-2">
                  {isRecording ? 'Analyzing voice patterns...' : 'Start recording to analyze'}
                </div>
                <div className="text-gray-400 mt-1">
                  Pitch samples: {pitchHistory.length}
                </div>
              </div>
            </div>
            
            {/* Voice Disease Indicators */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Voice Disease Patterns</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Parkinson's Voice:</span>
                  <span className="text-blue-400">
                    {(voiceMetrics.monotonicity * 0.7 + voiceMetrics.pitchVariation * 0.3).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Alzheimer's Speech:</span>
                  <span className="text-purple-400">
                    {(voiceMetrics.pauseDuration * 0.6 + voiceMetrics.speechRate * 0.4).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Depression Voice:</span>
                  <span className="text-green-400">
                    {(voiceMetrics.monotonicity * 0.5 + voiceMetrics.emotionalValence * 0.5).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Autism Speech:</span>
                  <span className="text-yellow-400">
                    {(voiceMetrics.pitchVariation * 0.4 + voiceMetrics.speechRate * 0.6).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAnalysis;
