import { useState, useId, useRef, useEffect } from "react";
import { generateAvatar } from "avatario";

const DEFAULT_SEED = "avatar-gen";

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function App() {
  const [seed, setSeed] = useState(DEFAULT_SEED);
  const inputId = useId();
  const avatarRef = useRef<HTMLDivElement>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const prevUrlRef = useRef("");

  useEffect(() => {
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);

    const svgEl = avatarRef.current?.querySelector("svg");
    if (!svgEl) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgEl);
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 440;
      canvas.height = 440;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, 440, 440);
      URL.revokeObjectURL(svgUrl);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        prevUrlRef.current = url;
        setDownloadUrl(url);
      }, "image/png");
    };
    img.src = svgUrl;
  }, [seed]);

  function randomise() {
    const words = [
      "cosmic",
      "pixel",
      "neon",
      "solar",
      "jade",
      "nova",
      "flux",
      "zephyr",
      "echo",
      "prism",
    ];
    setSeed(
      words[Math.floor(Math.random() * words.length)] +
        "-" +
        Math.floor(Math.random() * 9999),
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight text-white">
          Avatar<span className="text-violet-400">.</span>gen
        </h1>
        <p className="mt-2 text-sm text-slate-400 tracking-wide uppercase">
          Unique avatars from any string
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-slate-900 rounded-3xl shadow-2xl shadow-black/60 border border-slate-800 p-8 flex flex-col items-center gap-7">
        {/* Avatar display — hover to reveal download */}
        <div
          ref={avatarRef}
          className="relative"
          style={{ filter: "drop-shadow(0 8px 32px rgba(139,92,246,0.35))" }}
        >
          {/* Gradient ring */}
          <div
            className="rounded-full p-1"
            style={{
              background: "#0057B8",
            }}
          >
            {/* Avatar — blurs on hover */}
            <div
              ref={avatarRef}
              className="rounded-full overflow-hidden transition-[filter] duration-300 group-hover:blur-[3px]"
              style={{ lineHeight: 0 }}
              dangerouslySetInnerHTML={{ __html: generateAvatar(seed, 220) }}
            />
          </div>

          {/* Download overlay — fades in on hover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="text-white drop-shadow-lg">
              <DownloadIcon />
            </div>
            <span className="text-white text-xs font-semibold tracking-widest uppercase drop-shadow-lg">
              Download
            </span>
          </div>
        </div>

        {/* Seed display */}
        <div className="text-center">
          <span className="text-xs text-slate-500 uppercase tracking-widest">
            seed
          </span>
          <p className="mt-1 text-slate-200 font-mono text-sm break-all leading-snug min-h-[1.25rem]">
            {seed || <span className="text-slate-600 italic">empty</span>}
          </p>
        </div>

        {/* Input */}
        <div className="w-full flex flex-col gap-3">
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-400 uppercase tracking-widest"
          >
            Enter a seed
          </label>
          <input
            id={inputId}
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
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

        {/* Download */}
        <a
          href={downloadUrl || undefined}
          download={`avatar-${seed || "download"}.png`}
          className="w-full rounded-xl py-3 text-sm font-bold tracking-wide text-center block
                     bg-slate-700 hover:bg-slate-600 active:bg-slate-800
                     text-white transition-colors duration-150 cursor-pointer"
        >
          Download PNG
        </a>
      </div>

      {/* Footer */}
      <p className="mt-10 text-slate-700 text-xs">
        Same seed always generates the same avatar
      </p>
    </div>
  );
}
