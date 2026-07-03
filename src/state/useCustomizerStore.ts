import { create } from 'zustand';
import type {
  ColorGroupId,
  CustomizerConfig,
  FigureRotation,
  ModelSource,
  SlotId,
} from '../types';
import { DEFAULT_CONFIG } from './presets';

/** Pull just the serializable config out of the full store state. */
export function extractConfig(state: CustomizerConfig): CustomizerConfig {
  return {
    version: state.version,
    source: state.source,
    colors: { ...state.colors },
    activeAccessories: { ...state.activeAccessories },
    backgroundId: state.backgroundId,
    rotation: { ...state.rotation },
    autoRotate: state.autoRotate,
  };
}

interface CustomizerState extends CustomizerConfig {
  /** Object URL of a user-loaded GLB. Runtime-only; not part of the persisted config. */
  glbUrl: string | null;

  setColor: (groupId: ColorGroupId, hex: string) => void;
  resetColor: (groupId: ColorGroupId) => void;
  setAccessory: (slot: SlotId, accessoryId: string | null) => void;
  setBackground: (id: string) => void;
  setRotation: (partial: Partial<FigureRotation>) => void;
  setAutoRotate: (value: boolean) => void;
  setSource: (source: ModelSource) => void;
  setGlbUrl: (url: string | null) => void;

  getConfig: () => CustomizerConfig;
  loadConfig: (config: CustomizerConfig) => void;
  resetAll: () => void;
}

function initialState(): CustomizerConfig {
  return extractConfig(DEFAULT_CONFIG);
}

export const useCustomizerStore = create<CustomizerState>((set, get) => ({
  ...initialState(),
  glbUrl: null,

  setColor: (groupId, hex) =>
    set((s) => ({ colors: { ...s.colors, [groupId]: hex } })),

  resetColor: (groupId) =>
    set((s) => ({
      colors: { ...s.colors, [groupId]: DEFAULT_CONFIG.colors[groupId] ?? s.colors[groupId] },
    })),

  setAccessory: (slot, accessoryId) =>
    set((s) => ({ activeAccessories: { ...s.activeAccessories, [slot]: accessoryId } })),

  setBackground: (id) => set({ backgroundId: id }),

  setRotation: (partial) => set((s) => ({ rotation: { ...s.rotation, ...partial } })),

  setAutoRotate: (value) => set({ autoRotate: value }),

  setSource: (source) => set({ source }),

  setGlbUrl: (url) => set({ glbUrl: url }),

  getConfig: () => extractConfig(get()),

  loadConfig: (config) =>
    set({
      version: config.version,
      source: config.source,
      colors: { ...DEFAULT_CONFIG.colors, ...config.colors },
      activeAccessories: { ...DEFAULT_CONFIG.activeAccessories, ...config.activeAccessories },
      backgroundId: config.backgroundId,
      rotation: { ...config.rotation },
      autoRotate: config.autoRotate,
    }),

  resetAll: () => set({ ...initialState() }),
}));
