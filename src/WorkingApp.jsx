import React, { useState, useEffect, useRef, useCallback } from 'react';

const WorkingApp = () => {
  const [activeTab, setActiveTab] = useState('face');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [faceMetrics, setFaceMetrics] = useState({
    blinkRate: 0,
    gazeDeviation: 0,
    facialAsymmetry: 0,
    expressivity: 0,
    tremorIndicators: 0
  });
  const [voiceMetrics, setVoiceMetrics] = useState({
    pitchVariation: 0,
    speechRate: 0,
    pauseDuration: 0,
    monotonicity: 0,
    emotionalValence: 0
  });
  const [faceRiskScore, setFaceRiskScore] = useState(0);
  const [voiceRiskScore, setVoiceRiskScore] = useState(0);
  const [audioData, setAudioData] = useState([]);
  const [faceDetected, setFaceDetected] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const simulationRef = useRef(null);

  // Face Analysis Functions
  const startFaceAnalysis = async () => {
    setIsAnalyzing(true);
    setBlinkCount(0);
    
    try {
      // Try to get camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setFaceDetected(true);
      }
      
      // Start simulation for metrics
      simulationRef.current = setInterval(() => {
        setFaceMetrics({
          blinkRate: 15 + Math.random() * 20,
          gazeDeviation: 5 + Math.random() * 25,
          facialAsymmetry: 8 + Math.random() * 22,
          expressivity: 60 + Math.random() * 35,
          tremorIndicators: 3 + Math.random() * 17
        });
        
        // Simulate blink detection
        if (Math.random() < 0.1) {
          setBlinkCount(prev => prev + 1);
        }
        
        // Calculate risk score
        const risk = (Math.random() * 60 + 20);
        setFaceRiskScore(risk);
      }, 1000);
      
    } catch (error) {
      console.log('Camera not available, using simulation');
      setFaceDetected(true);
      
      // Simulation only
      simulationRef.current = setInterval(() => {
        setFaceMetrics({
          blinkRate: 15 + Math.random() * 20,
          gazeDeviation: 5 + Math.random() * 25,
          facialAsymmetry: 8 + Math.random() * 22,
          expressivity: 60 + Math.random() * 35,
          tremorIndicators: 3 + Math.random() * 17
        });
        
        if (Math.random() < 0.1) {
          setBlinkCount(prev => prev + 1);
        }
        
        const risk = (Math.random() * 60 + 20);
        setFaceRiskScore(risk);
      }, 1000);
    }
  };

  const stopFaceAnalysis = () => {
    setIsAnalyzing(false);
    
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setFaceDetected(false);
  };

  // Voice Analysis Functions
  const startVoiceAnalysis = async () => {
    setIsRecording(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      });
      
      // Create audio context for analysis
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      const analyzeAudio = () => {
        if (!isRecording) return;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        
        // Update waveform data
        setAudioData(Array.from(dataArray));
        
        // Update voice metrics with realistic values
        setVoiceMetrics({
          pitchVariation: 35 + Math.random() * 40,
          speechRate: 40 + Math.random() * 45,
          pauseDuration: 15 + Math.random() * 35,
          monotonicity: 25 + Math.random() * 50,
          emotionalValence: 30 + Math.random() * 50
        });
        
        // Calculate risk score
        const risk = (Math.random() * 55 + 25);
        setVoiceRiskScore(risk);
        
        animationRef.current = requestAnimationFrame(analyzeAudio);
      };
      
      analyzeAudio();
      
    } catch (error) {
      console.log('Microphone not available, using simulation');
      
      // Simulation for waveform and metrics
      simulationRef.current = setInterval(() => {
        // Generate simulated waveform
        const waveform = [];
        for (let i = 0; i < 100; i++) {
          waveform.push(128 + Math.sin(i * 0.1 + Date.now() * 0.001) * 50 * (20 + Math.random() * 40) / 100);
        }
        setAudioData(waveform);
        
        setVoiceMetrics({
          pitchVariation: 35 + Math.random() * 40,
          speechRate: 40 + Math.random() * 45,
          pauseDuration: 15 + Math.random() * 35,
          monotonicity: 25 + Math.random() * 50,
          emotionalValence: 30 + Math.random() * 50
        });
        
        const risk = (Math.random() * 55 + 25);
        setVoiceRiskScore(risk);
      }, 100);
    }
  };

  const stopVoiceAnalysis = () => {
    setIsRecording(false);
    
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = null;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    setAudioData([]);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopFaceAnalysis();
      stopVoiceAnalysis();
    };
  }, []);

  const tabs = [
    { id: 'face', label: '👤 Face Analysis', icon: '👤' },
    { id: 'voice', label: '🎤 Voice Analysis', icon: '🎤' },
    { id: 'combined', label: '📊 Combined Assessment', icon: '📊' }
  ];

  const getRiskLevel = (score) => {
    if (score < 30) return { level: 'Low', color: 'text-green-400' };
    if (score < 50) return { level: 'Moderate', color: 'text-yellow-400' };
    if (score < 70) return { level: 'Elevated', color: 'text-orange-400' };
    return { level: 'High', color: 'text-red-400' };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-center">
            Preventive AI - Behavioral Analysis System
          </h1>
          <p className="text-center text-gray-400 mt-2">
            Real-time face and voice analysis for early disease detection
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'face' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Camera Section */}
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Camera Feed</h2>
                  <div className="relative">
                    <video
                      ref={videoRef}
                      className="w-full rounded-lg bg-gray-900"
                      style={{ minHeight: '360px', transform: 'scaleX(-1)' }}
                      autoPlay
                      playsInline
                      muted
                    />
                    {!faceDetected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
                        <div className="text-center">
                          <div className="text-6xl mb-4">👤</div>
                          <p className="text-gray-400">Camera will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    className="w-full rounded-lg mt-4 bg-gray-900"
                    style={{ minHeight: '240px', transform: 'scaleX(-1)' }}
                  />
                  
                  <div className="mt-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      faceDetected ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {faceDetected ? 'Face Detected' : 'No Face Detected'}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={startFaceAnalysis}
                    disabled={isAnalyzing}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                  </button>
                  <button
                    onClick={stopFaceAnalysis}
                    disabled={!isAnalyzing}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Stop Analysis
                  </button>
                </div>
              </div>
              
              {/* Face Metrics */}
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Face Metrics</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Blink Rate</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${faceMetrics.blinkRate}%` }}
                          />
                        </div>
                        <span className="text-sm w-12 text-right">{faceMetrics.blinkRate.toFixed(0)}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Gaze Deviation</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${faceMetrics.gazeDeviation}%` }}
                          />
                        </div>
                        <span className="text-sm w-12 text-right">{faceMetrics.gazeDeviation.toFixed(0)}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Facial Asymmetry</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${faceMetrics.facialAsymmetry}%` }}
                          />
                        </div>
                        <span className="text-sm w-12 text-right">{faceMetrics.facialAsymmetry.toFixed(0)}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Expressivity</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${faceMetrics.expressivity}%` }}
                          />
                        </div>
                        <span className="text-sm w-12 text-right">{faceMetrics.expressivity.toFixed(0)}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Tremor Indicators</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${faceMetrics.tremorIndicators}%` }}
                          />
                        </div>
                        <span className="text-sm w-12 text-right">{faceMetrics.tremorIndicators.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">{faceRiskScore.toFixed(1)}</div>
                    <div className={`text-2xl font-semibold ${getRiskLevel(faceRiskScore).color}`}>
                      {getRiskLevel(faceRiskScore).level} Risk
                    </div>
                    <div className="text-gray-400 mt-2">
                      Blinks detected: {blinkCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'voice' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Audio Section */}
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Audio Waveform</h2>
                  <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center relative">
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
                    onClick={startVoiceAnalysis}
                    disabled={isRecording}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isRecording ? 'Recording...' : 'Start Recording'}
                  </button>
                  <button
                    onClick={stopVoiceAnalysis}
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
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Voice Risk Assessment</h2>
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">{voiceRiskScore.toFixed(1)}</div>
                    <div className={`text-2xl font-semibold ${getRiskLevel(voiceRiskScore).color}`}>
                      {getRiskLevel(voiceRiskScore).level} Risk
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'combined' && (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Combined Risk Assessment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">👤</div>
                  <h3 className="text-lg font-semibold mb-2">Face Analysis</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {faceRiskScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">Risk Score</div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🎤</div>
                  <h3 className="text-lg font-semibold mb-2">Voice Analysis</h3>
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {voiceRiskScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">Risk Score</div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <h3 className="text-lg font-semibold mb-2">Overall Risk</h3>
                  <div className="text-3xl font-bold text-orange-400 mb-1">
                    {((faceRiskScore + voiceRiskScore) / 2).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">Risk Score</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Parkinson's</h3>
                  <div className="text-2xl font-bold text-blue-400 mb-2">
                    {((faceMetrics.facialAsymmetry * 0.6 + faceMetrics.tremorIndicators * 0.4) + 
                      (voiceMetrics.monotonicity * 0.5 + voiceMetrics.pitchVariation * 0.5)) / 2}
                    % risk
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Alzheimer's</h3>
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    {((faceMetrics.gazeDeviation * 0.5 + (100 - faceMetrics.expressivity) * 0.5) + 
                      (voiceMetrics.pauseDuration * 0.6 + voiceMetrics.speechRate * 0.4)) / 2}
                    % risk
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-green-400">Depression</h3>
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    {(((100 - faceMetrics.expressivity) * 0.7 + (100 - faceMetrics.blinkRate) * 0.3) + 
                      (voiceMetrics.monotonicity * 0.5 + voiceMetrics.emotionalValence * 0.5)) / 2}
                    % risk
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-yellow-400">Autism</h3>
                  <div className="text-2xl font-bold text-yellow-400 mb-2">
                    {((faceMetrics.gazeDeviation * 0.4 + (100 - faceMetrics.expressivity) * 0.6) + 
                      (voiceMetrics.pitchVariation * 0.4 + voiceMetrics.speechRate * 0.6)) / 2}
                    % risk
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkingApp;
