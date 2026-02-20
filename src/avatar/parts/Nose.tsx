import type { ReactElement } from 'react';
import type { FaceGeometry } from '../types';

interface Props {
  style: number;
  geo: FaceGeometry;
  skinTone: string;
}

// Darken a hex colour by a fixed amount for shadow tones
function darken(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - 40);
  const g = Math.max(0, ((n >> 8) & 0xff) - 35);
  const b = Math.max(0, (n & 0xff) - 30);
  return `rgb(${r},${g},${b})`;
}

export function Nose({ style, geo, skinTone }: Props) {
  const { cx, cy } = geo;
  const ny = cy + 8; // nose centre y
  const shadow = darken(skinTone);

  const noses: Record<number, ReactElement> = {
    // Single dot
    0: <circle cx={cx} cy={ny} r={4} fill={shadow} />,
    // Two nostrils
    1: (
      <g>
        <circle cx={cx - 6} cy={ny + 2} r={3.5} fill={shadow} />
        <circle cx={cx + 6} cy={ny + 2} r={3.5} fill={shadow} />
      </g>
    ),
    // Triangle tip
    2: (
      <path
        d={`M ${cx},${ny - 5} L ${cx - 7},${ny + 5} L ${cx + 7},${ny + 5} Z`}
        fill={shadow}
      />
    ),
    // Rounded bump / button
    3: <ellipse cx={cx} cy={ny + 2} rx={7} ry={5} fill={shadow} />,
    // Line + dot
    4: (
      <g>
        <line x1={cx} y1={ny - 6} x2={cx} y2={ny + 2} stroke={shadow} strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={cx} cy={ny + 4} r={3} fill={shadow} />
      </g>
    ),
  };

  return noses[style % 5] ?? noses[0];
}
