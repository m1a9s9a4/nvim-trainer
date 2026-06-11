import { Vim } from '@replit/codemirror-vim'

export interface ExActions {
  toggleHints(): void
  reset(): void
  next(): void
  quit(): void
}

export const exActions: { current: ExActions | null } = { current: null }

let registered = false

export function registerExCommands() {
  if (registered) return
  registered = true
  Vim.defineEx('hints', 'h', () => exActions.current?.toggleHints())
  Vim.defineEx('reset', 'r', () => exActions.current?.reset())
  Vim.defineEx('next', 'n', () => exActions.current?.next())
  Vim.defineEx('quit', 'q', () => exActions.current?.quit())
}
