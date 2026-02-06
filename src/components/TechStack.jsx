import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Globe, Shield, Code, Zap, Layers, Terminal } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const TechStack = () => {
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

  const techCategories = [
    {
      title: "Computer Vision",
      icon: Globe,
      color: "blue",
      technologies: [
        {
          name: "MediaPipe Face Mesh",
          description: "Real-time 468 facial landmark detection",
          features: ["Sub-millisecond latency", "Mobile optimization", "High accuracy"],
          version: "0.4.1633559619"
        },
        {
          name: "OpenCV",
          description: "Computer vision and image processing",
          features: ["Feature extraction", "Image preprocessing", "Real-time analysis"],
          version: "4.8.0"
        },
        {
          name: "TensorFlow Lite",
          description: "On-device machine learning inference",
          features: ["Edge deployment", "Model optimization", "Hardware acceleration"],
          version: "2.13.0"
        }
      ]
    },
    {
      title: "Audio Processing",
      icon: Zap,
      color: "purple",
      technologies: [
        {
          name: "Librosa",
          description: "Audio analysis and feature extraction",
          features: ["Pitch analysis", "Spectral features", "Temporal patterns"],
          version: "0.10.1"
        },
        {
          name: "SciPy Signal",
          description: "Digital signal processing",
          features: ["Filtering", "Spectral analysis", "Windowing functions"],
          version: "1.11.0"
        },
        {
          name: "Webrtc VAD",
          description: "Voice activity detection",
          features: ["Speech detection", "Noise filtering", "Segmentation"],
          version: "2.0.10"
        }
      ]
    },
    {
      title: "Machine Learning",
      icon: Cpu,
      color: "indigo",
      technologies: [
        {
          name: "PyTorch",
          description: "Deep learning framework",
          features: ["LSTM networks", "Attention mechanisms", "Transformer models"],
          version: "2.0.1"
        },
        {
          name: "Scikit-learn",
          description: "Traditional machine learning",
          features: ["Random forests", "SVM classifiers", "Feature selection"],
          version: "1.3.0"
        },
        {
          name: "XGBoost",
          description: "Gradient boosting framework",
          features: ["Risk scoring", "Feature importance", "Fast inference"],
          version: "1.7.0"
        }
      ]
    },
    {
      title: "Web Technologies",
      icon: Code,
      color: "green",
      technologies: [
        {
          name: "React",
          description: "Frontend framework",
          features: ["Component architecture", "Real-time updates", "Responsive design"],
          version: "18.2.0"
        },
        {
          name: "WebRTC",
          description: "Real-time communication",
          features: ["Camera access", "Audio streaming", "Low latency"],
          version: "1.4.0"
        },
        {
          name: "WebAssembly",
          description: "High-performance web execution",
          features: ["Near-native speed", "Cross-platform", "Secure sandbox"],
          version: "2.0.0"
        }
      ]
    }
  ];

  const infrastructure = [
    {
      component: "Frontend",
      technologies: ["React 18.2.0", "TailwindCSS 3.3.2", "Framer Motion 10.12.16", "Recharts 2.7.2"],
      icon: Globe,
      color: "blue"
    },
    {
      component: "Backend",
      technologies: ["Python 3.11", "FastAPI", "PostgreSQL", "Redis"],
      icon: Database,
      color: "purple"
    },
    {
      component: "ML/AI",
      technologies: ["PyTorch 2.0.1", "MediaPipe", "TensorFlow Lite", "Scikit-learn"],
      icon: Cpu,
      color: "indigo"
    },
    {
      component: "Infrastructure",
      technologies: ["Docker", "Kubernetes", "AWS EC2", "Cloudflare"],
      icon: Shield,
      color: "green"
    }
  ];

  const getCategoryColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'purple': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'indigo': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'green': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getInfrastructureColor = (color) => {
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
      id="tech-stack"
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
              Technology <span className="text-gradient">Stack</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge technologies powering real-time facial and voice analysis 
              with on-device processing and cloud-based insights
            </p>
          </motion.div>

          {/* Tech categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {techCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 ${getCategoryColor(category.color)} rounded-xl flex items-center justify-center mr-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={tech.name} className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-800">
                          {tech.name}
                        </h4>
                        <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
                          v{tech.version}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">
                        {tech.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tech.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white text-slate-600 px-2 py-1 rounded-lg"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Infrastructure overview */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 text-white mb-16"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">
              System Architecture
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              {infrastructure.map((item, index) => (
                <div key={item.component} className="bg-slate-600/50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 ${getInfrastructureColor(item.color)} rounded-lg flex items-center justify-center mr-3`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold">{item.component}</h4>
                  </div>
                  <div className="space-y-2">
                    {item.technologies.map((tech, idx) => (
                      <div key={idx} className="text-sm text-slate-300">
                        • {tech}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance metrics */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              Performance Specifications
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Real-Time Processing</h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  &lt;100ms
                </div>
                <p className="text-slate-600 text-sm">
                  End-to-end latency for facial landmark detection and analysis
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Model Accuracy</h4>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  94.2%
                </div>
                <p className="text-slate-600 text-sm">
                  Cross-validated accuracy for behavioral drift detection
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-8 h-8 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Scalability</h4>
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  10K+
                </div>
                <p className="text-slate-600 text-sm">
                  Concurrent users with sub-second response times
                </p>
              </div>
            </div>
          </motion.div>

          {/* Development tools */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              Development & Deployment
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <Code className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Version Control</h4>
                <p className="text-slate-600 text-sm">
                  Git with CI/CD pipelines
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Security</h4>
                <p className="text-slate-600 text-sm">
                  End-to-end encryption and compliance
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center">
                <Database className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Data Storage</h4>
                <p className="text-slate-600 text-sm">
                  Encrypted cloud and local storage
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <Globe className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Deployment</h4>
                <p className="text-slate-600 text-sm">
                  Containerized microservices
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
