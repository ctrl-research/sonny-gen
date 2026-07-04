import { describe, expect, it } from 'vitest';
import {
  ACCESSORIES,
  BACKGROUND_IDS,
  COLOR_GROUPS,
  COLOR_GROUP_IDS,
  DEFAULT_CONFIG,
} from './presets';
import { ACCESSORY_COMPONENTS } from '../scene/accessoryComponents';
import { SLOTS } from '../types';

describe('preset integrity', () => {
  it('every accessory references valid slots and colour groups', () => {
    for (const accessory of ACCESSORIES) {
      expect(SLOTS).toContain(accessory.slot);
      for (const groupId of accessory.colorGroups) {
        expect(COLOR_GROUP_IDS.has(groupId)).toBe(true);
      }
    }
  });

  it('every accessory has a matching scene component', () => {
    for (const accessory of ACCESSORIES) {
      expect(ACCESSORY_COMPONENTS[accessory.id]).toBeTypeOf('function');
    }
  });

  it('default config references valid ids', () => {
    expect(BACKGROUND_IDS.has(DEFAULT_CONFIG.backgroundId)).toBe(true);
    for (const groupId of Object.keys(DEFAULT_CONFIG.colors)) {
      expect(COLOR_GROUP_IDS.has(groupId)).toBe(true);
    }
    expect(Object.keys(DEFAULT_CONFIG.colors).sort()).toEqual(
      COLOR_GROUPS.map((g) => g.id).sort(),
    );
  });

  it('default colours are valid hex', () => {
    for (const group of COLOR_GROUPS) {
      expect(group.default).toMatch(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    }
  });
});
