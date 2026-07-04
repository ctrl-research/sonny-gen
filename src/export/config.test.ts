import { describe, expect, it } from 'vitest';
import {
  ConfigError,
  normalizeConfig,
  parseConfig,
  serializeConfig,
} from './config';
import { DEFAULT_CONFIG } from '../state/presets';

describe('config serialization', () => {
  it('round-trips the default config', () => {
    const text = serializeConfig(DEFAULT_CONFIG);
    expect(parseConfig(text)).toEqual(DEFAULT_CONFIG);
  });

  it('round-trips a customized config', () => {
    const config = {
      ...DEFAULT_CONFIG,
      backgroundId: 'sky',
      colors: { ...DEFAULT_CONFIG.colors, body: '#abcdef' },
      activeAccessories: { head: 'halo' as const, back: 'wings' as const },
      rotation: { x: 10, y: -45, z: 0 },
      autoRotate: true,
    };
    expect(parseConfig(serializeConfig(config))).toEqual(config);
  });
});

describe('config validation', () => {
  it('rejects invalid JSON', () => {
    expect(() => parseConfig('{ not json')).toThrow(ConfigError);
  });

  it('rejects non-object input', () => {
    expect(() => normalizeConfig(42)).toThrow(ConfigError);
    expect(() => normalizeConfig(null)).toThrow(ConfigError);
    expect(() => normalizeConfig([])).toThrow(ConfigError);
  });

  it('rejects when colors is not an object', () => {
    expect(() => normalizeConfig({ colors: 'nope' })).toThrow(ConfigError);
  });

  it('ignores unknown colour groups and invalid hex values', () => {
    const result = normalizeConfig({
      colors: { body: '#fff', bogus: '#000', eyes: 'not-a-hex' },
    });
    expect(result.colors.body).toBe('#fff');
    expect(result.colors.eyes).toBe(DEFAULT_CONFIG.colors.eyes); // invalid -> default
    expect('bogus' in result.colors).toBe(false);
  });

  it('drops accessories that do not exist or are in the wrong slot', () => {
    const result = normalizeConfig({
      colors: {},
      activeAccessories: { head: 'wings', back: 'made-up' },
    });
    // 'wings' is a back accessory, invalid for head; 'made-up' unknown.
    expect(result.activeAccessories.head).toBeNull();
    expect(result.activeAccessories.back).toBeNull();
  });

  it('falls back to the default background for unknown ids', () => {
    const result = normalizeConfig({ colors: {}, backgroundId: 'nope' });
    expect(result.backgroundId).toBe(DEFAULT_CONFIG.backgroundId);
  });

  it('clamps rotation to [-180, 180] and defaults non-numbers', () => {
    const result = normalizeConfig({
      colors: {},
      rotation: { x: 999, y: -999, z: 'spin' },
    });
    expect(result.rotation).toEqual({ x: 180, y: -180, z: 0 });
  });

  it('coerces source and autoRotate safely', () => {
    expect(normalizeConfig({ colors: {}, source: 'glb' }).source).toBe('glb');
    expect(normalizeConfig({ colors: {}, source: 'weird' }).source).toBe('procedural');
    expect(normalizeConfig({ colors: {}, autoRotate: 'yes' }).autoRotate).toBe(false);
  });
});
