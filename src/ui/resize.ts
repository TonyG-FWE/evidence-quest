// Avoid resizing a watched descendant during ResizeObserver delivery. Normal
// state paints still run in layout effects before the browser paints.
export function observeResize(elements:Element[],measure:()=>void){
 let frame:number|null=null;
 const schedule=()=>{if(frame===null)frame=requestAnimationFrame(()=>{frame=null;measure();});};
 const observer=new ResizeObserver(schedule);for(const element of elements)observer.observe(element);
 return {schedule,disconnect:()=>{observer.disconnect();if(frame!==null)cancelAnimationFrame(frame);frame=null;}};
}
