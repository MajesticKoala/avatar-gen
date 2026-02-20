import type { FaceGeometry, HairStyle } from '../types';

interface Props {
  style: HairStyle;
  geo: FaceGeometry;
  colour: string;
  layer: 'back' | 'front';
}

export function Hair({ style, geo, colour, layer }: Props) {
  if (style === 'bald') return null;

  const { cx, cy, rx, ry } = geo;
  const top = cy - ry; // top of face

  if (style === 'short') {
    if (layer === 'back') return null;
    // A cap that sits on top of the head
    return (
      <ellipse
        cx={cx}
        cy={top + 10}
        rx={rx + 6}
        ry={22}
        fill={colour}
      />
    );
  }

  if (style === 'medium') {
    if (layer === 'back') {
      // Side curtains behind the face
      return (
        <g>
          <ellipse cx={cx - rx + 4} cy={cy + 20} rx={22} ry={52} fill={colour} />
          <ellipse cx={cx + rx - 4} cy={cy + 20} rx={22} ry={52} fill={colour} />
        </g>
      );
    }
    // Front cap
    return (
      <path
        d={`M ${cx - rx - 4},${cy}
            Q ${cx - rx},${top - 4} ${cx},${top - 14}
            Q ${cx + rx},${top - 4} ${cx + rx + 4},${cy}`}
        fill={colour}
      />
    );
  }

  if (style === 'long') {
    if (layer === 'back') {
      // Long flowing hair behind everything
      return (
        <g>
          <ellipse cx={cx - rx + 2} cy={cy + 40} rx={26} ry={75} fill={colour} />
          <ellipse cx={cx + rx - 2} cy={cy + 40} rx={26} ry={75} fill={colour} />
          {/* Connect across the bottom */}
          <rect x={cx - rx + 2} y={cy - 20} width={(rx - 2) * 2} height={120} fill={colour} />
        </g>
      );
    }
    // Front cap + centre part
    return (
      <g>
        <path
          d={`M ${cx - rx - 6},${cy + 4}
              Q ${cx - rx - 2},${top - 6} ${cx},${top - 16}
              Q ${cx + rx + 2},${top - 6} ${cx + rx + 6},${cy + 4}`}
          fill={colour}
        />
        {/* Centre part line */}
        <line x1={cx} y1={top - 16} x2={cx} y2={top + 8} stroke={colour === '#1A1A1A' ? '#333' : '#0003'} strokeWidth={2} />
      </g>
    );
  }

  if (style === 'spiky') {
    if (layer === 'back') return null;
    const spikes = 6;
    const baseY = top + 8;
    const points: string[] = [];
    for (let i = 0; i < spikes; i++) {
      const t = i / (spikes - 1);
      const bx = cx - rx + t * rx * 2;
      const tipX = bx + (i % 2 === 0 ? -5 : 5);
      const tipY = baseY - 28 - (i % 3) * 10;
      points.push(`${bx},${baseY} ${tipX},${tipY}`);
    }
    // Build a polygon for spiky hair
    const d = `M ${cx - rx - 4},${baseY + 14}
      L ${cx - rx - 4},${baseY}
      ${Array.from({ length: spikes }, (_, i) => {
        const t = i / (spikes - 1);
        const bx = cx - rx + t * rx * 2;
        const tipX = bx + (i % 2 === 0 ? -4 : 4);
        const tipY = baseY - 26 - (i % 3) * 8;
        const nextBx = i < spikes - 1 ? cx - rx + ((i + 1) / (spikes - 1)) * rx * 2 : bx + rx / spikes;
        return `L ${bx},${baseY} L ${tipX},${tipY} L ${nextBx},${baseY}`;
      }).join(' ')}
      L ${cx + rx + 4},${baseY}
      L ${cx + rx + 4},${baseY + 14}
      Q ${cx},${baseY + 20} ${cx - rx - 4},${baseY + 14} Z`;
    return <path d={d} fill={colour} />;
  }

  return null;
}
