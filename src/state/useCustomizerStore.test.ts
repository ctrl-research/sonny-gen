import { beforeEach, describe, expect, it } from 'vitest';
import { useCustomizerStore } from './useCustomizerStore';
import { DEFAULT_CONFIG } from './presets';

const store = useCustomizerStore;

beforeEach(() => {
  store.getState().resetAll();
});

describe('useCustomizerStore', () => {
  it('starts from the default config', () => {
    expect(store.getState().getConfig()).toEqual(DEFAULT_CONFIG);
  });

  it('sets and resets a colour group', () => {
    store.getState().setColor('body', '#123456');
    expect(store.getState().colors.body).toBe('#123456');
    store.getState().resetColor('body');
    expect(store.getState().colors.body).toBe(DEFAULT_CONFIG.colors.body);
  });

  it('toggles accessories per slot', () => {
    store.getState().setAccessory('head', 'halo');
    store.getState().setAccessory('back', 'wings');
    expect(store.getState().activeAccessories).toEqual({ head: 'halo', back: 'wings' });
    store.getState().setAccessory('head', null);
    expect(store.getState().activeAccessories.head).toBeNull();
  });

  it('updates rotation partially and independently per axis', () => {
    store.getState().setRotation({ y: 90 });
    store.getState().setRotation({ x: -30 });
    expect(store.getState().rotation).toEqual({ x: -30, y: 90, z: 0 });
  });

  it('loads a config and fills missing keys from defaults', () => {
    store.getState().loadConfig({
      ...DEFAULT_CONFIG,
      backgroundId: 'sunset',
      colors: { body: '#00ff00' },
      activeAccessories: { head: 'fruit', back: null },
    });
    const state = store.getState();
    expect(state.backgroundId).toBe('sunset');
    expect(state.colors.body).toBe('#00ff00');
    // Missing colour keys fall back to defaults.
    expect(state.colors.blush).toBe(DEFAULT_CONFIG.colors.blush);
    expect(state.activeAccessories.head).toBe('fruit');
  });

  it('resetAll returns to defaults', () => {
    store.getState().setColor('body', '#000000');
    store.getState().setBackground('mint-solid');
    store.getState().resetAll();
    expect(store.getState().getConfig()).toEqual(DEFAULT_CONFIG);
  });
});
