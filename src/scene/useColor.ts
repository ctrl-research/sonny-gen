import { useCustomizerStore } from '../state/useCustomizerStore';
import type { ColorGroupId } from '../types';

/** Reactive hex colour for a colour group; meshes re-render when the user edits it. */
export function useColor(groupId: ColorGroupId): string {
  return useCustomizerStore((s) => s.colors[groupId] ?? '#ffffff');
}
