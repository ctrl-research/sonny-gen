import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { captureRefs } from '../scene/captureRefs';
import { downloadBlob } from './download';

/** Exports the figure + accessories group as a binary .glb file. */
export function exportGlb(filename = 'sonny-gen.glb'): Promise<void> {
  const target = captureRefs.figure;
  if (!target) {
    return Promise.reject(new Error('Figure is not ready yet.'));
  }

  const exporter = new GLTFExporter();
  return new Promise((resolve, reject) => {
    exporter.parse(
      target,
      (result) => {
        const blob = new Blob([result as ArrayBuffer], { type: 'model/gltf-binary' });
        downloadBlob(blob, filename);
        resolve();
      },
      (error) => reject(error),
      { binary: true },
    );
  });
}
