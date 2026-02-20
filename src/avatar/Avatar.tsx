import { createRng } from '../seed';
import {
  BACKGROUNDS,
  SKIN_TONES,
  HAIR_COLOURS,
  EYE_COLOURS,
  SHIRT_COLOURS,
  ACCESSORY_COLOURS,
} from '../palette';
import { getFaceGeometry, type AvatarConfig, type FaceShape, type HairStyle, type Accessory } from './types';
import { Background } from './parts/Background';
import { Shoulders } from './parts/Shoulders';
import { Face } from './parts/Face';
import { Ears } from './parts/Ears';
import { Hair } from './parts/Hair';
import { Eyes } from './parts/Eyes';
import { Eyebrows } from './parts/Eyebrows';
import { Nose } from './parts/Nose';
import { Mouth } from './parts/Mouth';
import { AccessoryLayer } from './parts/Accessory';

interface Props {
  seed: string;
  size?: number;
}

const FACE_SHAPES: FaceShape[] = ['oval', 'round', 'square', 'wide', 'narrow'];
const HAIR_STYLES: HairStyle[] = ['bald', 'short', 'medium', 'long', 'spiky'];
const ACCESSORIES: Accessory[] = ['none', 'round-glasses', 'rect-glasses', 'earrings', 'hat'];

function buildConfig(seed: string): AvatarConfig & { accessoryColour: string } {
  const rng = createRng(seed);
  return {
    background:      rng.pick(BACKGROUNDS),
    skinTone:        rng.pick(SKIN_TONES),
    hairColour:      rng.pick(HAIR_COLOURS),
    eyeColour:       rng.pick(EYE_COLOURS),
    shirtColour:     rng.pick(SHIRT_COLOURS),
    faceShape:       rng.pick(FACE_SHAPES),
    eyeStyle:        rng.int(0, 4),
    eyebrowStyle:    rng.int(0, 4),
    noseStyle:       rng.int(0, 4),
    mouthStyle:      rng.int(0, 4),
    hairStyle:       rng.pick(HAIR_STYLES),
    accessory:       rng.pick(ACCESSORIES),
    accessoryColour: rng.pick(ACCESSORY_COLOURS),
  };
}

export function Avatar({ seed, size = 240 }: Props) {
  const cfg = buildConfig(seed);
  const geo = getFaceGeometry(cfg.faceShape);
  const clipId = `avatar-clip-${seed.replace(/\W/g, '_')}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '50%', display: 'block' }}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={100} cy={100} r={100} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {/* Layer 1 — background */}
        <Background colour={cfg.background} />

        {/* Layer 2 — shoulders */}
        <Shoulders skinTone={cfg.skinTone} shirtColour={cfg.shirtColour} />

        {/* Layer 3 — ears (behind face) */}
        <Ears geo={geo} skinTone={cfg.skinTone} />

        {/* Layer 4 — hair back */}
        <Hair style={cfg.hairStyle} geo={geo} colour={cfg.hairColour} layer="back" />

        {/* Layer 5 — face */}
        <Face shape={cfg.faceShape} geo={geo} skinTone={cfg.skinTone} />

        {/* Layer 6 — eyebrows */}
        <Eyebrows style={cfg.eyebrowStyle} geo={geo} hairColour={cfg.hairColour} />

        {/* Layer 7 — eyes */}
        <Eyes style={cfg.eyeStyle} geo={geo} eyeColour={cfg.eyeColour} skinTone={cfg.skinTone} />

        {/* Layer 8 — nose */}
        <Nose style={cfg.noseStyle} geo={geo} skinTone={cfg.skinTone} />

        {/* Layer 9 — mouth */}
        <Mouth style={cfg.mouthStyle} geo={geo} />

        {/* Layer 10 — hair front */}
        <Hair style={cfg.hairStyle} geo={geo} colour={cfg.hairColour} layer="front" />

        {/* Layer 11 — accessory */}
        <AccessoryLayer
          type={cfg.accessory}
          geo={geo}
          colour={cfg.accessoryColour}
        />
      </g>
    </svg>
  );
}
