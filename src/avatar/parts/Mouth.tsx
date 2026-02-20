import type { ReactElement } from 'react';
import type { FaceGeometry } from '../types';

interface Props {
  style: number;
  geo: FaceGeometry;
}

export function Mouth({ style, geo }: Props) {
  const { cx, cy } = geo;
  const my = cy + 26; // mouth centre y

  const mouths: Record<number, ReactElement> = {
    // Simple smile arc
    0: (
      <path
        d={`M ${cx - 16},${my - 2} Q ${cx},${my + 14} ${cx + 16},${my - 2}`}
        stroke="#111"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
    ),
    // Wide open smile with teeth
    1: (
      <g>
        <path
          d={`M ${cx - 20},${my - 4} Q ${cx},${my + 18} ${cx + 20},${my - 4}`}
          fill="#111"
        />
        <ellipse cx={cx} cy={my + 2} rx={16} ry={7} fill="white" />
      </g>
    ),
    // Neutral flat line
    2: (
      <line
        x1={cx - 14}
        y1={my}
        x2={cx + 14}
        y2={my}
        stroke="#111"
        strokeWidth={3}
        strokeLinecap="round"
      />
    ),
    // Small O / surprised
    3: <circle cx={cx} cy={my + 4} r={7} fill="#111" />,
    // Smirk
    4: (
      <path
        d={`M ${cx - 14},${my + 2} Q ${cx + 4},${my + 12} ${cx + 16},${my - 4}`}
        stroke="#111"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
    ),
  };

  return mouths[style % 5] ?? mouths[0];
}
