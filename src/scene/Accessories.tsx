import { useCustomizerStore } from '../state/useCustomizerStore';
import type { SlotId } from '../types';
import { BACK_ANCHOR, HEAD_ANCHOR } from './Figure';
import { ACCESSORY_COMPONENTS } from './accessoryComponents';

const SLOT_ANCHORS: Record<SlotId, [number, number, number]> = {
  head: HEAD_ANCHOR,
  back: BACK_ANCHOR,
};

/** Renders whichever accessory is active in each slot, at that slot's anchor. */
export function Accessories() {
  const activeAccessories = useCustomizerStore((s) => s.activeAccessories);

  return (
    <>
      {(Object.keys(SLOT_ANCHORS) as SlotId[]).map((slot) => {
        const id = activeAccessories[slot];
        if (!id) return null;
        const Component = ACCESSORY_COMPONENTS[id];
        if (!Component) return null;
        return (
          <group key={slot} position={SLOT_ANCHORS[slot]}>
            <Component />
          </group>
        );
      })}
    </>
  );
}
