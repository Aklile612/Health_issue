'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RiskGaugeProps {
  probability: number;
  riskLevel: 'low' | 'moderate' | 'high';
}

export default function RiskGauge({ probability, riskLevel }: RiskGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.round(probability * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low':
        return {
          stroke: '#10b981',
          bg: 'from-emerald-500 to-emerald-400',
          glow: 'shadow-emerald-500/50',
        };
      case 'moderate':
        return {
          stroke: '#f59e0b',
          bg: 'from-amber-500 to-amber-400',
          glow: 'shadow-amber-500/50',
        };
      case 'high':
        return {
          stroke: '#ef4444',
          bg: 'from-rose-500 to-rose-400',
          glow: 'shadow-rose-500/50',
        };
    }
  };

  const colors = getRiskColor();
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center">
      {/* SVG Gauge */}
      <div className="relative w-52 h-52">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-slate-200 dark:text-slate-700"
          />

          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={colors.stroke}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="drop-shadow-lg"
          />

          {/* Glow effect */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={colors.stroke}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="blur-sm opacity-50"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
            className="text-center"
          >
            <span className="text-5xl font-bold gradient-text">{animatedValue}%</span>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Risk Score</p>
          </motion.div>
        </div>
      </div>

      {/* Risk Level Badge */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`mt-4 px-6 py-2 rounded-full bg-gradient-to-r ${colors.bg}
                   text-white font-semibold shadow-lg ${colors.glow}`}
      >
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </motion.div>

      {/* Scale indicators */}
      <div className="flex justify-between w-full max-w-xs mt-4 px-4">
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-emerald-500 mx-auto" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Low</span>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-amber-500 mx-auto" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Moderate</span>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-rose-500 mx-auto" />
          <span className="text-xs text-slate-500 dark:text-slate-400">High</span>
        </div>
      </div>
    </div>
  );
}
