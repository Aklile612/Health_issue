'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, TrendingUp, Activity } from 'lucide-react';
import HistoryTable from '@/components/HistoryTable';
import { getHistory, PredictionRecord } from '@/lib/storage';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function HistoryPage() {
  const [history, setHistory] = useState<PredictionRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHistory(getHistory());
  }, []);

  const refreshHistory = () => {
    setHistory(getHistory());
  };

  // Prepare chart data (last 10 predictions, oldest first)
  const chartData = history
    .slice(0, 10)
    .reverse()
    .map((record, index) => ({
      index: index + 1,
      probability: Math.round(record.result.probability * 100),
      date: new Date(record.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    }));

  // Calculate stats
  const stats = {
    total: history.length,
    avgProbability:
      history.length > 0
        ? Math.round(
            (history.reduce((sum, r) => sum + r.result.probability, 0) /
              history.length) *
              100
          )
        : 0,
    highRiskCount: history.filter((r) => r.result.risk_level === 'high').length,
  };

  if (!mounted) {
    return (
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto" />
            <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500
                        flex items-center justify-center">
            <History className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Prediction <span className="gradient-text">History</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Track your diabetes risk predictions over time and monitor your health progress.
          </p>
        </motion.div>

        {history.length > 0 && (
          <>
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="glass-card p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30
                                flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Predictions</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">
                      {stats.total}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30
                                flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Average Risk</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">
                      {stats.avgProbability}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30
                                flex items-center justify-center">
                    <Activity className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">High Risk Results</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">
                      {stats.highRiskCount}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trend Chart */}
            {chartData.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 mb-8"
              >
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                  Risk Trend (Last 10 Predictions)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value: number) => [`${value}%`, 'Risk']}
                      />
                      <Line
                        type="monotone"
                        dataKey="probability"
                        stroke="url(#gradient)"
                        strokeWidth={3}
                        dot={{ fill: '#0ea5e9', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#d946ef' }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <HistoryTable history={history} onUpdate={refreshHistory} />
        </motion.div>
      </div>
    </div>
  );
}
