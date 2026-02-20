// ─── Seeded Randomness ────────────────────────────────────────────────────
// djb2 hash converts a string to a uint32, then mulberry32 produces a
// deterministic pseudo-random sequence from it. Same seed → same avatar.

function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0; // keep unsigned 32-bit
  }
  return hash;
}

function mulberry32(seed: number): () => number {
  let s = seed;
  return function () {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Rng {
  /** Pick a random element from an array */
  pick<T>(arr: T[]): T;
  /** Random float in [0, 1) */
  float(): number;
  /** Random integer in [min, max] inclusive */
  int(min: number, max: number): number;
}

export function createRng(seed: string): Rng {
  const rand = mulberry32(djb2(seed || 'default'));
  return {
    pick<T>(arr: T[]): T {
      return arr[Math.floor(rand() * arr.length)];
    },
    float() {
      return rand();
    },
    int(min: number, max: number) {
      return Math.floor(rand() * (max - min + 1)) + min;
    },
  };
}
