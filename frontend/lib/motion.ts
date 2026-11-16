// Shared motion tokens. Principles:
// - UI feedback is fast (150–250ms); larger surfaces (drawers, pages) 300–450ms.
// - Enter with ease-out, exit faster than enter.
// - Never scale from 0; start from ~0.95 so motion feels physical, not "popped".
// - Springs for things the user directly manipulates or that should feel tactile.

export const ease = {
  out: [0.22, 1, 0.36, 1] as const, // smooth deceleration (enter)
  in: [0.4, 0, 1, 1] as const, // quick acceleration (exit)
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
};

export const spring = {
  /** Tactile press / pop feedback. */
  snappy: { type: 'spring', stiffness: 500, damping: 30, mass: 0.8 } as const,
  /** Drawers and layout reflow: smooth, no overshoot. */
  smooth: { type: 'spring', stiffness: 320, damping: 36, mass: 1 } as const,
};
