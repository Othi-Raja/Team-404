import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, Activity, BarChart3, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Explainability = () => {
  const [selectedMetric, setSelectedMetric] = useState('facial');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  // Sample data for behavioral drift visualization
  const driftData = [
    { month: 'Jan', baseline: 0.5, current: 0.5, risk: 0.1 },
    { month: 'Feb', baseline: 0.5, current: 0.6, risk: 0.15 },
    { month: 'Mar', baseline: 0.5, current: 0.7, risk: 0.25 },
    { month: 'Apr', baseline: 0.5, current: 0.8, risk: 0.35 },
    { month: 'May', baseline: 0.5, current: 0.9, risk: 0.45 },
    { month: 'Jun', baseline: 0.5, current: 1.1, risk: 0.65 },
  ];

  const facialMetrics = [
    { time: '00:00', blinkRate: 15, gazeStability: 0.8, expressivity: 0.7 },
    { time: '04:00', blinkRate: 14, gazeStability: 0.75, expressivity: 0.65 },
    { time: '08:00', blinkRate: 12, gazeStability: 0.7, expressivity: 0.6 },
    { time: '12:00', blinkRate: 10, gazeStability: 0.65, expressivity: 0.55 },
    { time: '16:00', blinkRate: 8, gazeStability: 0.6, expressivity: 0.5 },
    { time: '20:00', blinkRate: 7, gazeStability: 0.55, expressivity: 0.45 },
  ];

  const voiceMetrics = [
    { time: '00:00', pitchVariation: 0.8, speechRate: 150, pauseDuration: 0.5 },
    { time: '04:00', pitchVariation: 0.75, speechRate: 145, pauseDuration: 0.6 },
    { time: '08:00', pitchVariation: 0.7, speechRate: 140, pauseDuration: 0.7 },
    { time: '12:00', pitchVariation: 0.65, speechRate: 135, pauseDuration: 0.8 },
    { time: '16:00', pitchVariation: 0.6, speechRate: 130, pauseDuration: 0.9 },
    { time: '20:00', pitchVariation: 0.55, speechRate: 125, pauseDuration: 1.0 },
  ];

  const explainabilityFeatures = [
    {
      icon: BarChart3,
      title: "Interpretable Metrics",
      description: "Clear, quantifiable measurements that clinicians can understand and validate",
      color: "blue",
      details: [
        "Blink rate: 15 blinks/minute (baseline: 18-22)",
        "Gaze deviation: 2.3° from center (baseline: <1°)",
        "Voice monotonicity: 0.72 (baseline: 0.45-0.55)"
      ]
    },
    {
      icon: TrendingUp,
      title: "Temporal Visualization",
      description: "Longitudinal tracking of behavioral changes over time",
      color: "purple",
      details: [
        "Weekly trend analysis",
        "Monthly drift detection",
        "Seasonal pattern recognition"
      ]
    },
    {
      icon: Eye,
      title: "Attention Mechanisms",
      description: "AI model highlights which features contributed most to risk scores",
      color: "indigo",
      details: [
        "Feature importance ranking",
        "Contribution percentages",
        "Confidence intervals"
      ]
    },
    {
      icon: CheckCircle,
      title: "Clinical Validation",
      description: "Correlation with established clinical assessment tools",
      color: "green",
      details: [
        "UPDRS correlation: r=0.87",
        "MMSE correlation: r=0.82",
        "HAM-D correlation: r=0.79"
      ]
    }
  ];

  const riskFactors = [
    { factor: "Reduced Blink Rate", weight: 0.35, status: "elevated" },
    { factor: "Gaze Instability", weight: 0.25, status: "moderate" },
    { factor: "Voice Monotony", weight: 0.20, status: "elevated" },
    { factor: "Facial Rigidity", weight: 0.15, status: "moderate" },
    { factor: "Speech Pauses", weight: 0.05, status: "normal" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'elevated': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'normal': return 'text-green-600 bg-green-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getFeatureColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'indigo': return 'bg-indigo-100 text-indigo-600';
      case 'green': return 'bg-green-100 text-green-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <section
      id="explainability"
      ref={ref}
      className="section-padding bg-gradient-to-b from-white to-slate-50"
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              AI & <span className="text-gradient">Explainability</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our system avoids black-box predictions by providing interpretable metrics, 
              visual insights, and clinician-friendly decision support
            </p>
          </motion.div>

          {/* Main visualization area */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-slate-900">
                Behavioral Drift Analysis
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMetric('facial')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedMetric === 'facial'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Facial Metrics
                </button>
                <button
                  onClick={() => setSelectedMetric('voice')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedMetric === 'voice'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Voice Metrics
                </button>
              </div>
            </div>

            {/* Chart */}
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedMetric === 'facial' ? facialMetrics : voiceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                  {selectedMetric === 'facial' ? (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="blinkRate" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Blink Rate"
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="gazeStability" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="Gaze Stability"
                        dot={{ fill: '#8b5cf6', r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expressivity" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Expressivity"
                        dot={{ fill: '#10b981', r: 4 }}
                      />
                    </>
                  ) : (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="pitchVariation" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Pitch Variation"
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="speechRate" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="Speech Rate"
                        dot={{ fill: '#8b5cf6', r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pauseDuration" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Pause Duration"
                        dot={{ fill: '#10b981', r: 4 }}
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Risk factors */}
            <div className="grid md:grid-cols-5 gap-4">
              {riskFactors.map((factor, index) => (
                <motion.div
                  key={factor.factor}
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-50 rounded-xl p-4 text-center"
                >
                  <div className="text-sm font-medium text-slate-700 mb-2">
                    {factor.factor}
                  </div>
                  <div className="text-lg font-bold text-slate-900 mb-2">
                    {(factor.weight * 100).toFixed(0)}%
                  </div>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(factor.status)}`}>
                    {factor.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Explainability features */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {explainabilityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${getFeatureColor(feature.color)} rounded-xl flex items-center justify-center mr-3`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-slate-600 mb-4">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Drift timeline */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-white"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-semibold">
                Longitudinal Drift Detection
              </h3>
            </div>
            
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={driftData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                    name="Baseline"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    name="Current"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="risk" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.3}
                    name="Risk Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-600/50 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-green-300">Baseline Period</h4>
                <p className="text-slate-300 text-sm">
                  First 2 weeks establish individual behavioral patterns
                </p>
              </div>
              <div className="bg-slate-600/50 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-blue-300">Monitoring Phase</h4>
                <p className="text-slate-300 text-sm">
                  Continuous tracking of deviations from established baseline
                </p>
              </div>
              <div className="bg-slate-600/50 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-red-300">Risk Assessment</h4>
                <p className="text-slate-300 text-sm">
                  Algorithmic detection of significant behavioral drift
                </p>
              </div>
            </div>
          </motion.div>

          {/* Clinical decision support */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Info className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-semibold text-slate-900">
                Clinician Decision Support
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-slate-800 mb-4">What We Provide</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Risk scores with confidence intervals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Feature contribution analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Trend visualizations over time</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Comparison with clinical norms</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-800 mb-4">Clinical Integration</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Augments, not replaces, clinical judgment</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Provides objective behavioral metrics</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Enables earlier intervention opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Supports longitudinal patient monitoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Explainability;
