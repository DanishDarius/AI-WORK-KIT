// Client Supabase "admin" : utilise la clé service_role, qui contourne les
// règles RLS. À N'UTILISER QUE dans du code strictement serveur (routes API),
// jamais importé depuis un composant client, jamais exposé au navigateur.
// La clé vient de la variable d'environnement SUPABASE_SERVICE_ROLE_KEY,
// configurée uniquement sur Vercel (jamais préfixée NEXT_PUBLIC_).
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
