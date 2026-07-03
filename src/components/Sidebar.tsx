import { useCustomizerStore } from '../state/useCustomizerStore';
import { ModelPanel } from './ModelPanel';
import { ColorPanel } from './ColorPanel';
import { AccessoryPanel } from './AccessoryPanel';
import { BackgroundPanel } from './BackgroundPanel';
import { RotationControls } from './RotationControls';
import { ExportPanel } from './ExportPanel';

export function Sidebar() {
  const resetAll = useCustomizerStore((s) => s.resetAll);

  return (
    <aside className="sidebar">
      <header className="sidebar__header">
        <h1>sonny-gen</h1>
        <button className="link" onClick={resetAll}>
          reset all
        </button>
      </header>
      <ModelPanel />
      <ColorPanel />
      <AccessoryPanel />
      <BackgroundPanel />
      <RotationControls />
      <ExportPanel />
    </aside>
  );
}
