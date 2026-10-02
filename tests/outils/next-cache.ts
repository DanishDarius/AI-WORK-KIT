// Remplace « next/cache » dans les tests : pas de cache, la fonction est
// appelée à chaque fois. Les tests comptent ainsi les vraies lectures.
export function unstable_cache<Args extends unknown[], Resultat>(fonction: (...args: Args) => Promise<Resultat>) {
  return fonction;
}
