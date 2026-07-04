import { useRef, useState } from 'react';
import { useCustomizerStore } from '../state/useCustomizerStore';
import { exportPng } from '../export/exportPng';
import { exportGlb } from '../export/exportGlb';
import { downloadConfig, readConfigFile } from '../export/config';
import { Panel } from './Panel';

export function ExportPanel() {
  const getConfig = useCustomizerStore((s) => s.getConfig);
  const loadConfig = useCustomizerStore((s) => s.loadConfig);
  const importRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = (label: string, fn: () => void | Promise<unknown>) => {
    setError(null);
    setStatus(null);
    try {
      const result = fn();
      Promise.resolve(result)
        .then(() => setStatus(`${label} exported.`))
        .catch((e) => setError(e instanceof Error ? e.message : `${label} failed.`));
    } catch (e) {
      setError(e instanceof Error ? e.message : `${label} failed.`);
    }
  };

  const importPreset = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setStatus(null);
    try {
      const config = await readConfigFile(file);
      loadConfig(config);
      setStatus('Preset loaded.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not read preset.');
    }
  };

  return (
    <Panel title="Export">
      <div className="button-grid">
        <button onClick={() => run('PNG', () => exportPng())}>PNG</button>
        <button onClick={() => run('Transparent PNG', () => exportPng({ transparent: true }))}>
          Transparent PNG
        </button>
        <button onClick={() => run('GLB', () => exportGlb())}>3D model (GLB)</button>
        <button onClick={() => run('Preset', () => downloadConfig(getConfig()))}>
          Save preset
        </button>
      </div>

      <button className="wide" onClick={() => importRef.current?.click()}>
        Load preset…
      </button>
      <input
        ref={importRef}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={(e) => importPreset(e.target.files?.[0])}
      />

      {status && <p className="status">{status}</p>}
      {error && <p className="error">{error}</p>}
    </Panel>
  );
}
