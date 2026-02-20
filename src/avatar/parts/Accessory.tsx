import type { Accessory, FaceGeometry } from '../types';
import { ACCESSORY_COLOURS } from '../../palette';

interface Props {
  type: Accessory;
  geo: FaceGeometry;
  colour: string;
}

export function AccessoryLayer({ type, geo, colour }: Props) {
  const { cx, cy, rx, ry } = geo;

  if (type === 'none') return null;

  if (type === 'round-glasses') {
    const ey = cy - 8;
    const lx = cx - 24;
    const rx2 = cx + 24;
    return (
      <g>
        <circle cx={lx} cy={ey} r={13} fill="none" stroke={colour} strokeWidth={3} />
        <circle cx={rx2} cy={ey} r={13} fill="none" stroke={colour} strokeWidth={3} />
        <line x1={lx + 13} y1={ey} x2={rx2 - 13} y2={ey} stroke={colour} strokeWidth={3} />
        {/* Arms */}
        <line x1={lx - 13} y1={ey} x2={lx - 22} y2={ey - 3} stroke={colour} strokeWidth={3} strokeLinecap="round" />
        <line x1={rx2 + 13} y1={ey} x2={rx2 + 22} y2={ey - 3} stroke={colour} strokeWidth={3} strokeLinecap="round" />
      </g>
    );
  }

  if (type === 'rect-glasses') {
    const ey = cy - 8;
    const lx = cx - 24;
    const rx2 = cx + 24;
    const gw = 26;
    const gh = 16;
    return (
      <g>
        <rect x={lx - gw / 2} y={ey - gh / 2} width={gw} height={gh} rx={4} fill="none" stroke={colour} strokeWidth={3} />
        <rect x={rx2 - gw / 2} y={ey - gh / 2} width={gw} height={gh} rx={4} fill="none" stroke={colour} strokeWidth={3} />
        <line x1={lx + gw / 2} y1={ey} x2={rx2 - gw / 2} y2={ey} stroke={colour} strokeWidth={3} />
        <line x1={lx - gw / 2} y1={ey} x2={lx - 22} y2={ey - 3} stroke={colour} strokeWidth={3} strokeLinecap="round" />
        <line x1={rx2 + gw / 2} y1={ey} x2={rx2 + 22} y2={ey - 3} stroke={colour} strokeWidth={3} strokeLinecap="round" />
      </g>
    );
  }

  if (type === 'earrings') {
    const earY = cy + 4 + 16; // below ear centre
    const lx = cx - rx - 2;
    const rx2 = cx + rx + 2;
    return (
      <g>
        <circle cx={lx} cy={earY} r={5} fill={colour} />
        <circle cx={rx2} cy={earY} r={5} fill={colour} />
      </g>
    );
  }

  if (type === 'hat') {
    const top = cy - ry;
    const brimY = top + 6;
    return (
      <g>
        {/* Brim */}
        <rect x={cx - rx - 10} y={brimY} width={(rx + 10) * 2} height={12} rx={6} fill={colour} />
        {/* Crown */}
        <rect x={cx - rx + 6} y={top - 36} width={(rx - 6) * 2} height={44} rx={8} fill={colour} />
        {/* Band */}
        <rect x={cx - rx + 6} y={brimY - 10} width={(rx - 6) * 2} height={10} rx={4} fill={ACCESSORY_COLOURS[2]} />
      </g>
    );
  }

  return null;
}
