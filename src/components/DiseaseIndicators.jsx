import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, Activity, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const DiseaseIndicators = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
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

  const diseases = [
    {
      id: 'parkinsons',
      name: "Parkinson's Disease",
      icon: Brain,
      color: "blue",
      description: "Neurodegenerative disorder affecting movement",
      facialIndicators: [
        { metric: "Reduced Facial Expressivity", severity: "high", description: "Hypomimia or masked face" },
        { metric: "Blink Rate Changes", severity: "medium", description: "Decreased spontaneous blinking" },
        { metric: "Facial Rigidity", severity: "high", description: "Increased muscle tone in facial muscles" },
        { metric: "Asymmetrical Expressions", severity: "medium", description: "Unilateral facial weakness" },
      ],
      voiceIndicators: [
        { metric: "Vocal Monotony", severity: "high", description: "Reduced pitch variation (hypophonia)" },
        { metric: "Slurred Speech", severity: "medium", description: "Dysarthria and articulation issues" },
        { metric: "Rushed Speech", severity: "low", description: "Tachyphemia in some cases" },
        { metric: "Voice Tremor", severity: "medium", description: "Vocal cord tremor" },
      ],
    },
    {
      id: 'alzheimers',
      name: "Alzheimer's Disease",
      icon: Brain,
      color: "purple",
      description: "Progressive neurodegenerative disorder",
      facialIndicators: [
        { metric: "Gaze Irregularities", severity: "medium", description: "Reduced eye contact and focus" },
        { metric: "Delayed Reactions", severity: "high", description: "Slower response to stimuli" },
        { metric: "Expression Confusion", severity: "medium", description: "Inappropriate emotional responses" },
        { metric: "Reduced Blink Rate", severity: "low", description: "Changes in spontaneous blinking" },
      ],
      voiceIndicators: [
        { metric: "Speech Pauses", severity: "high", description: "Increased hesitation and word-finding delays" },
        { metric: "Reduced Vocabulary", severity: "medium", description: "Simplified language use" },
        { metric: "Repetitive Speech", severity: "medium", description: "Echoing questions or statements" },
        { metric: "Flat Intonation", severity: "low", description: "Reduced emotional expression in voice" },
      ],
    },
    {
      id: 'depression',
      name: "Depression",
      icon: Brain,
      color: "indigo",
      description: "Mental health disorder affecting mood",
      facialIndicators: [
        { metric: "Flat Affect", severity: "high", description: "Reduced emotional expression" },
        { metric: "Reduced Eye Contact", severity: "medium", description: "Avoidance of gaze" },
        { metric: "Drooping Features", severity: "medium", description: "Lowered mouth corners and eyelids" },
        { metric: "Slow Facial Movements", severity: "low", description: "Psychomotor retardation" },
      ],
      voiceIndicators: [
        { metric: "Slowed Speech", severity: "high", description: "Reduced speech rate (bradylalia)" },
        { metric: "Monotone Voice", severity: "medium", description: "Reduced pitch variation" },
        { metric: "Reduced Volume", severity: "medium", description: "Softer speaking voice" },
        { metric: "Long Pauses", severity: "medium", description: "Increased response latency" },
      ],
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getDiseaseColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'purple': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'indigo': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <section
      id="indicators"
      ref={ref}
      className="section-padding bg-white"
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
              Disease-Specific <span className="text-gradient">Indicators</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Each neurological and mental health disorder presents unique behavioral signatures 
              that our AI system can detect through facial and voice analysis
            </p>
          </motion.div>

          {/* Disease cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {diseases.map((disease) => (
              <motion.div
                key={disease.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedDisease === disease.id 
                    ? getDiseaseColor(disease.color) 
                    : 'border-slate-200'
                }`}
                onClick={() => setSelectedDisease(selectedDisease === disease.id ? null : disease.id)}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${
                    disease.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    disease.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-indigo-100 text-indigo-600'
                  } rounded-xl flex items-center justify-center mr-3`}>
                    <disease.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {disease.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {disease.description}
                    </p>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-slate-800">4</div>
                    <div className="text-slate-600">Facial</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-800">4</div>
                    <div className="text-slate-600">Voice</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-800">8</div>
                    <div className="text-slate-600">Total</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed indicators */}
          {selectedDisease && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8"
            >
              {diseases.filter(d => d.id === selectedDisease).map((disease) => (
                <div key={disease.id}>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center">
                    <disease.icon className="w-8 h-8 mr-3 text-blue-600" />
                    {disease.name} - Detailed Indicators
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Facial Indicators */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-blue-600" />
                        Facial Indicators
                      </h4>
                      <div className="space-y-3">
                        {disease.facialIndicators.map((indicator, index) => (
                          <div key={index} className="bg-white rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-slate-800">
                                {indicator.metric}
                              </h5>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(indicator.severity)}`}>
                                {indicator.severity} severity
                              </span>
                            </div>
                            <p className="text-sm text-slate-600">
                              {indicator.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Voice Indicators */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-purple-600" />
                        Voice Indicators
                      </h4>
                      <div className="space-y-3">
                        {disease.voiceIndicators.map((indicator, index) => (
                          <div key={index} className="bg-white rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-slate-800">
                                {indicator.metric}
                              </h5>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(indicator.severity)}`}>
                                {indicator.severity} severity
                              </span>
                            </div>
                            <p className="text-sm text-slate-600">
                              {indicator.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Detection timeline */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-white"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-semibold">
                Early Detection Timeline
              </h3>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">6-12 Months</h4>
                <p className="text-slate-300 text-sm">
                  Behavioral drift detectable before clinical symptoms
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">3-6 Months</h4>
                <p className="text-slate-300 text-sm">
                  Subtle changes in facial expressions and voice patterns
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">1-3 Months</h4>
                <p className="text-slate-300 text-sm">
                  Noticeable deviations from baseline behavioral patterns
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">Clinical Diagnosis</h4>
                <p className="text-slate-300 text-sm">
                  Traditional diagnosis point - often too late for optimal intervention
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiseaseIndicators;
