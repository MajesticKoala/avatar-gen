import type { FaceGeometry } from '../types';

interface Props {
  style: number;
  geo: FaceGeometry;
  eyeColour: string;
  skinTone: string;
}

interface EyeProps {
  x: number;
  y: number;
  eyeColour: string;
  skinTone: string;
}

// ─── Individual eye renderers ──────────────────────────────────────────────

function RoundEye({ x, y, eyeColour }: EyeProps) {
  return (
    <g>
      <circle cx={x} cy={y} r={10} fill="white" />
      <circle cx={x} cy={y} r={7} fill={eyeColour} />
      <circle cx={x} cy={y} r={4} fill="#111" />
      <circle cx={x - 2.5} cy={y - 2.5} r={2} fill="white" />
    </g>
  );
}

function WideEye({ x, y, eyeColour }: EyeProps) {
  return (
    <g>
      <circle cx={x} cy={y} r={13} fill="white" />
      <circle cx={x} cy={y} r={9} fill={eyeColour} />
      <circle cx={x} cy={y} r={5} fill="#111" />
      <circle cx={x - 3} cy={y - 3} r={2.5} fill="white" />
    </g>
  );
}

function AlmondEye({ x, y, eyeColour }: EyeProps) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={13} ry={8} fill="white" />
      <circle cx={x} cy={y} r={6} fill={eyeColour} />
      <circle cx={x} cy={y} r={3.5} fill="#111" />
      <circle cx={x - 2} cy={y - 2} r={1.5} fill="white" />
    </g>
  );
}

function DotEye({ x, y }: EyeProps) {
  return (
    <g>
      <circle cx={x} cy={y} r={6} fill="#111" />
      <circle cx={x - 1.5} cy={y - 1.5} r={2} fill="white" />
    </g>
  );
}

function HalfEye({ x, y, eyeColour, skinTone }: EyeProps) {
  // Sleepy / half-closed: a full circle with an upper rect masking the top half
  return (
    <g>
      <circle cx={x} cy={y} r={10} fill="white" />
      <circle cx={x} cy={y} r={7} fill={eyeColour} />
      <circle cx={x} cy={y} r={4} fill="#111" />
      {/* Eyelid covers top half */}
      <rect x={x - 13} y={y - 13} width={26} height={13} fill={skinTone} />
      {/* Eyelid line */}
      <path
        d={`M ${x - 11},${y} Q ${x},${y - 6} ${x + 11},${y}`}
        stroke="#111"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

const EYE_RENDERERS = [RoundEye, WideEye, AlmondEye, DotEye, HalfEye];

// ─── Eyes component ────────────────────────────────────────────────────────

export function Eyes({ style, geo, eyeColour, skinTone }: Props) {
  const { cx, cy } = geo;
  const eyeY = cy - 8;
  const spread = 24;
  const lx = cx - spread;
  const rx = cx + spread;

  const EyeRenderer = EYE_RENDERERS[style % EYE_RENDERERS.length];

  return (
    <g>
      <EyeRenderer x={lx} y={eyeY} eyeColour={eyeColour} skinTone={skinTone} />
      <EyeRenderer x={rx} y={eyeY} eyeColour={eyeColour} skinTone={skinTone} />
    </g>
  );
}
