import { useCustomizerStore } from '../state/useCustomizerStore';
import type { FigureRotation } from '../types';
import { Panel } from './Panel';

const AXES: Array<{ key: keyof FigureRotation; label: string }> = [
  { key: 'y', label: 'Turn (Y)' },
  { key: 'x', label: 'Tilt (X)' },
  { key: 'z', label: 'Roll (Z)' },
];

export function RotationControls() {
  const rotation = useCustomizerStore((s) => s.rotation);
  const setRotation = useCustomizerStore((s) => s.setRotation);
  const autoRotate = useCustomizerStore((s) => s.autoRotate);
  const setAutoRotate = useCustomizerStore((s) => s.setAutoRotate);

  return (
    <Panel title="Rotation">
      {AXES.map(({ key, label }) => (
        <div className="row" key={key}>
          <label className="row__label">{label}</label>
          <input
            type="range"
            min={-180}
            max={180}
            step={1}
            value={rotation[key]}
            onChange={(e) => setRotation({ [key]: Number(e.target.value) })}
          />
          <span className="row__value">{Math.round(rotation[key])}°</span>
        </div>
      ))}

      <div className="row">
        <label className="row__label">
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
          />{' '}
          Auto-rotate camera
        </label>
        <button className="link" onClick={() => setRotation({ x: 0, y: 0, z: 0 })}>
          reset
        </button>
      </div>
    </Panel>
  );
}
