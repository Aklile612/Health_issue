'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Download,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { PredictionRecord, deleteFromHistory, downloadCSV, clearHistory } from '@/lib/storage';

interface HistoryTableProps {
  history: PredictionRecord[];
  onUpdate: () => void;
}

export default function HistoryTable({ history, onUpdate }: HistoryTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleDelete = (id: string) => {
    deleteFromHistory(id);
    onUpdate();
  };

  const handleClearAll = () => {
    if (confirmClear) {
      clearHistory();
      setConfirmClear(false);
      onUpdate();
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRiskBadgeClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';
      case 'moderate':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
      case 'high':
        return 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
    }
  };

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-12 text-center"
      >
        <Clock className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
          No Predictions Yet
        </h3>
        <p className="text-slate-500 dark:text-slate-400">
          Your prediction history will appear here after you make your first prediction.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Actions bar */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {history.length} prediction{history.length !== 1 ? 's' : ''} saved
        </p>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => downloadCSV()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400
                       hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClearAll}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              confirmClear
                ? 'bg-rose-500 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            {confirmClear ? 'Confirm Clear' : 'Clear All'}
          </motion.button>
        </div>
      </div>

      {/* History list */}
      <div className="space-y-3">
        <AnimatePresence>
          {history.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card overflow-hidden"
            >
              {/* Main row */}
              <div
                onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
                className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50
                           transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(record.timestamp)}
                    </span>
                    <span className="font-medium text-slate-800 dark:text-white">
                      {record.result.prediction === 1 ? 'Positive' : 'Negative'} -{' '}
                      {(record.result.probability * 100).toFixed(1)}% probability
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskBadgeClass(
                      record.result.risk_level
                    )}`}
                  >
                    {record.result.risk_level.charAt(0).toUpperCase() +
                      record.result.risk_level.slice(1)}{' '}
                    Risk
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(record.id);
                    }}
                    className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30
                               text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {expandedId === record.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {expandedId === record.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-200 dark:border-slate-700"
                  >
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
                      <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
                        Input Values
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(record.input).map(([key, value]) => (
                          <div
                            key={key}
                            className="bg-white dark:bg-slate-700 p-2 rounded-lg"
                          >
                            <span className="text-xs text-slate-500 dark:text-slate-400 block">
                              {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                            <span className="font-medium text-slate-800 dark:text-white">
                              {typeof value === 'number' ? value.toFixed(2) : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
