'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertCircle } from 'lucide-react';
import PredictionForm from '@/components/PredictionForm';
import ResultCard from '@/components/ResultCard';
import { addToHistory } from '@/lib/storage';

interface FormData {
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  diabetes_pedigree: number;
  age: number;
}

interface PredictionResult {
  prediction: number;
  probability: number;
  risk_level: string;
  timestamp: string;
  recommendations: string[];
  input_values: FormData;
  feature_analysis: Record<
    string,
    { value: number; status: string; healthy_range: number[]; unit: string }
  >;
}

export default function PredictPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to get prediction');
      }

      const resultData: PredictionResult = await response.json();
      setResult(resultData);

      // Save to history
      addToHistory({
        timestamp: resultData.timestamp,
        input: data,
        result: {
          prediction: resultData.prediction,
          probability: resultData.probability,
          risk_level: resultData.risk_level,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred. Please make sure the backend is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

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
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Diabetes Risk <span className="gradient-text">Prediction</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Enter your health metrics below to get an AI-powered assessment of your diabetes risk.
          </p>
        </motion.div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700
                       flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-rose-700 dark:text-rose-400">Error</p>
                <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ResultCard result={result} onClose={handleReset} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-6 md:p-8"
            >
              <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-slate-500 dark:text-slate-500 mt-8"
        >
          This tool is for educational purposes only. Always consult a healthcare professional
          for medical advice.
        </motion.p>
      </div>
    </div>
  );
}
