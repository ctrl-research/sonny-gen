import { useCustomizerStore } from '../state/useCustomizerStore';
import { accessoriesForSlot } from '../state/presets';
import { SLOTS, type SlotId } from '../types';
import { Panel } from './Panel';

const SLOT_LABELS: Record<SlotId, string> = {
  head: 'Head',
  back: 'Back',
};

export function AccessoryPanel() {
  const activeAccessories = useCustomizerStore((s) => s.activeAccessories);
  const setAccessory = useCustomizerStore((s) => s.setAccessory);

  return (
    <Panel title="Accessories">
      {SLOTS.map((slot) => (
        <div className="accessory-slot" key={slot}>
          <span className="accessory-slot__label">{SLOT_LABELS[slot]}</span>
          <div className="chip-row">
            <button
              className={`chip ${activeAccessories[slot] === null ? 'is-active' : ''}`}
              onClick={() => setAccessory(slot, null)}
            >
              None
            </button>
            {accessoriesForSlot(slot).map((accessory) => (
              <button
                key={accessory.id}
                className={`chip ${activeAccessories[slot] === accessory.id ? 'is-active' : ''}`}
                onClick={() => setAccessory(slot, accessory.id)}
              >
                {accessory.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </Panel>
  );
}
