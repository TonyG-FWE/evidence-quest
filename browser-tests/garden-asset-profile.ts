/** Test the explicitly selected artifact without treating pending artwork as approved. */
export const reviewProfile=process.env['EQ_ASSET_PROFILE']==='review';
export const expectedAssetStatus=reviewProfile?'p2-review':'approved-r2-feet';
export const pipAssetPattern=reviewProfile?'**/review-assets/pip-*.glb':'**/garden-assets/pip-*.glb';
export const modelAssetPattern=reviewProfile?'**/review-assets/*.glb':'**/garden-assets/*.glb';
// Page zero is planting; page one uses this fixture's absent-Mara gathering.
export const endingActorIds=['pip','grandma'];
export const gatheringActorIds=reviewProfile?['pip','grandma','sol']:['pip','grandma'];
export const plantingObjectIds=reviewProfile?['soil-covered','flower-2','sprout']:[];
