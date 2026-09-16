import {expect,type Page} from '@playwright/test';

/** Wait for a real persisted record as well as the UI's save acknowledgement.
 * The initial illustrated welcome can render before its first save transaction. */
export async function savedChapter(page:Page){
 await expect(page.locator('.g-save')).toHaveText('Saved in this browser');let payload:any;
 await expect.poll(async()=>{
  payload=await page.evaluate(async()=>new Promise<any>((resolve,reject)=>{
   const request=indexedDB.open('evidence-quest-garden-adventure-v1');request.onerror=()=>reject(request.error);
   request.onsuccess=()=>{const db=request.result;if(!db.objectStoreNames.contains('slots')){db.close();resolve(undefined);return;}
    const transaction=db.transaction('slots'),read=transaction.objectStore('slots').get('current');
    transaction.onerror=()=>{db.close();reject(transaction.error);};transaction.onabort=()=>{db.close();reject(transaction.error);};
    transaction.oncomplete=()=>{db.close();resolve(read.result?.payload);};
   };
  }));return !!payload;
 },{message:'Wait for the actual Garden chapter record',timeout:15000}).toBe(true);
 return payload;
}
