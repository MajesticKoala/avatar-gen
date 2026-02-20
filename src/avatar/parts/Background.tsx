interface Props {
  colour: string;
}

export function Background({ colour }: Props) {
  return <circle cx={100} cy={100} r={100} fill={colour} />;
}
