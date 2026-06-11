export interface Stage {
  id: number
  title: string
  newCommands: string[]
  description: string
}

export const STAGES: Stage[] = [
  { id: 1, title: 'Basic Motion', newCommands: ['h', 'j', 'k', 'l'], description: 'Move around without arrow keys.' },
  { id: 2, title: 'Word Hops', newCommands: ['w', 'b', 'e'], description: 'Jump word by word.' },
  { id: 3, title: 'Line Sniping', newCommands: ['f', 't', ';', ',', '0', '$', '^'], description: 'Jump to any character in a line.' },
  { id: 4, title: 'File Jumps', newCommands: ['gg', 'G', '{', '}'], description: 'Move across the whole file.' },
  { id: 5, title: 'Small Edits', newCommands: ['x', 'r', '~'], description: 'Fix things without insert mode.' },
  { id: 6, title: 'Insert Mastery', newCommands: ['i', 'a', 'o', 'I', 'A', 'O'], description: 'Enter insert mode at the right spot.' },
  { id: 7, title: 'Delete Operator', newCommands: ['d', 'dd', 'dw'], description: 'Delete with operator + motion.' },
  { id: 8, title: 'Yank & Paste', newCommands: ['y', 'yy', 'p', 'P'], description: 'Copy and move text around.' },
  { id: 9, title: 'Change Operator', newCommands: ['c', 'cw', 'cc'], description: 'Delete and insert in one move.' },
  { id: 10, title: 'Text Objects', newCommands: ['iw', 'aw', 'i"', 'i(', 'ip'], description: 'Operate on words, quotes, blocks.' },
  { id: 11, title: 'Counts & Repeat', newCommands: ['2w', '3dd', '.'], description: 'Multiply commands, repeat changes.' },
  { id: 12, title: 'Visual Mode', newCommands: ['v', 'V', '<C-v>'], description: 'Select first, act second.' },
  { id: 13, title: 'Search', newCommands: ['/', '?', 'n', 'N', '*'], description: 'Jump anywhere by searching.' },
  { id: 14, title: 'Substitute', newCommands: [':s', ':%s'], description: 'Replace across lines.' },
  { id: 15, title: 'Power Tools', newCommands: ['q', '@', '"a', 'm'], description: 'Macros, registers, marks.' },
]
