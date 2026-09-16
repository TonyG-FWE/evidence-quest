/* In-memory microphone capture only. No network or storage APIs. */
class GardenRecorder extends AudioWorkletProcessor {
 constructor(){super();this.pending=new Float32Array(2048);this.length=0;this.recording=true;this.port.onmessage=e=>{if(e.data==='stop'){this.flush();this.recording=false;this.port.postMessage({done:true});}};}
 flush(){if(!this.length)return;const samples=this.pending.slice(0,this.length);this.port.postMessage({samples},[samples.buffer]);this.length=0;}
 process(inputs,outputs){for(const channel of outputs[0]??[])channel.fill(0);const input=inputs[0]?.[0];if(this.recording&&input){for(const sample of input){this.pending[this.length++]=sample;if(this.length===this.pending.length)this.flush();}}return this.recording;}
}
registerProcessor('garden-recorder',GardenRecorder);
