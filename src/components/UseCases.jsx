import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Users, Search, Clock, Activity, Shield, Home } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const UseCases = () => {
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

  const useCases = [
    {
      icon: Search,
      title: "Preventive Screening",
      description: "Early detection for at-risk populations before symptoms appear",
      color: "blue",
      scenarios: [
        "Annual health checkups with behavioral baseline",
        "Workplace wellness programs",
        "Community health initiatives",
        "Insurance risk assessment"
      ],
      impact: "Detect risk 6-12 months before clinical diagnosis",
      features: ["Baseline establishment", "Risk stratification", "Referral guidance"]
    },
    {
      icon: Monitor,
      title: "Remote Patient Monitoring",
      description: "Continuous monitoring for patients with existing conditions",
      color: "purple",
      scenarios: [
        "Post-diagnosis progression tracking",
        "Treatment efficacy monitoring",
        "Medication adherence assessment",
        "Telehealth integration"
      ],
      impact: "Reduce hospital visits by 40% while improving care quality",
      features: ["Real-time alerts", "Progress tracking", "Clinical dashboards"]
    },
    {
      icon: Home,
      title: "Elder Care & Assisted Living",
      description: "Non-invasive monitoring for aging populations",
      color: "indigo",
      scenarios: [
        "Independent living support",
        "Fall risk assessment",
        "Cognitive decline monitoring",
        "Family caregiver support"
      ],
      impact: "Extend independent living by 2-3 years on average",
      features: ["Passive monitoring", "Family notifications", "Care coordination"]
    },
    {
      icon: Users,
      title: "Clinical Research",
      description: "Longitudinal studies and therapeutic trials",
      color: "green",
      scenarios: [
        "Drug efficacy trials",
        "Natural history studies",
        "Biomarker validation",
        "Multi-site research collaborations"
      ],
      impact: "Accelerate research timelines by 30%",
      features: ["Data standardization", "Remote enrollment", "Objective endpoints"]
    }
  ];

  const implementationSteps = [
    {
      step: "1",
      title: "Integration",
      description: "Seamless integration with existing healthcare systems and workflows",
      icon: Shield
    },
    {
      step: "2", 
      title: "Onboarding",
      description: "Patient consent and baseline behavioral profile establishment",
      icon: Users
    },
    {
      step: "3",
      title: "Monitoring",
      description: "Continuous passive data collection and analysis",
      icon: Activity
    },
    {
      step: "4",
      title: "Insights",
      description: "Clinician review of behavioral trends and risk indicators",
      icon: Search
    }
  ];

  const getUseCaseColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'purple': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'indigo': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'green': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <section
      id="use-cases"
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
              Real-World <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our preventive AI system transforms healthcare delivery across multiple settings, 
              from clinical environments to home-based care
            </p>
          </motion.div>

          {/* Use cases grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 ${getUseCaseColor(useCase.color)} rounded-xl flex items-center justify-center mr-4`}>
                    <useCase.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {useCase.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {useCase.description}
                    </p>
                  </div>
                </div>

                {/* Scenarios */}
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-800 mb-3">Application Scenarios</h4>
                  <div className="space-y-2">
                    {useCase.scenarios.map((scenario, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3" />
                        {scenario}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Activity className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-slate-800">Impact</h4>
                  </div>
                  <p className="text-slate-700 text-sm font-medium">
                    {useCase.impact}
                  </p>
                </div>

                {/* Key features */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Implementation process */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-white mb-16"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">
              Implementation Process
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              {implementationSteps.map((step, index) => (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-2">
                    {step.step}
                  </div>
                  <h4 className="font-semibold mb-3">{step.title}</h4>
                  <p className="text-slate-300 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Success metrics */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              Measurable Outcomes
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-medical-blue mb-2">
                  85%
                </div>
                <div className="text-slate-600 font-medium mb-2">
                  Early Detection Accuracy
                </div>
                <p className="text-slate-500 text-sm">
                  Successfully identifies behavioral drift before clinical symptoms
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  60%
                </div>
                <div className="text-slate-600 font-medium mb-2">
                  Cost Reduction
                </div>
                <p className="text-slate-500 text-sm">
                  Lower healthcare costs through early intervention and prevention
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                  92%
                </div>
                <div className="text-slate-600 font-medium mb-2">
                  Patient Satisfaction
                </div>
                <p className="text-slate-500 text-sm">
                  Non-invasive monitoring preferred by patients and caregivers
                </p>
              </div>
            </div>
          </motion.div>

          {/* Target audiences */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              Who Benefits Most
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Healthcare Systems</h4>
                <p className="text-slate-600 text-sm">
                  Reduce costs while improving patient outcomes
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Patients</h4>
                <p className="text-slate-600 text-sm">
                  Earlier detection and better quality of life
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center">
                <Monitor className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Clinicians</h4>
                <p className="text-slate-600 text-sm">
                  Objective data for better decision making
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Researchers</h4>
                <p className="text-slate-600 text-sm">
                  Rich longitudinal data for studies
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
