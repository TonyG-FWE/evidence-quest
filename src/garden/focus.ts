import type {FocusAnchor} from './interaction.js';
const selector='button,input,textarea,select,summary,a[href]';
const label=(element:Element)=>element.getAttribute('aria-label')??element.textContent?.trim()??'';
export function captureFocus(element:Element|null=document.activeElement):FocusAnchor|null {
 if(!element?.matches(selector))return null;
 const text=label(element),matches=Array.from(document.querySelectorAll(selector)).filter(e=>e.tagName===element.tagName&&label(e)===text);
 return {label:text,tag:element.tagName,index:matches.indexOf(element),...(element.id?{id:element.id}:{})};
}
export function restoreViewFocus(anchor:FocusAnchor|null,root:HTMLElement){
 const exact=anchor?.id?document.getElementById(anchor.id):null;
 const matches=anchor?Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(e=>e.tagName===anchor.tag&&label(e)===anchor.label&&e.getClientRects().length&&!e.closest('[inert]')):[];
 const target=exact?.getClientRects().length?exact:matches[anchor?.index??0]??matches[0];
 if(target){target.focus();if(document.activeElement===target)return;}
 (root.querySelector<HTMLElement>('h2[tabindex]')??root.querySelector<HTMLElement>('button:not(:disabled),summary'))?.focus();
}
