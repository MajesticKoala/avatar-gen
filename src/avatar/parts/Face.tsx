import type { FaceGeometry, FaceShape } from '../types';

interface Props {
  shape: FaceShape;
  geo: FaceGeometry;
  skinTone: string;
}

export function Face({ shape, geo, skinTone }: Props) {
  const { cx, cy, rx, ry } = geo;

  if (shape === 'square') {
    return (
      <rect
        x={cx - rx}
        y={cy - ry}
        width={rx * 2}
        height={ry * 2}
        rx={16}
        ry={16}
        fill={skinTone}
      />
    );
  }

  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={skinTone} />;
}
