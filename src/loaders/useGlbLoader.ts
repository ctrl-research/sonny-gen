import { useCallback, useEffect, useRef } from 'react';
import { useCustomizerStore } from '../state/useCustomizerStore';

/**
 * Loads a user-selected GLB/GLTF file into the scene via an object URL, switching the model
 * source to 'glb'. Object URLs are revoked when replaced or on unmount to avoid leaks.
 */
export function useGlbLoader() {
  const setGlbUrl = useCustomizerStore((s) => s.setGlbUrl);
  const setSource = useCustomizerStore((s) => s.setSource);
  const currentUrl = useCustomizerStore((s) => s.glbUrl);
  const trackedUrl = useRef<string | null>(null);

  const loadFile = useCallback(
    (file: File) => {
      if (!/\.(glb|gltf)$/i.test(file.name)) {
        throw new Error('Please choose a .glb or .gltf file.');
      }
      const url = URL.createObjectURL(file);
      setGlbUrl(url);
      setSource('glb');
    },
    [setGlbUrl, setSource],
  );

  useEffect(() => {
    const previous = trackedUrl.current;
    if (previous && previous !== currentUrl) {
      URL.revokeObjectURL(previous);
    }
    trackedUrl.current = currentUrl;
  }, [currentUrl]);

  return { loadFile };
}
