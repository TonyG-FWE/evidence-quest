import {useId,type ReactNode} from 'react';
import type {Chapter} from './model.js';
import {observationPictureFor,type Observation,type ObservationPictureSpec} from './journal.js';

type Person='pip'|'grandma'|'mara'|'sol'|'rina'|'boy'|'passenger';
const ink='#765f49',cream='#fff5db',gold='#dbb25a';
const coats:Record<Person,string>={pip:'#d97555',grandma:'#3d7460',mara:'#3d5f75',sol:'#9b754e',rina:'#a57389',boy:'#7fa384',passenger:'#b99561'};

/** Small notebook sketches borrow the live chapter's costume colors and props.
 * They are static SVG illustrations, not replacement character assets or new
 * WebGL scenes; factual captions remain the reading and accessibility authority. */
function PersonSketch({who,x,y,scale=1,face=1,reach=false}:{who:Person;x:number;y:number;scale?:number;face?:1|-1;reach?:boolean}){
 const skin=who==='mara'?'#b57e59':who==='grandma'?'#e5ad82':'#efbd91',hair=who==='grandma'?'#e8e2d3':who==='mara'?'#493529':'#70492f';
 return <g transform={`translate(${x} ${y}) scale(${scale*face} ${scale})`} data-picture-person={who}>
  <ellipse cx="0" cy="2" rx="20" ry="5" fill="#657351" opacity=".15" stroke="none"/>
  {who==='pip'&&<rect x="-23" y="-49" width="15" height="29" rx="5" fill="#dca948"/>}
  <path d="M-10-23-12-3m23-20L13-3" stroke="#554d40" strokeWidth="9"/>
  <path d="M-19-3h13m13 0h14" stroke="#685141" strokeWidth="6"/>
  <path d={who==='grandma'?'M-13-56 13-56 23-16-23-16Z':'M-14-56 14-56 18-22-18-22Z'} fill={coats[who]}/>
  {who==='sol'&&<path d="M-10-49h20v29h-20zm0-7v11m20-11v11" fill="#5e7a6c"/>}
  {(who==='grandma'||who==='rina')&&<path d="M-10-44h20l4 25h-28Z" fill={cream}/>}
  <path d={reach?'M-13-50-23-32m36-18 21 6':'M-13-50-19-28m32-22 9 23'} stroke={coats[who]} strokeWidth="9"/>
  <circle cx={reach?35:22} cy={reach?-43:-26} r="4.7" fill={skin}/><circle cx={reach?-23:-19} cy={reach?-30:-26} r="4.7" fill={skin}/>
  <circle cx="0" cy="-69" r="17" fill={skin}/><path d="M-17-71q-3-19 17-18 19 1 17 18L8-80q-13 9-25 9" fill={hair}/>
  <path d="M-5-60q5 4 10 0" fill="none" strokeWidth="1.5"/><circle cx="-6" cy="-70" r="1.6" fill={ink}/><circle cx="7" cy="-70" r="1.6" fill={ink}/>
  {who==='grandma'&&<><circle cx="-1" cy="-93" r="8" fill={hair}/><circle cx="-6" cy="-70" r="5" fill="none" strokeWidth="1.3"/><circle cx="7" cy="-70" r="5" fill="none" strokeWidth="1.3"/><path d="M-1-71h3"/></>}
  {who==='mara'&&<><path d="M-18-88q18-15 36 0v7h-36Z" fill={cream}/><path d="M-18-82h39" stroke="#304f61" strokeWidth="5"/><path d="M-9-46h18m-18 7h18m-18 7h18" stroke={cream}/></>}
  {who==='rina'&&<path d="M-15-85v-9q-5-10 6-11 8-8 15 0 12-1 10 10v10Z" fill={cream}/>}
 </g>;
}
function Page({x,y,scale=1,blank=false}:{x:number;y:number;scale?:number;blank?:boolean}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M0 0h25l7 8v35H0Z" fill="#fffae8"/><path d="M25 0v8h7" fill="#eadbb9"/>{!blank&&<path d="M6 14h18M6 20h20M6 26h16M6 32h18" stroke="#aa9b7b" strokeWidth="1.5"/>}</g>;}
function Loaf({x,y,scale=1}:{x:number;y:number;scale?:number}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-24 1q-1-20 24-20t24 20q-1 8-24 8T-24 1" fill="#d7a45a"/><path d="m-12-10 5 5m4-9 6 6m5-5 5 5" stroke="#f8dfac" strokeWidth="3"/></g>;}
function Flower({x,y,scale=1}:{x:number;y:number;scale?:number}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M0 0v-62M0-12q-24-3-28-21 28 0 28 21M0-22q22-4 27-23-26 2-27 23" fill="#8dab75" stroke="#537b55" strokeWidth="3"/><path d="M0-57q-32-17-27-41 21 0 27 16 7-17 27-16 7 24-27 41Z" fill="#e3bd66"/><path d="M0-105q-23 18 0 45 22-26 0-45" fill="#f2d37e"/><ellipse cx="0" cy="-72" rx="11" ry="12" fill="#fff0b0" stroke="none"/></g>;}
function Bench({x=214,y=134,cushions=false}:{x?:number;y?:number;cushions?:boolean}){return <g transform={`translate(${x} ${y})`}><path d="M-58 7h116v12H-58Z" fill="#b68b59"/><path d="M-53-24h106v20H-53Z" fill="#cca471"/><path d="M-47-29v59m94-59v59" strokeWidth="6"/>{cushions&&<><path d="M-42-4q15-7 30 0v11h-30Z" fill="#e2bc64"/><path d="M3-4q16-7 32 0v11H3Z" fill="#e2bc64"/></>}</g>;}
function Ground({dock=false}:{dock?:boolean}){return dock?<><path d="M0 124q100-18 360 4v72H0Z" fill="#97c1bc" stroke="none"/><path d="M175 109h185v81H154Z" fill="#caaa78"/>{[127,146,165,184].map(y=><path key={y} d={`M175 ${y}h180`} stroke="#b29468"/>)}<path d="M19 166q23 7 45 0m23 15q26 7 44 0m-83-41q20 6 37 0" stroke="#d5e6d3" fill="none"/></>:<><path d="M0 136q62-35 124-16 123-43 236 7v73H0Z" fill="#ced8b1" stroke="none"/><ellipse cx="183" cy="173" rx="155" ry="18" fill="#b5c79b" stroke="none"/><path d="m25 155 7-8 4 11m285 8 6-11 5 9" stroke="#9bb080" fill="none"/></>;}
function Boat({x=89,y=145,scale=1}:{x?:number;y?:number;scale?:number}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-67-5H69L49 21q-52 17-98-1Z" fill="#587f91"/><path d="M-49-12q38-15 101 0v9H-49Z" fill="#c2b490"/><path d="M-32-37h67v25h-67Z" fill="#eee6c9"/><path d="M-40-38h83" strokeWidth="5"/><path d="M-23-31h17v12h-17Zm29 0h18v12H6Z" fill="#9dbbbb"/></g>;}
function Dock({final=false}:{final?:boolean}){return <><Ground dock/><Boat/><path d="M144 123 179 119 184 134 147 140Z" fill="#dcc18d"/><PersonSketch who="mara" x={265} y={161} scale={.93} face={-1} reach/><PersonSketch who="passenger" x={199} y={159} scale={.75}/>{final?<PersonSketch who="boy" x={325} y={173} scale={.61}/>:<PersonSketch who="pip" x={325} y={178} scale={.7}/>}<path d="M47 176q29 6 57 0M49 72h43m-28-7h37" fill="none" stroke="#a7b6a5"/></>;}
function Planting({grown=false}:{grown?:boolean}){return <><Ground/><ellipse cx="180" cy="165" rx="48" ry="14" fill="#ab8560"/><PersonSketch who="pip" x={99} y={168} scale={.85} reach/><PersonSketch who="grandma" x={265} y={169} scale={.95} face={-1} reach/>{grown?<Flower x={180} y={162} scale={.84}/>:<><ellipse cx="180" cy="157" rx="7" ry="10" transform="rotate(25 180 157)" fill={gold}/><path d="m153 170 14 2m22 2 12-2m-28 6 13 1" stroke="#846443"/></>}</>;}
function Roof(){return <><path d="M63 160V83h159v77Z" fill="#e7d5ad"/><path d="M43 84 143 31l100 53Z" fill="#be7d59"/><path d="m118 59 26-14 28 15-27 17Z" fill="#9eb195"/><path d="m73 87 139 0M79 115h124" stroke="#d5c099"/><rect x="84" y="116" width="35" height="44" fill="#9ba58b"/><rect x="166" y="108" width="29" height="30" fill="#efda8d"/><path d="M257 167 233 86m44 78-23-83m-12 28 20-5m-14 24 20-5m-13 24 20-5" stroke="#a98c64" strokeWidth="4"/><path d="m289 34-5 10m-16-7-5 10m37 7-5 10m-18 4-5 10m-20-57-5 10M26 79l-5 10m13-41-5 10" stroke="#91afad" strokeWidth="2.5"/></>;}
function Oven(){return <g transform="translate(87 137)"><path d="M-50 22V-37q50-57 100 0v59Z" fill="#c59572"/><path d="M-32 18v-42q32-33 64 0v42Z" fill="#675a47"/><path d="M-44 22h88" strokeWidth="7"/><path d="M-50-9h13m74 0h13M-31-52l8 11m44-11-8 11" stroke="#eed5af"/></g>;}
function Flour(){return <g transform="translate(165 153)"><path d="M-31 11q-7-35 4-49h38q16 20 9 49Z" fill="#ddcaa0"/><ellipse cx="-8" cy="-38" rx="22" ry="8" fill="#f8f0d7"/><path d="M-27-31q19 9 39 0M-15-15h19m-16 8H0" stroke="#b19a71"/><path d="M-70 10q-5-27 1-48l29 2q4 24 0 46Z" fill="#cdb78c"/><path d="M-70-35h28"/></g>;}
function Thanks(){return <><Ground/><path d="M229 131V69l50-24 50 24v62" fill="#ddd1b0"/><path d="M219 71 279 38l60 33" fill="none" stroke="#8f9475" strokeWidth="7"/><path d="M242 99h74m-63 2v31m53-31v31" stroke="#ac8359" strokeWidth="7"/><PersonSketch who="pip" x={47} y={178} scale={.66}/><PersonSketch who="rina" x={132} y={173} scale={.88} reach/><PersonSketch who="sol" x={236} y={173} scale={.92} face={-1} reach/><Loaf x={182} y={134} scale={.7}/></>;}
function Gathering({spec,speaker}:{spec:ObservationPictureSpec;speaker:'pip'|'mara'|'sol'|'grandma'}){
 const hasMara=spec.gathering!=='mara-absent';
 return <><Ground/><Bench x={210} y={139} cushions={speaker==='grandma'}/><Flower x={31} y={160} scale={.55}/><Flower x={327} y={160} scale={.55}/>
  <PersonSketch who="pip" x={87} y={181} scale={.67} reach={speaker==='pip'}/><PersonSketch who="grandma" x={164} y={157} scale={.79} reach={speaker==='grandma'}/><PersonSketch who="sol" x={248} y={165} scale={.85} face={-1} reach={speaker==='sol'}/>{hasMara&&<PersonSketch who="mara" x={296} y={186} scale={.84} face={-1} reach={speaker==='mara'}/>}
  {speaker==='pip'?<Page x={102} y={140} scale={.65}/>:speaker==='grandma'?<Page x={180} y={116} scale={.65}/>:speaker==='mara'?<Page x={259} y={143} scale={.65}/>:<><Page x={208} y={125} scale={.68}/><Page x={185} y={128} scale={.62} blank={spec.sol==='draft'}/>{spec.sol!=='draft'&&<g transform="translate(188 144) scale(.22)">{spec.sol==='bread'?<Loaf x={0} y={0}/>:spec.sol==='thanks'?<><path d="M-48 13-19 0m67 13L19 0" strokeWidth="10" stroke="#efbd91"/><Loaf x={0} y={0}/></>:<><Loaf x={-24} y={0} scale={.65}/><path d="M9 10 23 0m39 10L49 0" strokeWidth="7" stroke="#efbd91"/><Loaf x={36} y={0} scale={.55}/></>}</g>}</>}
 </>;
}
function EventScene({spec}:{spec:ObservationPictureSpec}):ReactNode{
 switch(spec.event){
 case 'dock-duty':return <Dock/>;
 case 'last-passengers':return <Dock final/>;
 case 'bridge-crossed':return <><Ground/><path d="M112 111q42-10 112 0l24 89H92Z" fill="#93beb7" stroke="none"/><path d="M24 142h303v17H24Z" fill="#ba986e"/>{Array.from({length:14},(_,i)=><path key={i} d={`M${39+i*20} 144v13`} stroke="#8e704f"/>)}<path d="M56 174v-49m251 49v-49M56 135l15 23m236-23-15 23" fill="none" stroke="#85664d" strokeWidth="5"/><path d="M58 130q121 25 247 0M177 141v17" fill="none" stroke="#dac692" strokeWidth="4"/><PersonSketch who="pip" x={285} y={141} scale={.89}/><path d="M120 180q30 9 65 0" stroke="#d9e6ce" fill="none"/></>;
 case 'seed-planted':return <Planting/>;
 case 'flower-grown':return <Planting grown/>;
 case 'mara-message-delivered':return <><Ground/><Bench/><PersonSketch who="pip" x={102} y={176} scale={.88} reach/><PersonSketch who="grandma" x={252} y={176} face={-1}/><path d="M129 45q-10 0-10 12v42q0 12 13 12h12l-7 15 31-15h60q13 0 13-12V57q0-12-13-12Z" fill={cream}/><path d="M139 66h80m-80 13h68m-68 13h77" stroke="#b19c77" strokeWidth="3"/></>;
 case 'bird-repaired':return <><Ground dock/><PersonSketch who="mara" x={108} y={175} reach/><PersonSketch who="boy" x={262} y={175} scale={.8} face={-1} reach/><path d="M184 139 137 102 178 109 204 86 213 116 247 102 222 146 188 148Z" fill="#e8ce88"/><path d="m178 109 10 39 25-32m-29 23 38 7" fill="none" stroke="#c0a26e"/><path d="m212 122 20-2 3 12-20 2Z" fill="#fff0c8"/><path d="M17 21h326v158H17Z" fill="none" stroke="#b39b75" strokeDasharray="5 7"/></>;
 case 'bakery-roof':return <><Ground/><Roof/><PersonSketch who="sol" x={267} y={147} scale={.82}/><path d="m279 179 19-14 19 9-6 14Z" fill="#c78a65"/><path d="m296 166 3 9-6 5 8 5" fill="none"/></>;
 case 'bakery-flour':return <><Ground/><path d="M29 61 172 24l150 37v12H29Z" fill="#c3916d"/><path d="M56 74v89m251-89v89" stroke="#d3ba8b" strokeWidth="8"/><Flour/><PersonSketch who="rina" x={253} y={171} face={-1} reach/><path d="M66 113h35m-26-9h22" stroke="#d1cba5"/></>;
 case 'bakery-unshaped':return <><Ground/><Oven/><PersonSketch who="rina" x={298} y={176} scale={.84} face={-1} reach/><path d="M149 159h114v12H149Z" fill="#b68a5e"/><path d="M161 153q-12-41 31-47 30-4 36 21l-1 26Z" fill="#b88049"/><path d="M196 153v-36q28 0 34 25v11Z" fill="#f0dab3"/><path d="m204 132 7 4m-8 6 13 3" stroke="#d0b284"/><path d="M160 174v10m91-10v10" strokeWidth="5"/></>;
 case 'bakery-bread':return <><Ground/><Oven/><PersonSketch who="pip" x={160} y={171} scale={.66}/><PersonSketch who="rina" x={304} y={165} scale={.93}/><path d="M170 155h122v12H170Z" fill="#b99062"/>{[191,229,267].map(x=><Loaf key={x} x={x} y={153} scale={.67}/>)}<path d="M180 168v16m103-16v16" strokeWidth="5"/></>;
 case 'bakery-thanks':return <Thanks/>;
 case 'guests-arrived':return <><Ground/><path d="M46 200q27-65 163-63l90 63" fill="#e6d7b4" stroke="none"/><Bench x={273} y={103}/><path d="M40 145V71q0-36 35-36t35 36v74" fill="none" stroke="#94a47e" strokeWidth="7"/><PersonSketch who="sol" x={158} y={166} scale={.94} reach/><Page x={177} y={122} scale={.68}/>{spec.gathering!=='mara-absent'&&<PersonSketch who="mara" x={82} y={179} scale={.94}/>}<PersonSketch who="pip" x={285} y={178} scale={.72} face={-1}/><Flower x={327} y={150} scale={.64}/></>;
 case 'mara-telling':return <Gathering spec={spec} speaker={spec.gathering==='mara-reading'?'mara':'pip'}/>;
 case 'sol-telling':return <Gathering spec={spec} speaker="sol"/>;
 case 'grandma-telling':return <Gathering spec={spec} speaker="grandma"/>;
 case 'cushions-returned':return <><Ground/><Bench x={224} y={132} cushions/><PersonSketch who="grandma" x={118} y={166} scale={1.04} reach/><path d="M146 117q19-7 35-1l3 20h-39Z" fill="#e3c172"/><path d="M41 174v-32h47v32Z" fill="#bb9366"/><path d="m41 142-3-26h47l3 26Z" fill="#d0ad78"/></>;
 case 'pip-memory':return <><Ground/><PersonSketch who="pip" x={87} y={179} scale={.93} reach/><Flower x={170} y={182} scale={.92}/><path d="M190 19h155v106H190Z" fill={cream} stroke="#c9ac6e" strokeWidth="3"/><g transform="translate(193 24) scale(.413 .48)">{spec.memory==='planting'?<Planting/>:<Gathering spec={spec} speaker={spec.gathering==='mara-reading'?'mara':'pip'}/>}</g><path d="M197 126q-15 16-27 8" fill="none" stroke="#c9ac6e" strokeDasharray="3 5"/></>;
 case 'grandma-copy-delivered':return <><Ground dock/><Boat x={84} y={141} scale={.88}/><PersonSketch who="pip" x={197} y={177} scale={.84} reach/><PersonSketch who="mara" x={299} y={176} face={-1} reach/><Page x={237} y={119} scale={.81}/></>;
 }
 const unreachable:never=spec.event;return unreachable;
}

export function ObservationPicture({chapter,observation}:{chapter:Chapter;observation:Observation}){
 const uid=useId(),spec=observationPictureFor(chapter,observation.id);if(!spec)return null;
 return <div className="g-observation-picture" data-observation-picture={spec.event} data-picture-gathering={spec.gathering} data-picture-sol={spec.sol} data-picture-memory={spec.memory??''}>
  <svg viewBox="0 0 360 200" role="img" aria-labelledby={uid+'-title '+uid+'-description'} focusable="false">
   <title id={uid+'-title'}>{observation.title}</title><desc id={uid+'-description'}>{observation.text}</desc>
   <rect width="360" height="200" rx="11" fill={observation.context==='mara-story'?'#eee3ca':'#f4ecd7'}/>
   <path d="M0 75q101-61 213-31t147 21V0H0Z" fill="#e2e7d4" stroke="none"/>
   <g stroke={ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><EventScene spec={spec}/></g>
  </svg>
 </div>;
}
