import { COMMAND_DESC } from '../data/commandDict'
import type { Challenge } from '../types'

function CommandRows({ commands, highlight }: { commands: string[]; highlight: boolean }) {
  if (commands.length === 0) return <p className="text-xs text-zinc-600 px-2">—</p>
  return (
    <>
      {commands.map((c) => (
        <div
          key={c}
          className={`flex items-baseline gap-2 px-2 py-1 rounded ${highlight ? 'bg-emerald-950/60' : ''}`}
        >
          <code
            className={`font-mono text-sm px-1.5 py-0.5 rounded border whitespace-nowrap ${
              highlight ? 'border-emerald-500 text-emerald-300' : 'border-zinc-700 text-zinc-300'
            }`}
          >
            {c}
          </code>
          <span className="text-xs text-zinc-400">{COMMAND_DESC[c] ?? ''}</span>
        </div>
      ))}
    </>
  )
}

export default function HintPanel({ challenge }: { challenge: Challenge }) {
  return (
    <aside className="w-64 shrink-0 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 space-y-4 self-start">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5">Learn now</h3>
        <CommandRows commands={challenge.commands.new} highlight />
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">Also available</h3>
        <CommandRows commands={challenge.commands.allowed} highlight={false} />
      </div>
      {challenge.hint && (
        <div className="border-t border-zinc-800 pt-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">Hint</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">{challenge.hint}</p>
        </div>
      )}
    </aside>
  )
}
