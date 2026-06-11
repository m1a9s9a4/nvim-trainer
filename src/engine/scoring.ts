export function starsFor(keys: number, par: number): 1 | 2 | 3 {
  if (keys <= par) return 3
  if (keys <= Math.ceil(par * 1.5)) return 2
  return 1
}
