import { API_BASE_URL } from "../config/api";

export type PredictionResult = {
  follow_up: boolean;
  disease: string;
  score: number;
  specialty: string;
};

export type PredictResponse = {
  input: string;
  results: PredictionResult[];
};

export async function predictDisease(
  symptoms: string,
): Promise<PredictResponse> {
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symptoms,
      top_k: 3,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Prediction failed");
  }

  return res.json();
}
