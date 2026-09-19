export const narrativeEditions=['original','literary-20260916'] as const;
export type NarrativeEdition=typeof narrativeEditions[number];
export type MaintenanceEdition='staged-20260916';
/** The note follows committed construction, independently of the story edition. */
export type NarrativeContext={narrativeEdition?:NarrativeEdition;maintenanceEdition?:MaintenanceEdition;river?:{construction?:{version:number}}};
export const editionOf=(context?:NarrativeContext):NarrativeEdition=>context?.narrativeEdition??'original';
export const isNarrativeEdition=(value:unknown):value is NarrativeEdition=>typeof value==='string'&&(narrativeEditions as readonly string[]).includes(value);
export const isLiterary=(context?:NarrativeContext)=>editionOf(context)==='literary-20260916';
export const maintenanceOf=(context?:NarrativeContext):MaintenanceEdition|undefined=>context?.maintenanceEdition??(context?.river?.construction?.version===1?'staged-20260916':undefined);
export const isMaintenanceEdition=(value:unknown):value is MaintenanceEdition=>value==='staged-20260916';
export const readingContextOf=(context?:NarrativeContext)=>({narrativeEdition:editionOf(context),...(maintenanceOf(context)?{maintenanceEdition:maintenanceOf(context)!}:{})});
