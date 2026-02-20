interface Props {
  skinTone: string;
  shirtColour: string;
}

export function Shoulders({ skinTone, shirtColour }: Props) {
  return (
    <g>
      {/* Shirt body — wide trapezoid rising from the bottom */}
      <path
        d="M -10,210 L -10,175 C 25,162 78,152 88,148 L 88,165 C 88,174 112,174 112,165 L 112,148 C 122,152 175,162 210,175 L 210,210 Z"
        fill={shirtColour}
      />
      {/* Neck */}
      <rect x={87} y={140} width={26} height={32} rx={6} fill={skinTone} />
    </g>
  );
}
