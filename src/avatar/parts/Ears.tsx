import type { FaceGeometry } from '../types';

interface Props {
  geo: FaceGeometry;
  skinTone: string;
}

export function Ears({ geo, skinTone }: Props) {
  const { cx, cy, rx } = geo;
  const earY = cy + 4;
  const earRx = 10;
  const earRy = 14;

  return (
    <g>
      {/* Left ear */}
      <ellipse cx={cx - rx - 2} cy={earY} rx={earRx} ry={earRy} fill={skinTone} />
      {/* Right ear */}
      <ellipse cx={cx + rx + 2} cy={earY} rx={earRx} ry={earRy} fill={skinTone} />
    </g>
  );
}
