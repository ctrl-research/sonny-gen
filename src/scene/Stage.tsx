import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useCustomizerStore } from '../state/useCustomizerStore';
import { Accessories } from './Accessories';
import { Background } from './Background';
import { Figure } from './Figure';
import { LoadedModel } from './LoadedModel';
import { captureRefs } from './captureRefs';

const deg = THREE.MathUtils.degToRad;

/** Publishes the renderer/scene/camera to captureRefs so export utilities can reach them. */
function CaptureBridge() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    captureRefs.gl = gl;
    captureRefs.scene = scene;
    captureRefs.camera = camera;
    return () => {
      captureRefs.gl = null;
      captureRefs.scene = null;
      captureRefs.camera = null;
    };
  }, [gl, scene, camera]);
  return null;
}

/** The rotatable group holding the figure + accessories; also the GLB export target. */
function ModelGroup() {
  const source = useCustomizerStore((s) => s.source);
  const glbUrl = useCustomizerStore((s) => s.glbUrl);
  const rotation = useCustomizerStore((s) => s.rotation);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    captureRefs.figure = ref.current;
    return () => {
      captureRefs.figure = null;
    };
  });

  return (
    <group ref={ref} rotation={[deg(rotation.x), deg(rotation.y), deg(rotation.z)]}>
      {source === 'glb' && glbUrl ? <LoadedModel url={glbUrl} /> : <Figure />}
      <Accessories />
    </group>
  );
}

export function Stage() {
  const backgroundId = useCustomizerStore((s) => s.backgroundId);
  const autoRotate = useCustomizerStore((s) => s.autoRotate);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 5], fov: 40 }}
      gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
    >
      <CaptureBridge />
      <Background backgroundId={backgroundId} />
      <Suspense fallback={null}>
        <ModelGroup />
      </Suspense>
      <OrbitControls
        makeDefault
        autoRotate={autoRotate}
        autoRotateSpeed={2}
        enablePan={false}
        minDistance={2.5}
        maxDistance={10}
        target={[0, 0.9, 0]}
      />
    </Canvas>
  );
}
