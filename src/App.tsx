import { useState, useId } from 'react';
import { Avatar } from './avatar/Avatar';

const DEFAULT_SEED = 'avatar-gen';

export default function App() {
  const [seed, setSeed] = useState(DEFAULT_SEED);
  const inputId = useId();

  function randomise() {
    const words = ['cosmic', 'pixel', 'neon', 'solar', 'jade', 'nova', 'flux', 'zephyr', 'echo', 'prism'];
    setSeed(words[Math.floor(Math.random() * words.length)] + '-' + Math.floor(Math.random() * 9999));
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 py-12">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight text-white">
          Avatar<span className="text-violet-400">.</span>gen
        </h1>
        <p className="mt-2 text-sm text-slate-400 tracking-wide uppercase">
          Unique cartoon avatars from any string
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-slate-900 rounded-3xl shadow-2xl shadow-black/60 border border-slate-800 p-8 flex flex-col items-center gap-7">

        {/* Avatar display */}
        <div
          className="relative"
          style={{ filter: 'drop-shadow(0 8px 32px rgba(139,92,246,0.35))' }}
        >
          <div
            className="rounded-full p-1"
            style={{
              background: '#0057B8',
            }}
          >
            <div className="rounded-full overflow-hidden" style={{ lineHeight: 0 }}>
              <Avatar seed={seed} size={220} />
            </div>
          </div>
        </div>

        {/* Seed display */}
        <div className="text-center">
          <span className="text-xs text-slate-500 uppercase tracking-widest">seed</span>
          <p className="mt-1 text-slate-200 font-mono text-sm break-all leading-snug min-h-[1.25rem]">
            {seed || <span className="text-slate-600 italic">empty</span>}
          </p>
        </div>

        {/* Input */}
        <div className="w-full flex flex-col gap-3">
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Enter a seed
          </label>
          <input
            id={inputId}
            type="text"
            value={seed}
            onChange={e => setSeed(e.target.value)}
            placeholder="Type anything…"
            className="w-full rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-600
                       px-4 py-3 text-sm font-mono
                       focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                       transition-all duration-200"
          />
        </div>

        {/* Randomise */}
        <button
          onClick={randomise}
          className="w-full rounded-xl py-3 text-sm font-bold tracking-wide
                     bg-violet-600 hover:bg-violet-500 active:bg-violet-700
                     text-white transition-colors duration-150
                     cursor-pointer"
        >
          Randomise
        </button>

      </div>

      {/* Footer */}
      <p className="mt-10 text-slate-700 text-xs">
        Same seed always generates the same avatar
      </p>

    </div>
  );
}
