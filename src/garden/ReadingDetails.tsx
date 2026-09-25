import type {ReactNode} from 'react';
import type {GardenState,GardenStore} from './model.js';
import {GroupedReadingContext} from './Reading.js';
/** Keep the same reading disclosure when a temporary source or world preview returns. */
export function ReadingDetails({id,s,store,children}:{id:string;s:GardenState;store:GardenStore;children:ReactNode}){
 return <details open={!!s.viewDrafts.disclosures[id]} onToggle={event=>store.send({type:'DISCLOSURE',id,open:event.currentTarget.open})}><GroupedReadingContext.Provider value={false}>{children}</GroupedReadingContext.Provider></details>;
}
