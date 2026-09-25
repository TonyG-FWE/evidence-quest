/** Only readable language may enter the voice catalogue, including strings stored outside JSX. */
export function isSpokenText(text){
 if(!/[A-Za-z]/.test(text)||text.length>=1800)return false;
 if(!/\s/.test(text)&&!/^[A-Z][a-z]+[.!?]?$/.test(text))return false;
 if(/[{}<>\[\]]|\bdata-[a-z-]+|\bg-[a-z-]+|(?:^|\s)(?:import|export|const)\s|\.(?:glb|png|webp|json|ts|mp3)|(?:https?:|\/api\/)|#[0-9a-f]{6}/i.test(text))return false;
 if(/^[’']s\b/.test(text))return false;
 // SVG paths and transforms also occur in object literals and conditional expressions.
 if(/\b(?:matrix|translate|scale|rotate|skew[xy]|rgba?|hsla?|url|calc)\s*\(/i.test(text))return false;
 if(/(?:\d[A-Za-z]|[A-Za-z]\d)|\b(?:px|rem|em|vh|vw)\b|\b(?:sans-serif|monospace|currentColor|strokeWidth)\b/.test(text))return false;
 return true;
}

export const pronunciationKey=text=>text.toLowerCase().replace(/’/g,"'");
export const isPronunciationEntry=entry=>entry.speaker==='narrator'&&entry.sources.includes('authored word')&&/^[A-Za-z]+(?:['’][A-Za-z]+)?$/.test(entry.text);
