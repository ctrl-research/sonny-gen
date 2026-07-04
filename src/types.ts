// Shared domain types for the customizer. The persisted `CustomizerConfig` is the
// single serializable description of a look — it is what the JSON preset export writes
// and what import restores. Runtime-only state (e.g. a loaded GLB object URL) lives on
// the store but is intentionally NOT part of the config.

export type ColorGroupId = string;
export type AccessoryId = string;
export type BackgroundId = string;

/** Attachment points on the figure that accessories can occupy. */
export type SlotId = 'head' | 'back';

export const SLOTS: SlotId[] = ['head', 'back'];

/** A user-editable colour, applied to every mesh tagged with its id. */
export interface ColorGroup {
  id: ColorGroupId;
  label: string;
  default: string; // hex, e.g. "#ffccdd"
}

export interface AccessoryDef {
  id: AccessoryId;
  label: string;
  slot: SlotId;
  /** Colour groups this accessory's meshes read from. */
  colorGroups: ColorGroupId[];
}

export type BackgroundKind = 'solid' | 'gradient' | 'environment';

/** drei <Environment preset> names we expose. */
export type EnvironmentPreset = 'studio' | 'sunset' | 'park' | 'dawn';

export interface BackgroundDef {
  id: BackgroundId;
  label: string;
  kind: BackgroundKind;
  color?: string; // solid
  top?: string; // gradient top
  bottom?: string; // gradient bottom
  preset?: EnvironmentPreset; // environment
  /** Whether to render the shadow-catching ground for this background. */
  ground?: boolean;
}

export interface FigureRotation {
  x: number;
  y: number;
  z: number;
}

export type ModelSource = 'procedural' | 'glb';

export const CONFIG_VERSION = 1 as const;

/** The full, serializable description of a customized figure. */
export interface CustomizerConfig {
  version: typeof CONFIG_VERSION;
  source: ModelSource;
  colors: Record<ColorGroupId, string>;
  activeAccessories: Record<SlotId, AccessoryId | null>;
  backgroundId: BackgroundId;
  rotation: FigureRotation;
  autoRotate: boolean;
}
