// Nom du cookie de session posé par Supabase : « sb-<projet>-auth-token »,
// parfois découpé en « .0 », « .1 ». Sert à savoir, sans rien vérifier, si un
// visiteur a une session à contrôler (proxy) ou à interroger (page d'accès).
export function estCookieDeSession(nom: string) {
  return nom.startsWith("sb-") && nom.includes("-auth-token");
}
