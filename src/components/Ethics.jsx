import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, CheckCircle, AlertTriangle, Scale, Heart } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Ethics = () => {
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

  const privacyFeatures = [
    {
      icon: Lock,
      title: "On-Device Processing",
      description: "All facial and voice analysis happens locally on the user's device",
      color: "green",
      details: [
        "No raw biometric data leaves the device",
        "Only encrypted insights are transmitted",
        "Processing happens in real-time on device hardware"
      ]
    },
    {
      icon: Eye,
      title: "No Facial Identity Storage",
      description: "We never store facial images or biometric identifiers",
      color: "blue",
      details: [
        "Facial landmarks are processed and immediately discarded",
        "No facial recognition or identity tracking",
        "Mathematical representations only, no visual data"
      ]
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "All data transmission uses military-grade encryption",
      color: "purple",
      details: [
        "AES-256 encryption for all data in transit",
        "Zero-knowledge architecture for cloud storage",
        "Regular security audits and penetration testing"
      ]
    },
    {
      icon: Users,
      title: "Explicit Consent Management",
      description: "Users maintain complete control over their data",
      color: "indigo",
      details: [
        "Granular consent for each data type",
        "Easy withdrawal of consent at any time",
        "Transparent data usage policies"
      ]
    }
  ];

  const ethicalPrinciples = [
    {
      icon: Scale,
      title: "Bias Mitigation",
      description: "Proactive measures to ensure fairness across diverse populations",
      points: [
        "Diverse training datasets representing multiple demographics",
        "Regular bias audits and model retraining",
        "Equitable performance validation across age, gender, and ethnicity"
      ]
    },
    {
      icon: Heart,
      title: "Beneficence",
      description: "Prioritizing patient welfare and clinical benefit",
      points: [
        "Clinician-in-the-loop decision making",
        "Focus on early intervention and prevention",
        "Avoidance of unnecessary anxiety or false alarms"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Risk Minimization",
      description: "Comprehensive risk assessment and mitigation strategies",
      points: [
        "False positive/negative rate optimization",
        "Clear communication of system limitations",
        "Emergency protocols for critical detections"
      ]
    }
  ];

  const complianceStandards = [
    { name: "HIPAA", status: "compliant", description: "Health Insurance Portability and Accountability Act" },
    { name: "GDPR", status: "compliant", description: "General Data Protection Regulation" },
    { name: "FDA", status: "in-progress", description: "Food and Drug Administration clearance pathway" },
    { name: "ISO 27001", status: "certified", description: "Information Security Management System" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50';
      case 'certified': return 'text-blue-600 bg-blue-50';
      case 'in-progress': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getFeatureColor = (color) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'indigo': return 'bg-indigo-100 text-indigo-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <section
      id="ethics"
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
              Ethics, <span className="text-gradient">Privacy & Consent</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to responsible AI development with privacy-first design, 
              ethical principles, and regulatory compliance
            </p>
          </motion.div>

          {/* Privacy features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {privacyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 ${getFeatureColor(feature.color)} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 text-sm mb-4">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start text-xs text-slate-500">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ethical principles */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-16"
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              Responsible AI Principles
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {ethicalPrinciples.map((principle, index) => (
                <div key={principle.title} className="bg-white rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <principle.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {principle.title}
                    </h4>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4">
                    {principle.description}
                  </p>
                  
                  <div className="space-y-2">
                    {principle.points.map((point, idx) => (
                      <div key={idx} className="flex items-start text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data flow transparency */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-slate-200 rounded-2xl p-8 mb-16 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              Transparent Data Flow
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Data Capture</h4>
                <p className="text-sm text-slate-600">
                  Camera and microphone input with explicit user consent
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Local Processing</h4>
                <p className="text-sm text-slate-600">
                  On-device feature extraction and analysis
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Encrypted Insights</h4>
                <p className="text-sm text-slate-600">
                  Only processed metrics are transmitted securely
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Clinical Review</h4>
                <p className="text-sm text-slate-600">
                  Healthcare professionals access interpretable results
                </p>
              </div>
            </div>
          </motion.div>

          {/* Compliance standards */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">
              Regulatory Compliance
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              {complianceStandards.map((standard, index) => (
                <div key={standard.name} className="bg-slate-600/50 rounded-xl p-4 text-center">
                  <h4 className="text-lg font-semibold mb-2">{standard.name}</h4>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    standard.status === 'compliant' ? 'bg-green-500 text-white' :
                    standard.status === 'certified' ? 'bg-blue-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {standard.status === 'compliant' ? 'Compliant' :
                     standard.status === 'certified' ? 'Certified' :
                     'In Progress'}
                  </div>
                  <p className="text-slate-300 text-sm">
                    {standard.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* User rights */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-medical-blue text-white rounded-full font-medium mb-6">
              <Shield className="w-5 h-5" />
              Your Rights, Our Responsibility
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-2">Data Control</h4>
                <p className="text-sm text-slate-600">
                  Complete control over your health data with easy export and deletion options
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-2">Transparency</h4>
                <p className="text-sm text-slate-600">
                  Clear explanations of how your data is used and processed
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-2">Accountability</h4>
                <p className="text-sm text-slate-600">
                  We take responsibility for our AI systems and their impacts
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ethics;
