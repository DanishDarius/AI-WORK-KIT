// Client Supabase pour le navigateur (composants "use client").
// Utilise uniquement la clé publique (NEXT_PUBLIC_*) - jamais la clé service_role ici.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
