'use client';

import { Activity, Github, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto py-8 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and description */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500
                          flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              DiabetesAI - Predict your health, secure your future
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm">
            <Link
              href="/about"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-500
                       dark:hover:text-primary-400 transition-colors"
            >
              About Diabetes
            </Link>
            <Link
              href="/predict"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-500
                       dark:hover:text-primary-400 transition-colors"
            >
              Get Prediction
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>for better health</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-center text-slate-500 dark:text-slate-500">
            <strong>Disclaimer:</strong> This tool is for educational purposes only and should not be
            used as a substitute for professional medical advice, diagnosis, or treatment.
            Always consult with a qualified healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  );
}
