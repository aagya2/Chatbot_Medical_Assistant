import { supabase } from "../lib/supabase";
import { ensureProfile } from "./ensureProfile";

export async function getMyMedicalId() {
  const uid = await ensureProfile();

  const { data, error } = await supabase
    .from("profiles")
    .select("medical_id")
    .eq("id", uid)
    .maybeSingle();

  if (error) throw error;

  const mid = (data?.medical_id ?? "").toString().trim();
  if (!mid) throw new Error("Medical ID not set. Go to Profile and save it.");

  return { uid, medicalId: mid };
}