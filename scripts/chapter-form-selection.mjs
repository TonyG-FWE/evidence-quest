/** Resolve a human-approved chapter derivative without approving any other art. */
function approvedRecords(receipt){
 if(receipt.schema!=='evidence-quest.chapter-form-approval.v1'||receipt.approvedBy!=='Tony'||typeof receipt.userApproval!=='string'||!receipt.userApproval.trim())throw Error('Missing explicit chapter Form approval');
 if(!Array.isArray(receipt.assets))throw Error('Missing chapter Form asset records');
 const accepted=receipt.assets.filter(item=>item.status==='APPROVED');
 if(new Set(accepted.map(item=>item.id)).size!==accepted.length)throw Error('Duplicate chapter Form asset record');
 for(const item of accepted)if(!['pip-chapter','seed-boat','lantern-flower','painted-kit'].includes(item.id))throw Error('Unsupported chapter production asset: '+item.id);
 return accepted;
}
export function chapterFormSelection(receipt,candidates,sourceApproval,propCandidates){
 return approvedRecords(receipt).filter(item=>item.id!=='painted-kit').map(item=>{
  if(item.id==='seed-boat'||item.id==='lantern-flower'){
   const review=candidates.pendingForm?.props?.find(prop=>prop.id===item.id),visual=propCandidates?.props?.find(prop=>prop.id===item.id)?.visual;
   if(!review||!visual||item.sha256!==review.sha256||item.sha256!==visual.sha256||visual.id!==item.id||visual.uri!==`/pilot/review-sources/${item.id}/${item.id}-review.glb`)throw Error('Chapter prop Form approval hash/source mismatch: '+item.id);
   return {record:{id:item.id,status:'APPROVED',sha256:item.sha256,file:'evidence/hands-on-20260916'+visual.uri},visual,approvalRecord:'evidence/staged-bridge-20260916/chapter-form-approval.json'};
  }
  if(item.id!=='pip-chapter')throw Error('Unsupported chapter production asset: '+item.id);
  const visual=candidates.pipCombined;
  if(!visual||item.sha256!==visual.sha256||visual.id!=='pip'||visual.uri!=='/pilot/chapter-review/pip/pip-chapter-review.glb')throw Error('Chapter Form approval hash/source mismatch: '+item.id);
  const approved=sourceApproval.assets.find(asset=>asset.id==='pip'&&asset.status==='APPROVED');
  if(!approved||candidates.bridgeActions.sourceSha256!==approved.sha256)throw Error('Chapter action anatomy provenance mismatch');
  if(visual.rig?.clips?.idle!=='pip_idle'||visual.rig?.clips?.carryIdle!=='pip_carry_idle'||visual.rig?.actions?.post?.clip!=='pip_post_place'||visual.rig?.actions?.tie?.clip!=='pip_rope_tie')throw Error('Chapter action mappings do not preserve approved idle/carry behavior');
  return {record:{id:'pip',status:'APPROVED',sha256:item.sha256,file:'evidence/hands-on-20260916'+visual.uri},visual,approvalRecord:'evidence/staged-bridge-20260916/chapter-form-approval.json',anatomySha256:approved.sha256};
 });
}

/** Environment review covers the kit and the exact geometry it imports. */
export function chapterFinishSelection(receipt,candidates){
 const item=approvedRecords(receipt).find(record=>record.id==='painted-kit');
 if(!item)return null;
 const kit=candidates.pendingForm?.kit;
 if(!kit||item.sha256!==kit.sha256||kit.file!=='src/garden/assets/paintedKit.ts')throw Error('Chapter environment Form approval hash/source mismatch');
 const expected=['src/garden/worldLayout.ts','src/garden/worldArt.ts','src/garden/art.ts','src/garden/assets/naturalBoundary.ts'];
 if(!Array.isArray(kit.dependencies)||kit.dependencies.length!==expected.length||!expected.every(file=>kit.dependencies.some(dependency=>dependency.file===file)))throw Error('Chapter environment review dependencies are incomplete');
 if(!Array.isArray(item.dependencies)||item.dependencies.length!==kit.dependencies.length||!kit.dependencies.every(dependency=>item.dependencies.some(approved=>approved.file===dependency.file&&approved.sha256===dependency.sha256)))throw Error('Chapter environment dependency approval mismatch');
 return {files:[{file:kit.file,sha256:kit.sha256},...kit.dependencies],approvalRecord:'evidence/staged-bridge-20260916/chapter-form-approval.json'};
}
