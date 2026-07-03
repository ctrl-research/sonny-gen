import { Center, useGLTF } from '@react-three/drei';

/** Renders a user-supplied GLB/GLTF, auto-centred so it sits on the stage like the base figure. */
export function LoadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}
