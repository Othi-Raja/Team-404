import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
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

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container-custom py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Main content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">Preventive AI</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Advanced AI-driven preventive healthcare system for early detection 
                of neurological and mental health disorders through behavioral analysis.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#problem" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Problem Statement
                  </a>
                </li>
                <li>
                  <a href="#solution" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Solution Architecture
                  </a>
                </li>
                <li>
                  <a href="#indicators" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Disease Indicators
                  </a>
                </li>
                <li>
                  <a href="#ethics" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Ethics & Privacy
                  </a>
                </li>
                <li>
                  <a href="#use-cases" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Use Cases
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Technology */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Technology</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#tech-stack" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Tech Stack
                  </a>
                </li>
                <li>
                  <a href="#explainability" className="text-slate-300 hover:text-white transition-colors text-sm">
                    AI & Explainability
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Future Roadmap
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">
                    Research Papers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">
                    API Documentation
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center text-slate-300 text-sm">
                  <Mail className="w-4 h-4 mr-3 text-blue-400" />
                  <span>info@preventiveai.health</span>
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <Phone className="w-4 h-4 mr-3 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3 text-sm">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-700 border border-slate-600 rounded-l-lg px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 flex-1"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-r-lg text-sm font-medium transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom section */}
          <motion.div
            variants={itemVariants}
            className="border-t border-slate-700 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2024 Preventive AI System. All rights reserved.
              </div>
              
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Compliance
                </a>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            variants={itemVariants}
            className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700"
          >
            <p className="text-slate-400 text-xs text-center">
              <strong>Disclaimer:</strong> This system is designed for research and preventive screening purposes only. 
              It is not intended to replace professional medical diagnosis, treatment, or advice. 
              Always consult qualified healthcare providers for medical concerns.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
