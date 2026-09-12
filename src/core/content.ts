import raw from '../../content/authored.json' with { type: 'json' };
import type { AuthoredContent } from '../../contracts/types.js';
import { validateAuthoredContent } from '../../contracts/generated/validators.mjs';

if (!validateAuthoredContent(raw) || raw.completeness !== 'full') throw new Error('CONTENT_INVALID');
export const content: AuthoredContent = raw;
export const texts = new Map(content.texts.map(t => [t.id,t]));
export function copy(id: string, slots: Record<string,string|number> = {}): string {
  const entry = texts.get(id);
  if (!entry) throw new Error(`Unknown canonical copy: ${id}`);
  return entry.text.replace(/\{(\w+)\}/g, (_token: string, name: string) => {
    if (slots[name] === undefined) throw new Error(`Missing slot ${id}:${name}`);
    return String(slots[name]);
  });
}
export const parts = new Map(content.sources.flatMap(s => s.parts).map(p => [p.refId,p]));
export const objects = new Map(content.objects.map(o => [o.id,o]));
export const tileName = (id: string): string => copy(`CT.TILE.LABEL.${id.slice(5)}`);
