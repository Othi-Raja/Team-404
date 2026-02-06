import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Users, TrendingDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const ProblemStatement = () => {
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

  const problems = [
    {
      icon: Clock,
      title: "Late Detection",
      description: "Neurological and mental disorders are often diagnosed after significant neurological damage has occurred",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: AlertTriangle,
      title: "Symptom-Based Diagnosis",
      description: "Current diagnostic methods rely on self-reported symptoms and episodic clinical observations",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Users,
      title: "Limited Access",
      description: "Regular neurological monitoring is inaccessible to many populations due to cost and availability constraints",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: TrendingDown,
      title: "Progressive Nature",
      description: "Without early intervention, these conditions progressively worsen, reducing treatment effectiveness",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section
      id="problem"
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
              The <span className="text-gradient">Detection Gap</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Current healthcare systems miss critical early warning signs of neurological and mental health disorders, 
              leading to delayed interventions and poorer outcomes
            </p>
          </motion.div>

          {/* Problem cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 ${problem.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <problem.icon className={`w-6 h-6 ${problem.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Statistics section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-medical-blue mb-2">
                  60%
                </div>
                <div className="text-slate-600 font-medium">
                  of Parkinson's cases diagnosed after significant motor symptoms
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  2-3 years
                </div>
                <div className="text-slate-600 font-medium">
                  average delay between symptom onset and Alzheimer's diagnosis
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                  50%
                </div>
                <div className="text-slate-600 font-medium">
                  of depression cases go undiagnosed in primary care settings
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-lg text-slate-700 mb-6">
              We need continuous, passive, and accessible monitoring solutions 
              that can detect subtle behavioral changes before clinical symptoms emerge
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-medical-blue text-white rounded-full font-medium">
              <span>Our Solution: AI-Powered Early Detection</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
