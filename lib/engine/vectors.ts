import {TRAITS, Trait, TraitVector, TraitDeltas} from '@/app/types';

export function createZeroVector(): TraitVector {
    const v = {} as TraitVector;
    for (const t of TRAITS) v[t] = 0;
    return v;
}

export function applyDeltas(vector: TraitVector, deltas: TraitDeltas): TraitVector {
    const next = {...vector};
    for (const t of TRAITS) {
        next[t] = vector[t] + (deltas[t] ?? 0);
    }
    return next;
}

export function normalize(vector: TraitVector,
maxes: TraitVector): TraitVector {
    const out = {} as TraitVector;
    for (const t of TRAITS) {
        out[t] = maxes[t] === 0 ? 0 : vector[t] / maxes[t];
    }
    return out;
}

export function cosineSimilarity(a: TraitVector, b: TraitVector): number {
    let dot = 0, magA = 0, magB = 0;
    for (const t of TRAITS) {
        dot += a[t] * b[t];
        magA += a[t] * a[t];
        magB += b[t] * b[t];
    }
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
