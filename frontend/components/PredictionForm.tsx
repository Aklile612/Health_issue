'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Baby,
  Droplets,
  Heart,
  Ruler,
  Syringe,
  Scale,
  Dna,
  Calendar,
  Info,
  Loader2,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

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

interface FieldConfig {
  key: keyof FormData;
  label: string;
  icon: React.ReactNode;
  min: number;
  max: number;
  step: number;
  unit: string;
  tooltip: string;
}

const fieldConfigs: FieldConfig[] = [
  {
    key: 'pregnancies',
    label: 'Pregnancies',
    icon: <Baby className="w-5 h-5" />,
    min: 0,
    max: 17,
    step: 1,
    unit: '',
    tooltip: 'Number of times pregnant',
  },
  {
    key: 'glucose',
    label: 'Glucose',
    icon: <Droplets className="w-5 h-5" />,
    min: 0,
    max: 200,
    step: 1,
    unit: 'mg/dL',
    tooltip: 'Plasma glucose concentration after 2 hours in an oral glucose tolerance test',
  },
  {
    key: 'blood_pressure',
    label: 'Blood Pressure',
    icon: <Heart className="w-5 h-5" />,
    min: 0,
    max: 122,
    step: 1,
    unit: 'mm Hg',
    tooltip: 'Diastolic blood pressure (the bottom number)',
  },
  {
    key: 'skin_thickness',
    label: 'Skin Thickness',
    icon: <Ruler className="w-5 h-5" />,
    min: 0,
    max: 99,
    step: 1,
    unit: 'mm',
    tooltip: 'Triceps skin fold thickness measurement',
  },
  {
    key: 'insulin',
    label: 'Insulin',
    icon: <Syringe className="w-5 h-5" />,
    min: 0,
    max: 846,
    step: 1,
    unit: 'μU/ml',
    tooltip: '2-Hour serum insulin level',
  },
  {
    key: 'bmi',
    label: 'BMI',
    icon: <Scale className="w-5 h-5" />,
    min: 0,
    max: 67.1,
    step: 0.1,
    unit: 'kg/m²',
    tooltip: 'Body Mass Index (weight in kg / height in m²)',
  },
  {
    key: 'diabetes_pedigree',
    label: 'Diabetes Pedigree',
    icon: <Dna className="w-5 h-5" />,
    min: 0.08,
    max: 2.42,
    step: 0.01,
    unit: '',
    tooltip: 'Genetic risk score based on family history of diabetes',
  },
  {
    key: 'age',
    label: 'Age',
    icon: <Calendar className="w-5 h-5" />,
    min: 21,
    max: 81,
    step: 1,
    unit: 'years',
    tooltip: 'Age in years',
  },
];

const sampleData: FormData = {
  pregnancies: 2,
  glucose: 120,
  blood_pressure: 70,
  skin_thickness: 25,
  insulin: 80,
  bmi: 28.5,
  diabetes_pedigree: 0.35,
  age: 35,
};

interface PredictionFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
}

export default function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    pregnancies: 0,
    glucose: 100,
    blood_pressure: 70,
    skin_thickness: 20,
    insulin: 80,
    bmi: 25,
    diabetes_pedigree: 0.5,
    age: 30,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const validateField = (key: keyof FormData, value: number): string | null => {
    const config = fieldConfigs.find((f) => f.key === key);
    if (!config) return null;

    if (value < config.min) return `Minimum value is ${config.min}`;
    if (value > config.max) return `Maximum value is ${config.max}`;
    return null;
  };

  const handleChange = (key: keyof FormData, value: number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    const error = validateField(key, value);
    setErrors((prev) => ({
      ...prev,
      [key]: error || undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    fieldConfigs.forEach((config) => {
      const error = validateField(config.key, formData[config.key]);
      if (error) newErrors[config.key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit(formData);
  };

  const fillSampleData = () => {
    setFormData(sampleData);
    setErrors({});
  };

  const resetForm = () => {
    setFormData({
      pregnancies: 0,
      glucose: 100,
      blood_pressure: 70,
      skin_thickness: 20,
      insulin: 80,
      bmi: 25,
      diabetes_pedigree: 0.5,
      age: 30,
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={fillSampleData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400
                     hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Fill Sample Data
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetForm}
          className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300
                     hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Form
        </motion.button>
      </div>

      {/* Form fields grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fieldConfigs.map((config, index) => (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="text-primary-500">{config.icon}</span>
                {config.label}
                {config.unit && (
                  <span className="text-xs text-slate-400">({config.unit})</span>
                )}
              </label>

              {/* Tooltip trigger */}
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setShowTooltip(config.key)}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700
                             transition-colors"
                >
                  <Info className="w-4 h-4 text-slate-400" />
                </button>

                {/* Tooltip */}
                {showTooltip === config.key && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-8 z-10 w-64 p-3 text-sm
                               bg-slate-800 dark:bg-slate-600 text-white rounded-xl shadow-xl"
                  >
                    {config.tooltip}
                    <div className="absolute -top-2 right-3 w-4 h-4 bg-slate-800 dark:bg-slate-600
                                    transform rotate-45" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min={config.min}
                max={config.max}
                step={config.step}
                value={formData[config.key]}
                onChange={(e) => handleChange(config.key, parseFloat(e.target.value))}
                className="w-full"
              />

              {/* Value input */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={formData[config.key]}
                  onChange={(e) => handleChange(config.key, parseFloat(e.target.value) || 0)}
                  className={`input-field text-center ${
                    errors[config.key]
                      ? 'border-rose-500 focus:border-rose-500'
                      : ''
                  }`}
                />
              </div>

              {/* Error message */}
              {errors[config.key] && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-rose-500"
                >
                  {errors[config.key]}
                </motion.p>
              )}

              {/* Range indicator */}
              <div className="flex justify-between text-xs text-slate-400">
                <span>{config.min}</span>
                <span>{config.max}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Analyzing Your Data...
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6" />
            Get Prediction
          </>
        )}
      </motion.button>
    </form>
  );
}
