# DiabetesAI - Diabetes Risk Prediction Web Application

A premium full-stack web application for diabetes risk prediction using machine learning. Built with FastAPI (backend) and Next.js (frontend).

## Features

- **AI-Powered Predictions**: Machine learning model trained on the Pima Indians Diabetes dataset
- **Beautiful UI/UX**: Modern design with glassmorphism, smooth animations, and dark/light mode
- **Risk Visualization**: Animated gauge showing probability with color-coded risk levels
- **Health Metrics Analysis**: Visual comparison of your values against healthy ranges
- **Prediction History**: LocalStorage persistence with trend charts and CSV export
- **Educational Content**: Comprehensive information about diabetes and prevention
- **Fully Responsive**: Works on mobile, tablet, and desktop

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **scikit-learn** - Machine learning model
- **Pydantic** - Data validation

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **next-themes** - Dark mode support

## Project Structure

```
sukar-model/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── models/
│       ├── diabetes_model.sav
│       └── scaler.sav
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Home page
│   │   ├── predict/         # Prediction page
│   │   ├── history/         # History page
│   │   ├── about/           # About diabetes page
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── PredictionForm.tsx
│   │   ├── ResultCard.tsx
│   │   ├── RiskGauge.tsx
│   │   ├── FeatureChart.tsx
│   │   ├── HistoryTable.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── storage.ts       # LocalStorage helpers
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at http://localhost:8000. API documentation is at http://localhost:8000/docs.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check status |
| GET | `/feature-info` | Feature descriptions and ranges |
| POST | `/predict` | Make a diabetes prediction |
| GET | `/docs` | Swagger UI documentation |

### Prediction Request

```json
POST /predict
{
  "pregnancies": 2,
  "glucose": 120,
  "blood_pressure": 70,
  "skin_thickness": 25,
  "insulin": 80,
  "bmi": 28.5,
  "diabetes_pedigree": 0.35,
  "age": 35
}
```

### Prediction Response

```json
{
  "prediction": 1,
  "probability": 0.78,
  "risk_level": "high",
  "timestamp": "2024-02-16T10:30:00Z",
  "recommendations": ["..."],
  "input_values": {...},
  "feature_analysis": {...}
}
```

## Input Features

| Feature | Description | Range | Unit |
|---------|-------------|-------|------|
| Pregnancies | Number of pregnancies | 0-17 | count |
| Glucose | Plasma glucose concentration | 0-200 | mg/dL |
| Blood Pressure | Diastolic blood pressure | 0-122 | mm Hg |
| Skin Thickness | Triceps skin fold thickness | 0-99 | mm |
| Insulin | 2-Hour serum insulin | 0-846 | μU/ml |
| BMI | Body mass index | 0-67.1 | kg/m² |
| Diabetes Pedigree | Genetic risk score | 0.08-2.42 | - |
| Age | Age in years | 21-81 | years |

## Disclaimer

This application is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.

## License

MIT License
# Health_issue
