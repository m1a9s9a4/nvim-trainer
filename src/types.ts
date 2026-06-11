export type LevelType = 'golf' | 'world'

export type WinCondition =
  | { type: 'match' }
  | { type: 'reach'; line: number; col: number }

export interface Challenge {
  id: string
  stage: number
  type: LevelType
  title: string
  mission: string
  start: string
  target: string
  win: WinCondition
  par: number
  commands: { new: string[]; allowed: string[] }
  solution: string[]
  hint?: string
}

export interface WinStats {
  keys: number
  seconds: number
  keystrokes: string[]
}
