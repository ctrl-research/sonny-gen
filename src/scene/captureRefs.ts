import type { WebGLRenderer, Scene, Camera, Group } from 'three';

// Live handles to the Three.js objects the export utilities need. Populated from inside
// the R3F <Canvas> (which owns the renderer) and read by the export functions, which run
// outside the React tree. Names used to locate the shadow-catching ground for transparent
// exports are kept here so scene and export stay in sync.
export const GROUND_GROUP_NAME = 'sonny-gen-ground';

export interface CaptureRefs {
  gl: WebGLRenderer | null;
  scene: Scene | null;
  camera: Camera | null;
  /** The rotatable group containing the figure + accessories (the GLB export target). */
  figure: Group | null;
}

export const captureRefs: CaptureRefs = {
  gl: null,
  scene: null,
  camera: null,
  figure: null,
};
