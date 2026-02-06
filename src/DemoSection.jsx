import React, { useState, useEffect } from 'react';

const DemoSection = () => {
  const [demoMode, setDemoMode] = useState('parkinsons');
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoData, setDemoData] = useState({
    normal: { blinkRate: 15, gazeDeviation: 5, facialAsymmetry: 10, expressivity: 80, tremorIndicators: 5 },
    parkinsons: { blinkRate: 8, gazeDeviation: 15, facialAsymmetry: 35, expressivity: 20, tremorIndicators: 45 },
    alzheimers: { blinkRate: 12, gazeDeviation: 25, facialAsymmetry: 20, expressivity: 30, tremorIndicators: 15 },
    depression: { blinkRate: 10, gazeDeviation: 20, facialAsymmetry: 15, expressivity: 25, tremorIndicators: 10 }
  });

  const demoScenarios = {
    normal: {
      name: "Healthy Individual",
      description: "Normal behavioral patterns",
      risk: 12,
      color: "green"
    },
    parkinsons: {
      name: "Parkinson's Disease",
      description: "Reduced facial expressivity, tremors, rigidity",
      risk: 68,
      color: "orange"
    },
    alzheimers: {
      name: "Alzheimer's Disease", 
      description: "Gaze irregularities, delayed reactions",
      risk: 55,
      color: "yellow"
    },
    depression: {
      name: "Depression",
      description: "Flat affect, reduced expressivity",
      risk: 42,
      color: "blue"
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setDemoData(prev => {
          const newData = { ...prev };
          const currentMode = demoMode;
          
          // Add realistic variations
          Object.keys(newData[currentMode]).forEach(key => {
            const variation = (Math.random() - 0.5) * 5; // ±2.5% variation
            newData[currentMode][key] = Math.max(0, Math.min(100, 
              newData[currentMode][key] + variation));
          });
          
          return newData;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, demoMode]);

  const currentData = demoData[demoMode];
  const currentScenario = demoScenarios[demoMode];

  const getRiskColor = (risk) => {
    if (risk < 20) return 'text-green-400';
    if (risk < 40) return 'text-blue-400';
    if (risk < 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressBarColor = (value) => {
    if (value < 30) return 'bg-green-500';
    if (value < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          AI Disease Detection Demo
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Simulated behavioral patterns for different neurological conditions
        </p>

        {/* Demo Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Object.keys(demoScenarios).map((mode) => (
              <button
                key={mode}
                onClick={() => setDemoMode(mode)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  demoMode === mode
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold mb-1">{demoScenarios[mode].name}</div>
                <div className="text-sm text-gray-400">{demoScenarios[mode].description}</div>
                <div className={`text-sm mt-2 font-medium ${getRiskColor(demoScenarios[mode].risk)}`}>
                  Risk: {demoScenarios[mode].risk}%
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isPlaying ? 'Stop Simulation' : 'Start Simulation'}
            </button>
          </div>
        </div>

        {/* Current Scenario Display */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {currentScenario.name} Simulation
          </h2>
          
          {/* Risk Score */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold mb-2">
              <span className={getRiskColor(currentScenario.risk)}>
                {currentScenario.risk}
              </span>
            </div>
            <div className={`text-xl font-semibold ${getRiskColor(currentScenario.risk)}`}>
              Risk Assessment
            </div>
            {isPlaying && (
              <div className="flex items-center justify-center mt-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-green-500">Simulating Live Data</span>
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-blue-400">Blink Rate</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{currentData.blinkRate.toFixed(1)}</span>
                <span className="text-sm text-gray-400">blinks/min</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(currentData.blinkRate)}`}
                  style={{ width: `${currentData.blinkRate}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Normal: 15-20 blinks/min
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-400">Gaze Deviation</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{currentData.gazeDeviation.toFixed(1)}</span>
                <span className="text-sm text-gray-400">degrees</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(currentData.gazeDeviation)}`}
                  style={{ width: `${currentData.gazeDeviation}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Normal: {'<'}5° deviation
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-orange-400">Facial Asymmetry</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{currentData.facialAsymmetry.toFixed(1)}</span>
                <span className="text-sm text-gray-400">%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(currentData.facialAsymmetry)}`}
                  style={{ width: `${currentData.facialAsymmetry}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Normal: {'<'}10% asymmetry
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-green-400">Expressivity</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{currentData.expressivity.toFixed(1)}</span>
                <span className="text-sm text-gray-400">%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(100 - currentData.expressivity)}`}
                  style={{ width: `${currentData.expressivity}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Normal: {'>'}70% expressivity
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-red-400">Tremor Indicators</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{currentData.tremorIndicators.toFixed(1)}</span>
                <span className="text-sm text-gray-400">%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(currentData.tremorIndicators)}`}
                  style={{ width: `${currentData.tremorIndicators}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Normal: {'<'}5% tremors
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-indigo-400">ML Confidence</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">
                  {(85 + Math.random() * 10).toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${85 + Math.random() * 10}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Model confidence score
              </div>
            </div>
          </div>
        </div>

        {/* Disease Pattern Analysis */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Pattern Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Key Indicators</h3>
              <div className="space-y-3">
                {demoMode === 'parkinsons' && (
                  <>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span>Reduced blink rate (hypomimia)</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span>Facial rigidity and asymmetry</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span>Tremor indicators present</span>
                    </div>
                  </>
                )}
                {demoMode === 'alzheimers' && (
                  <>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      <span>Gaze irregularities and wandering</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      <span>Delayed reaction times</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      <span>Reduced facial expressivity</span>
                    </div>
                  </>
                )}
                {demoMode === 'depression' && (
                  <>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Flat affect and low expressivity</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Reduced eye contact</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Slowed facial movements</span>
                    </div>
                  </>
                )}
                {demoMode === 'normal' && (
                  <>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Normal blink rate (15-20/min)</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Stable gaze patterns</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Symmetrical facial expressions</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-purple-400">ML Model Insights</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Feature Importance:</span>
                  <span className="text-purple-400">
                    {demoMode === 'parkinsons' ? 'Tremor (45%)' :
                     demoMode === 'alzheimers' ? 'Gaze (38%)' :
                     demoMode === 'depression' ? 'Expressivity (42%)' :
                     'Balanced (25% each)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Pattern Strength:</span>
                  <span className="text-purple-400">
                    {(currentScenario.risk / 100 * 0.9).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Anomaly Score:</span>
                  <span className="text-purple-400">
                    {(currentScenario.risk * 1.2).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Classification:</span>
                  <span className={`font-medium ${getRiskColor(currentScenario.risk)}`}>
                    {currentScenario.name}
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

export default DemoSection;
