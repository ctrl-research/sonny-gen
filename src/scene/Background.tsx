import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { BACKGROUND_BY_ID } from '../state/presets';
import { GROUND_GROUP_NAME } from './captureRefs';

function makeGradientTexture(top: string, bottom: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, top);
  grad.addColorStop(1, bottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Draws the selected background into the WebGL scene (so it is captured by PNG export) and
 * lights the scene. Reflections come from an inline Lightformer environment that is generated
 * on the GPU — no HDR files are fetched, keeping the app fully client-side/offline.
 */
export function Background({ backgroundId }: { backgroundId: string }) {
  const scene = useThree((s) => s.scene);
  const def = BACKGROUND_BY_ID.get(backgroundId);

  useEffect(() => {
    if (!def) return;
    let disposable: THREE.Texture | null = null;
    if (def.kind === 'gradient' && def.top && def.bottom) {
      disposable = makeGradientTexture(def.top, def.bottom);
      scene.background = disposable;
    } else if (def.color) {
      scene.background = new THREE.Color(def.color);
    }
    return () => {
      disposable?.dispose();
    };
  }, [def, scene]);

  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight intensity={0.35} groundColor="#b0b0b0" />
      <directionalLight position={[3, 6, 4]} intensity={1.1} castShadow />

      {/* Offline IBL for soft reflections (no external assets). */}
      <Environment resolution={128}>
        <Lightformer intensity={1.2} position={[0, 3, 2]} scale={[6, 4, 1]} color="#ffffff" />
        <Lightformer intensity={0.6} position={[-4, 1, -2]} scale={[3, 3, 1]} color="#dfe7ff" />
        <Lightformer intensity={0.6} position={[4, 1, -2]} scale={[3, 3, 1]} color="#fff0e0" />
      </Environment>

      {def?.ground && (
        <group name={GROUND_GROUP_NAME}>
          <ContactShadows position={[0, -0.55, 0]} opacity={0.4} scale={8} blur={2.4} far={4} />
        </group>
      )}
    </>
  );
}
