import { useCustomizerStore } from '../state/useCustomizerStore';
import { COLOR_GROUPS } from '../state/presets';
import { Panel } from './Panel';

export function ColorPanel() {
  const colors = useCustomizerStore((s) => s.colors);
  const setColor = useCustomizerStore((s) => s.setColor);
  const resetColor = useCustomizerStore((s) => s.resetColor);

  return (
    <Panel title="Colours">
      {COLOR_GROUPS.map((group) => (
        <div className="row" key={group.id}>
          <label className="row__label" htmlFor={`color-${group.id}`}>
            {group.label}
          </label>
          <input
            id={`color-${group.id}`}
            type="color"
            value={colors[group.id] ?? group.default}
            onChange={(e) => setColor(group.id, e.target.value)}
          />
          <button className="link" onClick={() => resetColor(group.id)} title="Reset colour">
            reset
          </button>
        </div>
      ))}
    </Panel>
  );
}
