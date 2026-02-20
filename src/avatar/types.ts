// ─── Avatar Configuration ─────────────────────────────────────────────────
// All decisions derived from the seed. Passed down to each part component.

export type FaceShape = 'oval' | 'round' | 'square' | 'wide' | 'narrow';
export type HairStyle = 'bald' | 'short' | 'medium' | 'long' | 'spiky';
export type Accessory = 'none' | 'round-glasses' | 'rect-glasses' | 'earrings' | 'hat';

export interface AvatarConfig {
  background: string;
  skinTone: string;
  hairColour: string;
  eyeColour: string;
  shirtColour: string;
  faceShape: FaceShape;
  eyeStyle: number;      // 0–4
  eyebrowStyle: number;  // 0–4
  noseStyle: number;     // 0–4
  mouthStyle: number;    // 0–4
  hairStyle: HairStyle;
  accessory: Accessory;
}

// Geometry of the face ellipse — used by features to position themselves
export interface FaceGeometry {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export function getFaceGeometry(shape: FaceShape): FaceGeometry {
  switch (shape) {
    case 'oval':   return { cx: 100, cy: 88, rx: 48, ry: 58 };
    case 'round':  return { cx: 100, cy: 92, rx: 55, ry: 55 };
    case 'square': return { cx: 100, cy: 88, rx: 50, ry: 50 };
    case 'wide':   return { cx: 100, cy: 88, rx: 60, ry: 46 };
    case 'narrow': return { cx: 100, cy: 88, rx: 38, ry: 62 };
  }
}
