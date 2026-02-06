import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Mic, Brain, Activity, Shield, ChevronRight, Cpu, Database } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const SolutionArchitecture = () => {
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

  const flowSteps = [
    {
      icon: Camera,
      title: "Data Capture",
      description: "Real-time face and voice data collection",
      color: "bg-blue-100 text-blue-600",
      details: ["Camera input", "Microphone input", "Passive monitoring"]
    },
    {
      icon: Brain,
      title: "MediaPipe Processing",
      description: "468 facial landmark extraction",
      color: "bg-purple-100 text-purple-600",
      details: ["Face detection", "Landmark mapping", "Feature extraction"]
    },
    {
      icon: Mic,
      title: "Voice Analysis",
      description: "Pitch, tempo, and prosody features",
      color: "bg-indigo-100 text-indigo-600",
      details: ["Speech rate", "Pitch variation", "Emotional valence"]
    },
    {
      icon: Activity,
      title: "Behavioral Modeling",
      description: "ML models for drift detection",
      color: "bg-green-100 text-green-600",
      details: ["Temporal analysis", "Pattern recognition", "Anomaly detection"]
    },
    {
      icon: Shield,
      title: "Risk Scoring",
      description: "Explainable insights generation",
      color: "bg-orange-100 text-orange-600",
      details: ["Risk assessment", "Confidence scores", "Interpretability"]
    },
  ];

  return (
    <section
      id="solution"
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
              Solution <span className="text-gradient">Architecture</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A comprehensive pipeline from data capture to explainable insights, 
              designed for continuous, passive monitoring and early intervention
            </p>
          </motion.div>

          {/* Flow diagram */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <div className="relative">
              {/* Connection lines */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 transform -translate-y-1/2 z-0" />
              
              {/* Flow steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
                {flowSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-4 text-center">
                      {step.description}
                    </p>
                    
                    {/* Details */}
                    <div className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-slate-500 flex items-center">
                          <div className="w-1 h-1 bg-slate-400 rounded-full mr-2" />
                          {detail}
                        </div>
                      ))}
                    </div>

                    {/* Arrow for desktop */}
                    {index < flowSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ChevronRight className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Technical details */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Facial Analysis */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Camera className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-slate-900">
                  Facial Analysis Pipeline
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">MediaPipe Face Mesh</h4>
                  <p className="text-slate-600 text-sm">
                    Real-time detection of 468 facial landmarks with sub-millimeter accuracy
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Key Metrics</h4>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>• Blink rate and duration</li>
                    <li>• Gaze deviation patterns</li>
                    <li>• Facial asymmetry analysis</li>
                    <li>• Micro-expression detection</li>
                    <li>• Tremor indicators</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Voice Analysis */}
            <div className="bg-gradient-to-br from-indigo-50 to-green-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Mic className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-2xl font-semibold text-slate-900">
                  Voice Analysis Pipeline
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Signal Processing</h4>
                  <p className="text-slate-600 text-sm">
                    Advanced audio feature extraction using digital signal processing techniques
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Voice Features</h4>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>• Pitch variation and stability</li>
                    <li>• Speech rate and rhythm</li>
                    <li>• Pause patterns and hesitations</li>
                    <li>• Vocal monotonicity</li>
                    <li>• Emotional valence detection</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Machine Learning Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-white"
          >
            <div className="flex items-center mb-6">
              <Cpu className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-semibold">
                Behavioral Drift Detection
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-600/50 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-blue-300">Temporal Modeling</h4>
                <p className="text-slate-300 text-sm">
                  LSTM and Transformer networks capture long-term behavioral patterns
                </p>
              </div>
              <div className="bg-slate-600/50 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-purple-300">Multimodal Fusion</h4>
                <p className="text-slate-300 text-sm">
                  Combines facial and voice features for comprehensive analysis
                </p>
              </div>
              <div className="bg-slate-600/50 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-green-300">Explainable AI</h4>
                <p className="text-slate-300 text-sm">
                  Attention mechanisms provide interpretable insights for clinicians
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionArchitecture;
