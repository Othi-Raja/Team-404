import React, { useState, useEffect } from 'react';
import FaceAnalysisNew from './FaceAnalysisNew';
import VoiceAnalysisNew from './VoiceAnalysisNew';
import DemoSectionNew from './DemoSectionNew';

const CombinedAnalysisNew = () => {
  const [activeTab, setActiveTab] = useState('face');
  const [combinedRisk, setCombinedRisk] = useState({
    face: 0,
    voice: 0,
    overall: 0
  });

  const tabs = [
    { id: 'face', label: 'Face Analysis', icon: '👤' },
    { id: 'voice', label: 'Voice Analysis', icon: '🎤' },
    { id: 'demo', label: 'Demo Mode', icon: '🎭' },
    { id: 'combined', label: 'Combined Assessment', icon: '📊' }
  ];

  const getOverallRiskLevel = (score) => {
    if (score < 20) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-900' };
    if (score < 40) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-900' };
    if (score < 60) return { level: 'Elevated', color: 'text-orange-400', bg: 'bg-orange-900' };
    return { level: 'High', color: 'text-red-400', bg: 'bg-red-900' };
  };

  const overallRiskInfo = getOverallRiskLevel(combinedRisk.overall);

  // Simulate risk updates (in real app, this would come from actual analysis)
  useEffect(() => {
    const interval = setInterval(() => {
      setCombinedRisk(prev => ({
        face: Math.random() * 100,
        voice: Math.random() * 100,
        overall: Math.random() * 100
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
        {activeTab === 'face' && <FaceAnalysisNew />}
        {activeTab === 'voice' && <VoiceAnalysisNew />}
        {activeTab === 'demo' && <DemoSectionNew />}
        
        {activeTab === 'combined' && (
          <div className="space-y-8">
            {/* Combined Risk Dashboard */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Combined Risk Assessment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Face Risk */}
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">👤</div>
                  <h3 className="text-lg font-semibold mb-2">Face Analysis</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {combinedRisk.face.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">Risk Score</div>
                </div>
                
                {/* Voice Risk */}
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🎤</div>
                  <h3 className="text-lg font-semibold mb-2">Voice Analysis</h3>
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {combinedRisk.voice.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">Risk Score</div>
                </div>
                
                {/* Overall Risk */}
                <div className={`${overallRiskInfo.bg} rounded-lg p-6 text-center border-2 border-opacity-50 ${overallRiskInfo.color.replace('text-', 'border-')}`}>
                  <div className="text-4xl mb-2">📊</div>
                  <h3 className="text-lg font-semibold mb-2">Overall Risk</h3>
                  <div className={`text-3xl font-bold ${overallRiskInfo.color} mb-1`}>
                    {combinedRisk.overall.toFixed(1)}
                  </div>
                  <div className={`text-sm font-medium ${overallRiskInfo.color}`}>
                    {overallRiskInfo.level} Risk
                  </div>
                </div>
              </div>

              {/* Risk Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Risk Level</span>
                  <span className={overallRiskInfo.color}>{overallRiskInfo.level}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      combinedRisk.overall < 20 ? 'bg-green-500' :
                      combinedRisk.overall < 40 ? 'bg-yellow-500' :
                      combinedRisk.overall < 60 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${combinedRisk.overall}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Disease Risk Breakdown */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Disease Risk Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Parkinson's */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      🧠
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Parkinson's</h3>
                      <p className="text-sm text-gray-400">Neurodegenerative</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Facial:</span>
                      <span className="text-blue-400 font-medium">
                        {(combinedRisk.face * 0.6).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Voice:</span>
                      <span className="text-purple-400 font-medium">
                        {(combinedRisk.voice * 0.4).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Combined:</span>
                      <span className="text-blue-400 font-bold">
                        {((combinedRisk.face * 0.6 + combinedRisk.voice * 0.4)).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alzheimer's */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      🧠
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Alzheimer's</h3>
                      <p className="text-sm text-gray-400">Cognitive decline</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Facial:</span>
                      <span className="text-blue-400 font-medium">
                        {(combinedRisk.face * 0.5).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Voice:</span>
                      <span className="text-purple-400 font-medium">
                        {(combinedRisk.voice * 0.5).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Combined:</span>
                      <span className="text-purple-400 font-bold">
                        {((combinedRisk.face * 0.5 + combinedRisk.voice * 0.5)).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Depression */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                      🧠
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Depression</h3>
                      <p className="text-sm text-gray-400">Mental health</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Facial:</span>
                      <span className="text-blue-400 font-medium">
                        {(combinedRisk.face * 0.7).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Voice:</span>
                      <span className="text-purple-400 font-medium">
                        {(combinedRisk.voice * 0.3).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Combined:</span>
                      <span className="text-green-400 font-bold">
                        {((combinedRisk.face * 0.7 + combinedRisk.voice * 0.3)).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Autism */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mr-3">
                      🧠
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Autism</h3>
                      <p className="text-sm text-gray-400">Neurodevelopmental</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Facial:</span>
                      <span className="text-blue-400 font-medium">
                        {(combinedRisk.face * 0.4).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Voice:</span>
                      <span className="text-purple-400 font-medium">
                        {(combinedRisk.voice * 0.6).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Combined:</span>
                      <span className="text-yellow-400 font-bold">
                        {((combinedRisk.face * 0.4 + combinedRisk.voice * 0.6)).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Clinical Recommendations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Immediate Actions</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Schedule comprehensive neurological evaluation
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Begin baseline cognitive and motor function testing
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Consider referral to movement disorder specialist
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Monitoring Plan</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      Weekly behavioral analysis tracking
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      Monthly clinical assessment updates
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      Quarterly comprehensive evaluation
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-400 mb-4">
                To get accurate combined risk assessment, please run both Face Analysis and Voice Analysis first.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('face')}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Run Face Analysis
                </button>
                <button
                  onClick={() => setActiveTab('voice')}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Run Voice Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedAnalysisNew;
