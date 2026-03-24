'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

interface FeatureChartProps {
  featureAnalysis: Record<
    string,
    { value: number; status: string; healthy_range: number[]; unit: string }
  >;
}

const featureLabels: Record<string, string> = {
  pregnancies: 'Pregnancies',
  glucose: 'Glucose',
  blood_pressure: 'Blood Pressure',
  skin_thickness: 'Skin Thickness',
  insulin: 'Insulin',
  bmi: 'BMI',
  diabetes_pedigree: 'Pedigree',
  age: 'Age',
};

export default function FeatureChart({ featureAnalysis }: FeatureChartProps) {
  const data = Object.entries(featureAnalysis).map(([key, info]) => {
    const [min, max] = info.healthy_range;
    const normalizedValue = ((info.value - min) / (max - min)) * 100;

    return {
      name: featureLabels[key] || key,
      value: Math.max(0, Math.min(150, normalizedValue)),
      actualValue: info.value,
      status: info.status,
      unit: info.unit,
      healthyRange: info.healthy_range,
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return '#10b981';
      case 'low':
        return '#f59e0b';
      case 'high':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 text-sm">
          <p className="font-semibold text-slate-800 dark:text-white">
            {data.name}
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Value: <span className="font-medium">{data.actualValue} {data.unit}</span>
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Healthy: <span className="font-medium">{data.healthyRange[0]} - {data.healthyRange[1]} {data.unit}</span>
          </p>
          <p className={`font-medium ${
            data.status === 'normal'
              ? 'text-emerald-500'
              : data.status === 'low'
              ? 'text-amber-500'
              : 'text-rose-500'
          }`}>
            Status: {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20 }}>
            <XAxis
              type="number"
              domain={[0, 150]}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
            <ReferenceLine
              x={100}
              stroke="#cbd5e1"
              strokeDasharray="3 3"
              label={{ value: 'Healthy Max', fill: '#94a3b8', fontSize: 10 }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={index} fill={getStatusColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500" />
          <span className="text-slate-600 dark:text-slate-400">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500" />
          <span className="text-slate-600 dark:text-slate-400">Below Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-rose-500" />
          <span className="text-slate-600 dark:text-slate-400">Above Range</span>
        </div>
      </div>

      {/* Feature status cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(featureAnalysis).map(([key, info]) => (
          <div
            key={key}
            className={`p-3 rounded-xl border-2 ${
              info.status === 'normal'
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700'
                : info.status === 'low'
                ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
                : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700'
            }`}
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {featureLabels[key]}
            </p>
            <p className="font-bold text-slate-800 dark:text-white">
              {info.value} <span className="text-xs font-normal">{info.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
