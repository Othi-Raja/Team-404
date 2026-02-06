import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe, Users, Shield, Zap, Brain, Heart, Award } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Roadmap = () => {
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

  const roadmapPhases = [
    {
      quarter: "Q1 2024",
      title: "Multilingual Voice Analysis",
      description: "Expand voice analysis capabilities to support multiple languages and dialects",
      icon: Globe,
      color: "blue",
      features: [
        "English, Spanish, Mandarin, Hindi support",
        "Language-specific phonetic models",
        "Cross-lingual pattern recognition",
        "Cultural nuance detection"
      ],
      impact: "Increase global accessibility by 300%"
    },
    {
      quarter: "Q2 2024",
      title: "Wearable Integration",
      description: "Integrate with smartwatches and fitness trackers for comprehensive monitoring",
      icon: Heart,
      color: "purple",
      features: [
        "Apple Watch & Wear OS compatibility",
        "Heart rate variability correlation",
        "Sleep pattern analysis",
        "Physical activity tracking"
      ],
      impact: "Enhanced multimodal data collection"
    },
    {
      quarter: "Q3 2024",
      title: "Clinical Validation Trials",
      description: "Large-scale clinical studies across multiple healthcare institutions",
      icon: Users,
      color: "indigo",
      features: [
        "Multi-center randomized trials",
        "10,000+ participant enrollment",
        "FDA regulatory submission preparation",
        "Peer-reviewed publication pipeline"
      ],
      impact: "Regulatory approval pathway"
    },
    {
      quarter: "Q4 2024",
      title: "Regulatory Compliance",
      description: "Achieve full regulatory compliance for medical device deployment",
      icon: Shield,
      color: "green",
      features: [
        "FDA 510(k) clearance",
        "CE marking for EU markets",
        "HIPAA/GDPR certification renewal",
        "ISO 13485 medical device quality"
      ],
      impact: "Commercial market entry"
    }
  ];

  const futureEnhancements = [
    {
      title: "Advanced AI Models",
      description: "Next-generation machine learning architectures",
      icon: Brain,
      color: "blue",
      timeline: "2025",
      items: [
        "Multimodal transformer networks",
        "Self-supervised learning",
        "Federated learning for privacy",
        "Explainable AI improvements"
      ]
    },
    {
      title: "Expanded Disease Detection",
      description: "Additional neurological and mental health conditions",
      icon: Zap,
      color: "purple",
      timeline: "2025-2026",
      items: [
        "Multiple sclerosis detection",
        "ALS early indicators",
        "Anxiety disorders",
        "Cognitive impairment screening"
      ]
    },
    {
      title: "Digital Therapeutics",
      description: "Integrated treatment and intervention platforms",
      icon: Heart,
      color: "indigo",
      timeline: "2026",
      items: [
        "Personalized exercise programs",
        "Cognitive training integration",
        "Medication adherence monitoring",
        "Telehealth platform integration"
      ]
    },
    {
      title: "Global Deployment",
      description: "Worldwide healthcare system integration",
      icon: Globe,
      color: "green",
      timeline: "2026-2027",
      items: [
        "Asia-Pacific expansion",
        "European healthcare networks",
        "African healthcare initiatives",
        "Latin American partnerships"
      ]
    }
  ];

  const milestones = [
    {
      date: "2024",
      title: "Regulatory Approval",
      description: "FDA clearance and CE marking",
      completed: false,
      icon: Award
    },
    {
      date: "2025",
      title: "1M Users",
      description: "Reach one million monitored users",
      completed: false,
      icon: Users
    },
    {
      date: "2026",
      title: "Global Expansion",
      description: "Deploy in 50+ countries",
      completed: false,
      icon: Globe
    },
    {
      date: "2027",
      title: "IPO",
      description: "Public market debut",
      completed: false,
      icon: Zap
    }
  ];

  const getPhaseColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'purple': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'indigo': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'green': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getEnhancementColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      case 'indigo': return 'bg-indigo-50 text-indigo-600';
      case 'green': return 'bg-green-50 text-green-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <section
      id="roadmap"
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
              Future <span className="text-gradient">Roadmap</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our strategic vision for advancing preventive healthcare through AI innovation, 
              regulatory compliance, and global accessibility
            </p>
          </motion.div>

          {/* 2024 Roadmap */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              2024 Development Milestones
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roadmapPhases.map((phase, index) => (
                <motion.div
                  key={phase.quarter}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 ${getPhaseColor(phase.color)} rounded-xl flex items-center justify-center mr-3`}>
                      <phase.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-blue-600">
                        {phase.quarter}
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-slate-900 mb-3">
                    {phase.title}
                  </h4>
                  
                  <p className="text-sm text-slate-600 mb-4">
                    {phase.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {phase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-slate-500">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-slate-700">
                      Impact: {phase.impact}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Enhancements */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-white mb-16"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">
              Long-Term Vision 2025-2027
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {futureEnhancements.map((enhancement, index) => (
                <div key={enhancement.title} className="bg-slate-600/50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 ${getEnhancementColor(enhancement.color)} rounded-lg flex items-center justify-center mr-3`}>
                      <enhancement.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{enhancement.title}</h4>
                      <div className="text-sm text-slate-400">{enhancement.timeline}</div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-4">
                    {enhancement.description}
                  </p>
                  
                  <div className="space-y-2">
                    {enhancement.items.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Strategic Milestones */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              Strategic Milestones
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.date} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <milestone.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-lg font-semibold text-slate-900 mb-1">
                    {milestone.date}
                  </div>
                  <h4 className="font-medium text-slate-800 mb-2">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {milestone.description}
                  </p>
                  <div className="mt-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      milestone.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {milestone.completed ? 'Completed' : 'Planned'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-medical-blue text-white rounded-full font-medium mb-6">
              <Calendar className="w-5 h-5" />
              Join Our Journey
            </div>
            
            <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-8">
              We're building the future of preventive healthcare. Partner with us to 
              revolutionize early disease detection and improve millions of lives worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-medical-blue text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Partnership Opportunities
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-slate-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
              >
                Investment Information
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Roadmap;
