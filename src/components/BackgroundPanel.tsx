import { useCustomizerStore } from '../state/useCustomizerStore';
import { BACKGROUNDS } from '../state/presets';
import { Panel } from './Panel';

function swatchStyle(bg: (typeof BACKGROUNDS)[number]): React.CSSProperties {
  if (bg.kind === 'gradient' && bg.top && bg.bottom) {
    return { background: `linear-gradient(${bg.top}, ${bg.bottom})` };
  }
  return { background: bg.color ?? '#ffffff' };
}

export function BackgroundPanel() {
  const backgroundId = useCustomizerStore((s) => s.backgroundId);
  const setBackground = useCustomizerStore((s) => s.setBackground);

  return (
    <Panel title="Background">
      <div className="swatch-grid">
        {BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            className={`swatch ${backgroundId === bg.id ? 'is-active' : ''}`}
            style={swatchStyle(bg)}
            onClick={() => setBackground(bg.id)}
            title={bg.label}
            aria-label={bg.label}
          />
        ))}
      </div>
    </Panel>
  );
}
