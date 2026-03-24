// LocalStorage helpers for prediction history

export interface PredictionRecord {
  id: string;
  timestamp: string;
  input: {
    pregnancies: number;
    glucose: number;
    blood_pressure: number;
    skin_thickness: number;
    insulin: number;
    bmi: number;
    diabetes_pedigree: number;
    age: number;
  };
  result: {
    prediction: number;
    probability: number;
    risk_level: string;
  };
}

const STORAGE_KEY = 'diabetes_prediction_history';

export function getHistory(): PredictionRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(record: Omit<PredictionRecord, 'id'>): PredictionRecord {
  const history = getHistory();
  const newRecord: PredictionRecord = {
    ...record,
    id: generateId(),
  };

  history.unshift(newRecord);

  // Keep only last 50 records
  const trimmedHistory = history.slice(0, 50);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));

  return newRecord;
}

export function deleteFromHistory(id: string): void {
  const history = getHistory();
  const filtered = history.filter(record => record.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportToCSV(): string {
  const history = getHistory();

  if (history.length === 0) return '';

  const headers = [
    'Date',
    'Pregnancies',
    'Glucose',
    'Blood Pressure',
    'Skin Thickness',
    'Insulin',
    'BMI',
    'Diabetes Pedigree',
    'Age',
    'Prediction',
    'Probability',
    'Risk Level',
  ];

  const rows = history.map(record => [
    new Date(record.timestamp).toLocaleString(),
    record.input.pregnancies,
    record.input.glucose,
    record.input.blood_pressure,
    record.input.skin_thickness,
    record.input.insulin,
    record.input.bmi,
    record.input.diabetes_pedigree,
    record.input.age,
    record.result.prediction === 1 ? 'Positive' : 'Negative',
    (record.result.probability * 100).toFixed(1) + '%',
    record.result.risk_level,
  ]);

  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

  return csv;
}

export function downloadCSV(): void {
  const csv = exportToCSV();
  if (!csv) return;

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `diabetes_predictions_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
