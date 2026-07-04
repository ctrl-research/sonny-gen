import type { CustomizerConfig, FigureRotation, SlotId } from '../types';
import { CONFIG_VERSION, SLOTS } from '../types';
import {
  ACCESSORY_BY_ID,
  BACKGROUND_IDS,
  COLOR_GROUP_IDS,
  DEFAULT_CONFIG,
} from '../state/presets';
import { downloadBlob } from './download';

export class ConfigError extends Error {}

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeRotation(value: unknown): FigureRotation {
  const src = isPlainObject(value) ? value : {};
  const axis = (v: unknown) => {
    const n = typeof v === 'number' && Number.isFinite(v) ? v : 0;
    return Math.max(-180, Math.min(180, n));
  };
  return { x: axis(src.x), y: axis(src.y), z: axis(src.z) };
}

/**
 * Validates and normalizes an untrusted config object. Structural problems (not an object,
 * `colors` not an object) are rejected; individual bad values fall back to defaults so a
 * slightly-off preset still loads a sensible look.
 */
export function normalizeConfig(input: unknown): CustomizerConfig {
  if (!isPlainObject(input)) {
    throw new ConfigError('Config must be a JSON object.');
  }
  if (!isPlainObject(input.colors)) {
    throw new ConfigError('Config "colors" must be an object.');
  }

  const colors: Record<string, string> = { ...DEFAULT_CONFIG.colors };
  for (const [id, value] of Object.entries(input.colors)) {
    if (COLOR_GROUP_IDS.has(id) && typeof value === 'string' && HEX.test(value)) {
      colors[id] = value;
    }
  }

  const activeAccessories: Record<SlotId, string | null> = {
    ...DEFAULT_CONFIG.activeAccessories,
  };
  const inputAccessories = isPlainObject(input.activeAccessories) ? input.activeAccessories : {};
  for (const slot of SLOTS) {
    const value = inputAccessories[slot];
    if (value === null) {
      activeAccessories[slot] = null;
    } else if (typeof value === 'string') {
      const def = ACCESSORY_BY_ID.get(value);
      activeAccessories[slot] = def && def.slot === slot ? value : null;
    }
  }

  const backgroundId =
    typeof input.backgroundId === 'string' && BACKGROUND_IDS.has(input.backgroundId)
      ? input.backgroundId
      : DEFAULT_CONFIG.backgroundId;

  const source = input.source === 'glb' ? 'glb' : 'procedural';

  return {
    version: CONFIG_VERSION,
    source,
    colors,
    activeAccessories,
    backgroundId,
    rotation: normalizeRotation(input.rotation),
    autoRotate: input.autoRotate === true,
  };
}

export function serializeConfig(config: CustomizerConfig): string {
  return JSON.stringify(config, null, 2);
}

export function parseConfig(text: string): CustomizerConfig {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new ConfigError('File is not valid JSON.');
  }
  return normalizeConfig(parsed);
}

export function downloadConfig(config: CustomizerConfig, filename = 'sonny-gen-preset.json') {
  const blob = new Blob([serializeConfig(config)], { type: 'application/json' });
  downloadBlob(blob, filename);
}

export async function readConfigFile(file: File): Promise<CustomizerConfig> {
  const text = await file.text();
  return parseConfig(text);
}
