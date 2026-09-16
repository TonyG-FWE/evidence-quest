/** One owner drains reentrant commands in order before returning. */
export class SerializedQueue<T> {
 private queue:T[]=[]; private draining=false;
 constructor(private readonly apply:(item:T)=>void){}
 push(item:T){this.queue.push(item);if(this.draining)return;this.draining=true;try{while(this.queue.length)this.apply(this.queue.shift()!);}finally{this.draining=false;}}
}
