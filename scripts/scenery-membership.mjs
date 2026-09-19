/** Runtime membership for the landscape assembled by reviewLandscape.ts. */
export function addSceneryMembership(membership){
 for(const place of ['crossing','dock','river','garden','bakery','workshop'])membership[place]=[...new Set([...membership[place],'tree','tree-1','willow','rock','cattail','shrub','grass','grass-tuft'])];
 for(const place of ['dock','garden','workshop'])membership[place]=[...new Set([...membership[place],'grass-patch'])];
 for(const place of ['dock','garden','bakery','workshop'])membership[place]=[...new Set([...membership[place],'flower-sculpture'])];
 return membership;
}
