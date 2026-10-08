from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
from pathlib import Path

app = Flask(__name__)

MODEL_PATH = Path(__file__).resolve().parent / "model" / "Linearmodel.pkl"

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

FEATURES = [
    "House Size (sqft)",
    "Number of Bedrooms",
    "Number of Bathrooms",
    "Number of Floors",
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "model": "Linear Regression",
        "features": FEATURES
    })

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True) or {}

        size = float(data.get("house_size", 0))
        bedrooms = float(data.get("bedrooms", 0))
        bathrooms = float(data.get("bathrooms", 0))
        floors = float(data.get("floors", 0))

        if size <= 0:
            return jsonify({"error": "House size must be greater than 0."}), 400
        if bedrooms < 0 or bathrooms < 0 or floors <= 0:
            return jsonify({"error": "Please enter valid property values."}), 400

        # IMPORTANT: keep the exact feature order used during model training.
        features = np.array([[size, bedrooms, bathrooms, floors]], dtype=float)
        prediction = float(model.predict(features)[0])

        return jsonify({
            "success": True,
            "prediction": prediction,
            "formatted_price": f"₹{prediction:,.0f}",
            "inputs": {
                "house_size": size,
                "bedrooms": bedrooms,
                "bathrooms": bathrooms,
                "floors": floors
            }
        })
    except (TypeError, ValueError):
        return jsonify({"error": "Please enter valid numeric values."}), 400
    except Exception as exc:
        return jsonify({"error": f"Prediction failed: {str(exc)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
