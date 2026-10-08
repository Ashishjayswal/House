<<<<<<< HEAD
# HousePriceAI — Flask House Price Prediction App

A complete frontend + Flask API for the uploaded Linear Regression model.

## Model inputs

The model expects **exactly four features in this order**:

1. House Size (sqft)
2. Number of Bedrooms
3. Number of Bathrooms
4. Number of Floors

Target: `Price`

## Project structure

```text
house_price_predictor/
├── app.py
├── requirements.txt
├── README.md
├── model/
│   └── Linearmodel.pkl
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

## Run on Windows

Open PowerShell in this folder:

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## API

### Health

`GET /api/health`

### Prediction

`POST /api/predict`

Example JSON:

```json
{
  "house_size": 1800,
  "bedrooms": 3,
  "bathrooms": 2,
  "floors": 2
}
```

Example response:

```json
{
  "success": true,
  "prediction": 114000000,
  "formatted_price": "₹114,000,000"
}
```

## Important

The supplied pickle was trained with scikit-learn 1.6.1, so the requirements pin that version for maximum compatibility.

The app does not retrain the model. It loads your supplied model and sends the four frontend inputs to `model.predict()`.
=======
# House
House price pediction model
>>>>>>> a98d7d4dcb699abaa81086955a01ed0f0bc20ff5
