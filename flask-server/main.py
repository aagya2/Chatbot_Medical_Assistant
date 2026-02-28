import os
import json

from flask import Flask, request, jsonify
from flask_cors import CORS

import torch
from transformers import pipeline


# ------------------------------------------------------------------
# Paths
# ------------------------------------------------------------------
APP_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_DIR = os.path.join(APP_DIR, "clidel")
MAP_PATH = os.path.join(MODEL_DIR, "disease_to_specialnical_bert_disease_moty.json")


FOLLOW_UP_QUESTIONS = {
    "(vertigo) Paroymsal  Positional Vertigo": [
        "Do you feel dizzy when changing head position?",
        "Do you experience spinning sensations?"
    ],
    "AIDS": [
        "Have you had unexplained weight loss or prolonged fever?",
        "Have you experienced frequent infections?"
    ],
    "Acne": [
        "Do you have pimples or cysts on your face or body?",
        "Is your skin oily or inflamed?"
    ],
    "Alcoholic hepatitis": [
        "Do you consume alcohol frequently?",
        "Have you noticed jaundice or abdominal pain?"
    ],
    "Allergy": [
        "Do you experience sneezing or itching?",
        "Are symptoms triggered by dust, food, or pollen?"
    ],
    "Arthritis": [
        "Do you have joint pain or stiffness?",
        "Is the pain worse in the morning?"
    ],
    "Bronchial Asthma": [
        "Do you experience wheezing or shortness of breath?",
        "Are symptoms triggered by exercise or allergens?"
    ],
    "Cervical spondylosis": [
        "Do you have neck pain or stiffness?",
        "Does the pain radiate to your arms?"
    ],
    "Chicken pox": [
        "Do you have itchy rashes or blisters?",
        "Have you recently been in contact with someone infected?"
    ],
    "Chronic cholestasis": [
        "Have you noticed yellowing of skin or eyes?",
        "Do you have persistent itching?"
    ],
    "Common Cold": [
        "Do you have a runny or blocked nose?",
        "Are you experiencing sneezing or sore throat?"
    ],
    "Dengue": [
        "Do you have high fever with body pain?",
        "Have you noticed bleeding or rashes?"
    ],
    "Diabetes": [
        "Do you feel excessively thirsty or hungry?",
        "Are you urinating more frequently?"
    ],
    "Dimorphic hemmorhoids(piles)": [
        "Do you experience pain during bowel movements?",
        "Have you noticed blood in your stool?"
    ],
    "Drug Reaction": [
        "Did symptoms start after taking a new medication?",
        "Do you have rashes or swelling?"
    ],
    "Fungal infection": [
        "Do you have itchy or red patches on skin?",
        "Is the affected area moist or scaly?"
    ],
    "GERD": [
        "Do you experience heartburn or acid reflux?",
        "Is discomfort worse after eating?"
    ],
    "Gastroenteritis": [
        "Do you have diarrhea or vomiting?",
        "Have you eaten outside food recently?"
    ],
    "Heart attack": [
        "Do you have chest pain or pressure?",
        "Does pain spread to your arm or jaw?"
    ],
    "Hepatitis B": [
        "Have you noticed fatigue or jaundice?",
        "Do you have abdominal discomfort?"
    ],
    "Hepatitis C": [
        "Have you experienced chronic fatigue?",
        "Have you had previous blood transfusions?"
    ],
    "Hepatitis D": [
        "Do you have symptoms similar to hepatitis B?",
        "Have you been previously diagnosed with hepatitis B?"
    ],
    "Hepatitis E": [
        "Do you have nausea or yellowing of eyes?",
        "Have you consumed contaminated water?"
    ],
    "Hypertension": [
        "Do you experience headaches or dizziness?",
        "Have you checked your blood pressure recently?"
    ],
    "Hyperthyroidism": [
        "Have you noticed unexplained weight loss?",
        "Do you feel anxious or restless?"
    ],
    "Hypoglycemia": [
        "Do you feel shaky or sweaty?",
        "Have you skipped meals recently?"
    ],
    "Hypothyroidism": [
        "Do you feel tired or gain weight easily?",
        "Is your skin dry or cold sensitive?"
    ],
    "Impetigo": [
        "Do you have honey-colored crusted sores?",
        "Are the sores spreading quickly?"
    ],
    "Jaundice": [
        "Have your eyes or skin turned yellow?",
        "Is your urine dark in color?"
    ],
    "Malaria": [
        "Do you experience fever with chills?",
        "Have you traveled to a mosquito-prone area?"
    ],
    "Migraine": [
        "Do you experience severe headaches with nausea?",
        "Are you sensitive to light or sound?"
    ],
    "Osteoarthristis": [
        "Do you have joint pain that worsens with movement?",
        "Is there reduced joint flexibility?"
    ],
    "Paralysis (brain hemorrhage)": [
        "Do you have sudden weakness on one side of the body?",
        "Are you experiencing speech difficulty?"
    ],
    "Peptic ulcer diseae": [
        "Do you have burning stomach pain?",
        "Is the pain worse on an empty stomach?"
    ],
    "Pneumonia": [
        "Do you have cough with fever?",
        "Are you experiencing difficulty breathing?"
    ],
    "Psoriasis": [
        "Do you have red scaly patches on skin?",
        "Is there itching or burning sensation?"
    ],
    "Tuberculosis": [
        "Do you have prolonged cough?",
        "Have you noticed weight loss or night sweats?"
    ],
    "Typhoid": [
        "Do you have prolonged fever?",
        "Are you experiencing abdominal pain?"
    ],
    "Urinary tract infection": [
        "Do you feel burning during urination?",
        "Are you urinating frequently?"
    ],
    "Varicose veins": [
        "Do you have swollen or twisted veins?",
        "Do your legs ache after standing long?"
    ],
    "hepatitis A": [
        "Do you have nausea or fatigue?",
        "Have you consumed contaminated food or water?"
    ]
}

