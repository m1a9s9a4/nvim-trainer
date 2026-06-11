const IGNORED = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Dead', 'Process'])

const SPECIAL: Record<string, string> = {
  Escape: '<Esc>',
  Enter: '<CR>',
  Backspace: '<BS>',
  Tab: '<Tab>',
  Delete: '<Del>',
  ArrowLeft: '<Left>',
  ArrowRight: '<Right>',
  ArrowUp: '<Up>',
  ArrowDown: '<Down>',
  ' ': '<Space>',
}

export function normalizeKey(e: KeyboardEvent): string | null {
  if (IGNORED.has(e.key)) return null
  if (e.ctrlKey && e.key.length === 1) return `<C-${e.key}>`
  if (e.key in SPECIAL) return SPECIAL[e.key]
  if (e.key.length === 1) return e.key
  return null
}
