import type { ReactElement } from 'react';
import type { FaceGeometry } from '../types';

interface Props {
  style: number;
  geo: FaceGeometry;
  hairColour: string;
}

export function Eyebrows({ style, geo, hairColour }: Props) {
  const { cx, cy } = geo;
  const browY = cy - 22;
  const lx = cx - 24;
  const rx = cx + 24;
  const stroke = hairColour;
  const sw = 4;

  const brows: Record<number, ReactElement> = {
    // Straight thick
    0: (
      <g>
        <line x1={lx - 12} y1={browY} x2={lx + 12} y2={browY} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1={rx - 12} y1={browY} x2={rx + 12} y2={browY} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </g>
    ),
    // Arched
    1: (
      <g>
        <path d={`M ${lx - 12},${browY + 3} Q ${lx},${browY - 5} ${lx + 12},${browY + 3}`} stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
        <path d={`M ${rx - 12},${browY + 3} Q ${rx},${browY - 5} ${rx + 12},${browY + 3}`} stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
      </g>
    ),
    // Angled down / angry
    2: (
      <g>
        <line x1={lx - 12} y1={browY - 4} x2={lx + 12} y2={browY + 4} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1={rx - 12} y1={browY + 4} x2={rx + 12} y2={browY - 4} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </g>
    ),
    // Raised / surprised
    3: (
      <g>
        <path d={`M ${lx - 12},${browY + 2} Q ${lx},${browY - 9} ${lx + 12},${browY + 2}`} stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
        <path d={`M ${rx - 12},${browY + 2} Q ${rx},${browY - 9} ${rx + 12},${browY + 2}`} stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
      </g>
    ),
    // Thin straight
    4: (
      <g>
        <line x1={lx - 10} y1={browY} x2={lx + 10} y2={browY} stroke={stroke} strokeWidth={2} strokeLinecap="round" />
        <line x1={rx - 10} y1={browY} x2={rx + 10} y2={browY} stroke={stroke} strokeWidth={2} strokeLinecap="round" />
      </g>
    ),
  };

  return brows[style % 5] ?? brows[0];
}
