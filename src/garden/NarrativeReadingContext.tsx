import {createContext,useContext} from 'react';
import type {NarrativeEdition} from './narrativeEdition.js';
import {narrativeLine} from './narrativeDialogue.js';
export const NarrativeReadingContext=createContext<NarrativeEdition>('original');
export function useNarrativeLine(){const narrativeEdition=useContext(NarrativeReadingContext);return (text:string)=>narrativeLine({narrativeEdition},text);}