# ------------------------------------------------------------------
# App setup
# ------------------------------------------------------------------
app = Flask(__name__)
CORS(app)  # allow requests from React Native / Expo


# ------------------------------------------------------------------
# Health check
# ------------------------------------------------------------------
@app.get("/health")
def health():
    return jsonify({
        "status": "ok",
        "device": "cuda" if torch.cuda.is_available() else "cpu"
    })


# ------------------------------------------------------------------
# Validate files
# ------------------------------------------------------------------
if not os.path.exists(MODEL_DIR):
    raise FileNotFoundError(f"❌ Model folder not found: {MODEL_DIR}")

if not os.path.exists(MAP_PATH):
    raise FileNotFoundError(f"❌ disease_to_specialty.json missing: {MAP_PATH}")


# ------------------------------------------------------------------
# Load disease → doctor mapping
# ------------------------------------------------------------------
with open(MAP_PATH, "r", encoding="utf-8") as f:
    disease_to_specialty = json.load(f)


# ------------------------------------------------------------------
# Load ML model ONCE (important)
# ------------------------------------------------------------------
DEVICE = 0 if torch.cuda.is_available() else -1

classifier = pipeline(
    "text-classification",
    model=MODEL_DIR,
    tokenizer=MODEL_DIR,
    device=DEVICE
)

print("✅ Model loaded successfully")

GREETING_WORDS = {
    "hi", "hello", " hello there", "hello chatbot", "hey", "wow", "ok", "okay",
    "thanks", "thank you", "good morning", "good evening"
}
# ------------------------------------------------------------------
# Prediction endpoint (used by React Native chatbot)
# ------------------------------------------------------------------
@app.post("/predict")
def predict():
    data = request.get_json(silent=True) or {}

    symptoms = (data.get("symptoms") or "").lower().strip()
    top_k = int(data.get("top_k", 1))

    if symptoms in GREETING_WORDS:
        return jsonify({
            "message": "Please describe your symptoms so I can help you."
        })

    if not symptoms:
        return jsonify({"error": "symptoms is required"}), 400

    text = f"Symptoms: {symptoms}"
    if not text.endswith("."):
        text += "."

    try:
        predictions = classifier(text, top_k=top_k)

        results = []
        for p in predictions:
            disease = p.get("label", "Unknown").strip()

            results.append({
                "disease": disease,
                "score": float(p.get("score", 0.0)),
                "specialty": disease_to_specialty.get(
                    disease, "General Physician"
                ),
                "follow_up": FOLLOW_UP_QUESTIONS.get(disease, [])
            })

        return jsonify({
            "input": symptoms,
            "results": results
        })

    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500


# ------------------------------------------------------------------
# Run server
# ------------------------------------------------------------------
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5002,
        debug=True
    )
