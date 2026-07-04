import type {
  AccessoryDef,
  BackgroundDef,
  ColorGroup,
  CustomizerConfig,
  SlotId,
} from '../types';
import { CONFIG_VERSION } from '../types';

// Editable colour groups. Figure and accessory meshes reference these ids so a single
// colour value drives every mesh tagged with it.
export const COLOR_GROUPS: ColorGroup[] = [
  { id: 'body', label: 'Body', default: '#f6d7c4' },
  { id: 'blush', label: 'Blush', default: '#f2a2a2' },
  { id: 'eyes', label: 'Eyes', default: '#3a3a3a' },
  { id: 'accentPrimary', label: 'Accent', default: '#ff8fb1' },
  { id: 'accentSecondary', label: 'Accent 2', default: '#7fd3c9' },
];

// Procedural accessories, grouped by slot. `colorGroups` documents which colours a piece
// uses so the UI can hint at what a colour affects.
export const ACCESSORIES: AccessoryDef[] = [
  { id: 'hat', label: 'Party Hat', slot: 'head', colorGroups: ['accentPrimary', 'accentSecondary'] },
  { id: 'hood', label: 'Animal Hood', slot: 'head', colorGroups: ['accentPrimary'] },
  { id: 'fruit', label: 'Fruit Cap', slot: 'head', colorGroups: ['accentPrimary', 'accentSecondary'] },
  { id: 'halo', label: 'Halo', slot: 'head', colorGroups: ['accentSecondary'] },
  { id: 'wings', label: 'Wings', slot: 'back', colorGroups: ['accentSecondary'] },
];

// Visible backgrounds are drawn into the WebGL scene (solid colour or vertical gradient) so
// they are captured by PNG export. Reflections/IBL come from an offline Lightformer rig, so
// no HDR assets are fetched at runtime — the app stays fully client-side.
export const BACKGROUNDS: BackgroundDef[] = [
  { id: 'studio', label: 'Studio', kind: 'gradient', top: '#eef1f5', bottom: '#cfd6e0', ground: true },
  { id: 'sunset', label: 'Sunset', kind: 'gradient', top: '#ffd7a8', bottom: '#ff9e7d', ground: true },
  { id: 'sky', label: 'Sky', kind: 'gradient', top: '#bfe3ff', bottom: '#eaf7ff', ground: true },
  { id: 'blush-solid', label: 'Blush', kind: 'solid', color: '#ffe1ec', ground: true },
  { id: 'mint-solid', label: 'Mint', kind: 'solid', color: '#dcf5ee', ground: true },
];

function defaultColors(): Record<string, string> {
  return Object.fromEntries(COLOR_GROUPS.map((g) => [g.id, g.default]));
}

function emptySlots(): Record<SlotId, string | null> {
  return { head: null, back: null };
}

export const DEFAULT_CONFIG: CustomizerConfig = {
  version: CONFIG_VERSION,
  source: 'procedural',
  colors: defaultColors(),
  activeAccessories: { ...emptySlots(), head: 'hat' },
  backgroundId: 'studio',
  rotation: { x: 0, y: 0, z: 0 },
  autoRotate: false,
};

// Lookups used across the app.
export const COLOR_GROUP_IDS = new Set(COLOR_GROUPS.map((g) => g.id));
export const ACCESSORY_BY_ID = new Map(ACCESSORIES.map((a) => [a.id, a]));
export const BACKGROUND_BY_ID = new Map(BACKGROUNDS.map((b) => [b.id, b]));
export const BACKGROUND_IDS = new Set(BACKGROUNDS.map((b) => b.id));

export function accessoriesForSlot(slot: SlotId): AccessoryDef[] {
  return ACCESSORIES.filter((a) => a.slot === slot);
}
