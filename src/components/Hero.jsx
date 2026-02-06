import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Eye, Mic, ChevronDown, Play } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
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

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-15"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Icon row */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center space-x-6 mb-8"
          >
            <motion.div
              variants={floatingVariants}
              animate="float"
              className="p-4 bg-white rounded-2xl shadow-lg border border-slate-200"
            >
              <Brain className="w-8 h-8 text-medical-blue" />
            </motion.div>
            <motion.div
              variants={floatingVariants}
              animate="float"
              transition={{ delay: 0.5 }}
              className="p-4 bg-white rounded-2xl shadow-lg border border-slate-200"
            >
              <Eye className="w-8 h-8 text-purple-600" />
            </motion.div>
            <motion.div
              variants={floatingVariants}
              animate="float"
              transition={{ delay: 1 }}
              className="p-4 bg-white rounded-2xl shadow-lg border border-slate-200"
            >
              <Mic className="w-8 h-8 text-indigo-600" />
            </motion.div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight"
          >
            <span className="block mb-2">Preventive AI for</span>
            <span className="text-gradient">Early Disease Detection</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Detecting behavioral drift from face and voice analysis to identify 
            neurological and mental health disorders before clinical symptoms appear
          </motion.p>

          {/* Key metrics */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-blue">468</div>
              <div className="text-sm text-slate-600">Facial Landmarks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">3</div>
              <div className="text-sm text-slate-600">Target Disorders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-slate-600">Passive Monitoring</div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-medical-blue text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              View Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-slate-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              Research Paper
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
