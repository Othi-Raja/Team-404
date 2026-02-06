import React, { useState, useEffect } from 'react';

const SimpleTest = () => {
  const [counter, setCounter] = useState(0);
  const [metrics, setMetrics] = useState({
    blinkRate: 15,
    gazeDeviation: 10,
    facialAsymmetry: 12,
    expressivity: 75,
    tremorIndicators: 8
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
      setMetrics(prev => ({
        blinkRate: 15 + Math.random() * 10,
        gazeDeviation: 10 + Math.random() * 15,
        facialAsymmetry: 12 + Math.random() * 13,
        expressivity: 75 + Math.random() * 20,
        tremorIndicators: 8 + Math.random() * 12
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          AI Disease Detection System - Working Version
        </h1>
        
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">System Status</h2>
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-green-400 mb-2">
              ✅ WORKING
            </div>
            <div className="text-xl text-gray-300">
              Counter: {counter} | Updates every second
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Face Analysis Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Blink Rate</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.blinkRate}%` }}
                  />
                </div>
                <span className="text-sm w-12 text-right">{metrics.blinkRate.toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Gaze Deviation</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.gazeDeviation}%` }}
                  />
                </div>
                <span className="text-sm w-12 text-right">{metrics.gazeDeviation.toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Facial Asymmetry</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.facialAsymmetry}%` }}
                  />
                </div>
                <span className="text-sm w-12 text-right">{metrics.facialAsymmetry.toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Expressivity</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.expressivity}%` }}
                  />
                </div>
                <span className="text-sm w-12 text-right">{metrics.expressivity.toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Tremor Indicators</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.tremorIndicators}%` }}
                  />
                </div>
                <span className="text-sm w-12 text-right">{metrics.tremorIndicators.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Disease Risk Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Parkinson's Disease</h3>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {((metrics.facialAsymmetry * 0.6 + metrics.tremorIndicators * 0.4)).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Risk Score</div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Alzheimer's Disease</h3>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {((metrics.gazeDeviation * 0.5 + (100 - metrics.expressivity) * 0.5)).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Risk Score</div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">Depression</h3>
              <div className="text-3xl font-bold text-green-400 mb-2">
                {(((100 - metrics.expressivity) * 0.7 + (100 - metrics.blinkRate) * 0.3)).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Risk Score</div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Autism Spectrum</h3>
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {((metrics.gazeDeviation * 0.4 + (100 - metrics.expressivity) * 0.6)).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Risk Score</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">System Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Status:</span>
              <span className="text-green-400 font-medium">Fully Functional</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Update Rate:</span>
              <span className="text-blue-400 font-medium">Real-time (1 second)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Diseases Covered:</span>
              <span className="text-purple-400 font-medium">4 Conditions</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Analysis Type:</span>
              <span className="text-orange-400 font-medium">Simulated (Realistic)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTest;
