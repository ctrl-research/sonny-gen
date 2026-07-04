import { useRef, useState } from 'react';
import { useCustomizerStore } from '../state/useCustomizerStore';
import { useGlbLoader } from '../loaders/useGlbLoader';
import { Panel } from './Panel';

export function ModelPanel() {
  const source = useCustomizerStore((s) => s.source);
  const glbUrl = useCustomizerStore((s) => s.glbUrl);
  const setSource = useCustomizerStore((s) => s.setSource);
  const { loadFile } = useGlbLoader();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loadedName, setLoadedName] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    try {
      loadFile(file);
      setLoadedName(file.name);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load file.');
    }
  };

  return (
    <Panel title="Model">
      <div className="segmented">
        <button
          className={source === 'procedural' ? 'is-active' : ''}
          onClick={() => setSource('procedural')}
        >
          Base figure
        </button>
        <button
          className={source === 'glb' ? 'is-active' : ''}
          onClick={() => setSource('glb')}
          disabled={!glbUrl}
          title={glbUrl ? undefined : 'Load a model first'}
        >
          Loaded model
        </button>
      </div>

      <div
        className={`dropzone ${dragging ? 'is-dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => inputRef.current?.click()}
      >
        <p>Drop a .glb / .gltf here, or click to browse</p>
        {loadedName && <p className="dropzone__file">Loaded: {loadedName}</p>}
        <input
          ref={inputRef}
          type="file"
          accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && <p className="error">{error}</p>}
    </Panel>
  );
}
