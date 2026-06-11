export interface ChallengeProgress {
  bestKeys: number
  stars: number
}

export interface SaveData {
  progress: Record<string, ChallengeProgress>
  xp: number
  streak: { last: string; count: number }
  hintsOn: boolean
}

const KEY = 'nvim-trainer-save-v1'

const DEFAULT: SaveData = {
  progress: {},
  xp: 0,
  streak: { last: '', count: 0 },
  hintsOn: true,
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return structuredClone(DEFAULT)
    return { ...structuredClone(DEFAULT), ...JSON.parse(raw) }
  } catch {
    return structuredClone(DEFAULT)
  }
}

export function persist(save: SaveData) {
  localStorage.setItem(KEY, JSON.stringify(save))
}

const XP_PER_STAR = 10

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

export function recordWin(
  save: SaveData,
  challengeId: string,
  keys: number,
  stars: number,
): { save: SaveData; xpGained: number } {
  const next: SaveData = structuredClone(save)
  const prev = next.progress[challengeId]
  const prevStars = prev?.stars ?? 0
  const xpGained = Math.max(0, stars - prevStars) * XP_PER_STAR
  next.xp += xpGained
  next.progress[challengeId] = {
    bestKeys: prev ? Math.min(prev.bestKeys, keys) : keys,
    stars: Math.max(prevStars, stars),
  }
  const today = isoDate(new Date())
  const yesterday = isoDate(new Date(Date.now() - 86_400_000))
  if (next.streak.last !== today) {
    next.streak.count = next.streak.last === yesterday ? next.streak.count + 1 : 1
    next.streak.last = today
  }
  persist(next)
  return { save: next, xpGained }
}
