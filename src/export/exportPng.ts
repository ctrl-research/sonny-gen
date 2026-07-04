import { captureRefs, GROUND_GROUP_NAME } from '../scene/captureRefs';
import { downloadUrl } from './download';

export interface PngExportOptions {
  transparent?: boolean;
  filename?: string;
}

/**
 * Captures the current view as a PNG. For a transparent export, the scene background and the
 * shadow-catching ground are hidden for a single render, then restored. Relies on the canvas
 * being created with `preserveDrawingBuffer: true` (see Stage).
 */
export function exportPng({ transparent = false, filename }: PngExportOptions = {}) {
  const { gl, scene, camera } = captureRefs;
  if (!gl || !scene || !camera) {
    throw new Error('Scene is not ready yet.');
  }

  const prevBackground = scene.background;
  const ground = scene.getObjectByName(GROUND_GROUP_NAME);
  const prevGroundVisible = ground?.visible;

  if (transparent) {
    scene.background = null;
    if (ground) ground.visible = false;
  }

  gl.render(scene, camera);
  const dataUrl = gl.domElement.toDataURL('image/png');

  // Restore and re-render so the live view is unchanged.
  scene.background = prevBackground;
  if (ground && prevGroundVisible !== undefined) ground.visible = prevGroundVisible;
  gl.render(scene, camera);

  downloadUrl(dataUrl, filename ?? (transparent ? 'sonny-gen-transparent.png' : 'sonny-gen.png'));
}
