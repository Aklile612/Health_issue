'use client';

import { motion } from 'framer-motion';
import {
  Info,
  AlertTriangle,
  Heart,
  Activity,
  Apple,
  Dumbbell,
  Moon,
  Stethoscope,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

const riskFactors = [
  {
    title: 'Family History',
    description: 'Having a parent or sibling with type 2 diabetes increases your risk.',
    icon: Heart,
  },
  {
    title: 'Excess Weight',
    description: 'Being overweight or obese is a primary risk factor for type 2 diabetes.',
    icon: Activity,
  },
  {
    title: 'Sedentary Lifestyle',
    description: 'Physical inactivity increases your risk. Exercise helps control weight and uses glucose.',
    icon: Dumbbell,
  },
  {
    title: 'Unhealthy Diet',
    description: 'Diets high in processed foods, sugar, and unhealthy fats increase risk.',
    icon: Apple,
  },
  {
    title: 'Age',
    description: 'Risk increases as you get older, especially after age 45.',
    icon: Moon,
  },
  {
    title: 'High Blood Pressure',
    description: 'Having blood pressure over 140/90 mmHg is linked to increased diabetes risk.',
    icon: Stethoscope,
  },
];

const preventionTips = [
  'Maintain a healthy weight through balanced diet and regular exercise',
  'Engage in at least 150 minutes of moderate aerobic activity per week',
  'Eat a diet rich in vegetables, whole grains, and lean proteins',
  'Limit intake of processed foods, sugary beverages, and refined carbohydrates',
  'Get regular health screenings, especially if you have risk factors',
  'Manage stress through relaxation techniques and adequate sleep',
  'If you smoke, quit smoking to reduce your overall health risks',
  'Monitor your blood sugar levels if recommended by your doctor',
];

const resources = [
  {
    title: 'American Diabetes Association',
    url: 'https://diabetes.org',
    description: 'Comprehensive diabetes information and resources',
  },
  {
    title: 'CDC Diabetes Prevention',
    url: 'https://www.cdc.gov/diabetes/prevention',
    description: 'National Diabetes Prevention Program information',
  },
  {
    title: 'World Health Organization',
    url: 'https://www.who.int/health-topics/diabetes',
    description: 'Global diabetes facts and statistics',
  },
];

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500
                        flex items-center justify-center">
            <Info className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Understanding <span className="gradient-text">Diabetes</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Learn about diabetes, its risk factors, and how you can take steps to prevent it.
          </p>
        </motion.div>

        {/* What is Diabetes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            What is Diabetes?
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-300">
              Diabetes is a chronic health condition that affects how your body turns food into energy.
              When you eat, your body breaks down most of the food into sugar (glucose) and releases it
              into your bloodstream. When blood sugar goes up, it signals your pancreas to release insulin.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mt-4">
              With diabetes, your body either doesn't make enough insulin or can't use the insulin it makes
              as well as it should. When there isn't enough insulin or cells stop responding to insulin,
              too much blood sugar stays in your bloodstream, which over time can cause serious health
              problems like heart disease, vision loss, and kidney disease.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-300">Did You Know?</h4>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                  More than 37 million Americans have diabetes (about 1 in 10), and approximately
                  96 million American adults—more than 1 in 3—have prediabetes.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Types of Diabetes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Types of Diabetes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700">
              <h3 className="font-bold text-primary-700 dark:text-primary-300 mb-2">Type 1 Diabetes</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                An autoimmune reaction that stops your body from making insulin.
                Usually diagnosed in children and young adults. About 5-10% of people with diabetes have type 1.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-accent-50 dark:bg-accent-900/30 border border-accent-200 dark:border-accent-700">
              <h3 className="font-bold text-accent-700 dark:text-accent-300 mb-2">Type 2 Diabetes</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your body doesn't use insulin well and can't keep blood sugar at normal levels.
                About 90-95% of people with diabetes have type 2. It can be prevented or delayed.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700">
              <h3 className="font-bold text-rose-700 dark:text-rose-300 mb-2">Gestational Diabetes</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Develops in pregnant women who have never had diabetes.
                Usually goes away after the baby is born but increases risk for type 2 later.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Risk Factors */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Risk Factors for Type 2 Diabetes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {riskFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500
                                flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{factor.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{factor.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Prevention Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Prevention Tips
          </h2>
          <div className="space-y-3">
            {preventionTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30
                              flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {index + 1}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Helpful Resources
          </h2>
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl border border-slate-200 dark:border-slate-700
                         hover:border-primary-300 dark:hover:border-primary-600
                         hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-primary-500
                                 transition-colors flex items-center gap-2">
                      {resource.title}
                      <ExternalLink className="w-4 h-4" />
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{resource.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Ready to check your diabetes risk?
          </p>
          <Link href="/predict">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Get Your Prediction Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
