import { supabase } from "../lib/supabase";

export async function ensureProfile() {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;

  const user = userData.user;
  if (!user) throw new Error("Not logged in");

  // Check if profile exists
  const { data: existing, error: selErr } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (selErr) throw selErr;

  // Create if missing
  if (!existing) {
    const { error: insErr } = await supabase.from("profiles").insert([
      {
        id: user.id,
        full_name: user.email ?? "User",
        phone: null,
      },
    ]);

    if (insErr) throw insErr;
  }

  return user.id;
}