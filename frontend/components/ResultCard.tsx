'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Lightbulb,
  TrendingUp,
  Heart,
} from 'lucide-react';
import RiskGauge from './RiskGauge';
import FeatureChart from './FeatureChart';

interface ResultCardProps {
  result: {
    prediction: number;
    probability: number;
    risk_level: string;
    recommendations: string[];
    feature_analysis: Record<
      string,
      { value: number; status: string; healthy_range: number[]; unit: string }
    >;
  };
  onClose: () => void;
}

export default function ResultCard({ result, onClose }: ResultCardProps) {
  const riskLevel = result.risk_level as 'low' | 'moderate' | 'high';

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'low':
        return <CheckCircle className="w-8 h-8 text-emerald-500" />;
      case 'moderate':
        return <AlertTriangle className="w-8 h-8 text-amber-500" />;
      case 'high':
        return <XCircle className="w-8 h-8 text-rose-500" />;
    }
  };

  const getRiskMessage = () => {
    switch (riskLevel) {
      case 'low':
        return 'Your health metrics suggest a low risk of diabetes. Keep up the healthy lifestyle!';
      case 'moderate':
        return 'Your results indicate a moderate risk. Consider lifestyle adjustments and consult a healthcare provider.';
      case 'high':
        return 'Your metrics suggest a higher risk of diabetes. Please consult with a healthcare professional soon.';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Main Result Card */}
      <motion.div
        variants={itemVariants}
        className={`glass-card p-6 border-2 ${
          riskLevel === 'low'
            ? 'border-emerald-200 dark:border-emerald-700'
            : riskLevel === 'moderate'
            ? 'border-amber-200 dark:border-amber-700'
            : 'border-rose-200 dark:border-rose-700'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Risk Gauge */}
          <div className="flex-shrink-0">
            <RiskGauge probability={result.probability} riskLevel={riskLevel} />
          </div>

          {/* Result Details */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              {getRiskIcon()}
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Prediction Result
              </h2>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
              {getRiskMessage()}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700">
                <span className="text-sm text-slate-500 dark:text-slate-400">Prediction</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {result.prediction === 1 ? 'Positive' : 'Negative'}
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700">
                <span className="text-sm text-slate-500 dark:text-slate-400">Confidence</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {(result.probability * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature Analysis Chart */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-primary-500" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Your Health Metrics Analysis
          </h3>
        </div>
        <FeatureChart featureAnalysis={result.feature_analysis} />
      </motion.div>

      {/* Recommendations */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Personalized Recommendations
          </h3>
        </div>
        <ul className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <Heart className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-600 dark:text-slate-300">{rec}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button onClick={onClose} className="btn-secondary">
          Make Another Prediction
        </button>
      </motion.div>
    </motion.div>
  );
}
