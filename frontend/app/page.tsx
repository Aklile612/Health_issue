'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  History,
  Heart,
  Brain,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description:
      'Advanced machine learning model trained on medical data to provide accurate risk assessments.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description:
      'Get your diabetes risk prediction in seconds with detailed probability scores.',
  },
  {
    icon: BarChart3,
    title: 'Visual Insights',
    description:
      'Interactive charts showing how your health metrics compare to healthy ranges.',
  },
  {
    icon: History,
    title: 'Track Progress',
    description:
      'Save your predictions and monitor changes in your health metrics over time.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your data stays on your device. We never store or transmit personal health information.',
  },
  {
    icon: Heart,
    title: 'Health Recommendations',
    description:
      'Receive personalized tips and recommendations based on your risk assessment.',
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background decorations */}
        <div className="hero-blob w-72 h-72 bg-primary-400 top-0 -left-20" />
        <div className="hero-blob w-96 h-96 bg-accent-400 top-20 right-0" />
        <div className="hero-blob w-64 h-64 bg-primary-300 bottom-0 left-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                             bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400
                             text-sm font-medium mb-6">
                <Activity className="w-4 h-4" />
                AI-Powered Health Assessment
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6"
            >
              Know Your{' '}
              <span className="gradient-text">Diabetes Risk</span>
              <br />
              Before It's Too Late
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10"
            >
              Our advanced AI analyzes 8 key health indicators to predict your diabetes risk
              with high accuracy. Take control of your health today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/predict">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                >
                  Get Your Prediction
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Learn About Diabetes
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '8', label: 'Health Metrics' },
              { value: '85%+', label: 'Accuracy Rate' },
              { value: '<1s', label: 'Response Time' },
              { value: '100%', label: 'Private & Secure' },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose{' '}
              <span className="gradient-text">DiabetesAI</span>?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our platform combines cutting-edge machine learning with an intuitive interface
              to make health monitoring accessible to everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500
                                flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Enter Your Data',
                description: 'Input 8 simple health metrics like glucose level, BMI, and blood pressure.',
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our machine learning model processes your data in milliseconds.',
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'Receive your risk assessment with visualizations and recommendations.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-7xl font-bold text-primary-100 dark:text-primary-900/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-12 right-0 transform translate-x-1/2">
                    <ArrowRight className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center animated-gradient"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Check Your Health?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Early detection is key to preventing diabetes. Take the first step
              towards a healthier future today.
            </p>
            <Link href="/predict">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl
                         shadow-lg hover:shadow-xl transition-all"
              >
                Start Free Assessment
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
