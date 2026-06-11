import { CHALLENGES } from '../data/challenges'
import { STAGES } from '../data/curriculum'
import type { SaveData } from '../engine/storage'
import type { Challenge } from '../types'

interface Props {
  save: SaveData
  onPlay: (challenge: Challenge) => void
}

export default function LevelSelect({ save, onPlay }: Props) {
  return (
    <div className="space-y-6">
      {STAGES.map((stage) => {
        const list = CHALLENGES.filter((c) => c.stage === stage.id)
        return (
          <section key={stage.id} className={list.length === 0 ? 'opacity-40' : ''}>
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-sm font-bold">
                <span className="text-zinc-500 font-mono mr-2">{String(stage.id).padStart(2, '0')}</span>
                {stage.title}
              </h2>
              <div className="flex gap-1">
                {stage.newCommands.map((c) => (
                  <code key={c} className="text-[11px] font-mono px-1 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {c}
                  </code>
                ))}
              </div>
              {list.length === 0 && <span className="text-xs text-zinc-600">coming soon</span>}
            </div>
            {list.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {list.map((c) => {
                  const prog = save.progress[c.id]
                  return (
                    <button
                      key={c.id}
                      onClick={() => onPlay(c)}
                      className="text-left rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 hover:border-emerald-600 hover:bg-zinc-900 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {c.type === 'world' ? '🌍' : '⛳'} {c.title}
                        </span>
                        <span className="text-amber-400 text-sm">
                          {'★'.repeat(prog?.stars ?? 0)}
                          <span className="text-zinc-700">{'★'.repeat(3 - (prog?.stars ?? 0))}</span>
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">
                        par {c.par}
                        {prog ? ` · best ${prog.bestKeys}` : ''}
                      </p>
                    </button>
                  )
                })}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
