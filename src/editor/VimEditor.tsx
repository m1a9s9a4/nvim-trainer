import { useEffect, useRef } from 'react'
import { EditorView, lineNumbers } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { minimalSetup } from 'codemirror'
import { vim, getCM } from '@replit/codemirror-vim'
import { oneDark } from '@codemirror/theme-one-dark'
import type { Challenge, WinStats } from '../types'
import { normalizeKey } from '../engine/keys'
import { registerExCommands } from '../engine/exBus'
import { worldDecorations } from './worldDeco'

interface Props {
  challenge: Challenge
  attempt: number
  onKey: (token: string) => void
  onWin: (stats: WinStats) => void
  onMode?: (mode: string) => void
}

export default function VimEditor({ challenge, attempt, onKey, onWin, onMode }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onKeyRef = useRef(onKey)
  const onWinRef = useRef(onWin)
  const onModeRef = useRef(onMode)
  onKeyRef.current = onKey
  onWinRef.current = onWin
  onModeRef.current = onMode

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    registerExCommands()

    let won = false
    let currentMode = 'normal'
    const keystrokes: string[] = []
    let startedAt = 0

    const checkWin = (state: EditorState) => {
      if (won) return
      let cleared = false
      const win = challenge.win
      if (win.type === 'match') {
        cleared = state.doc.toString() === challenge.target
      } else {
        const head = state.selection.main.head
        const line = state.doc.lineAt(head)
        cleared = line.number - 1 === win.line && head - line.from === win.col
      }
      if (cleared) {
        won = true
        const seconds = startedAt ? (performance.now() - startedAt) / 1000 : 0
        // brief pause so the final state is visible before the result modal
        setTimeout(() => onWinRef.current({ keys: keystrokes.length, seconds, keystrokes }), 200)
      }
    }

    const updateListener = EditorView.updateListener.of((u) => {
      if (u.docChanged || u.selectionSet) checkWin(u.state)
    })

    const view = new EditorView({
      state: EditorState.create({
        doc: challenge.start,
        extensions: [
          vim(),
          minimalSetup,
          ...(challenge.type === 'golf' ? [lineNumbers()] : []),
          oneDark,
          updateListener,
          ...(challenge.type === 'world'
            ? [
                worldDecorations(
                  challenge.win.type === 'reach'
                    ? { line: challenge.win.line, col: challenge.win.col }
                    : undefined,
                ),
              ]
            : []),
        ],
      }),
      parent: container,
    })

    const onKeydown = (e: KeyboardEvent) => {
      if (won) return
      // keys typed into the vim command line (after : or /) are meta, not golf strokes
      const target = e.target as HTMLElement | null
      if (target?.closest('.cm-panels, .cm-vim-panel, .cm-dialog')) return
      const token = normalizeKey(e)
      if (!token) return
      if (token === ':' && currentMode === 'normal') return
      if (keystrokes.length === 0) startedAt = performance.now()
      keystrokes.push(token)
      onKeyRef.current(token)
    }
    view.dom.addEventListener('keydown', onKeydown, true)

    const cm = getCM(view)
    cm?.on('vim-mode-change', (ev: { mode: string }) => {
      currentMode = ev.mode
      onModeRef.current?.(ev.mode)
    })

    view.focus()

    return () => {
      view.dom.removeEventListener('keydown', onKeydown, true)
      view.destroy()
    }
  }, [challenge, attempt])

  return (
    <div
      ref={containerRef}
      className={challenge.type === 'world' ? 'world' : 'golf'}
      onClick={() => containerRef.current?.querySelector<HTMLElement>('.cm-content')?.focus()}
    />
  )
}
