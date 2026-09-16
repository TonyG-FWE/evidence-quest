import type {GardenState,GardenStore} from './model.js';
import {bakeryInstruction,near,type BakeryStep} from './bakery.js';
import {Choices,Reply} from './Dialogue.js';
import {ReadingParagraph} from './Reading.js';
import {ReadingDetails} from './ReadingDetails.js';
import {captureFocus} from './focus.js';

/** Present-day dialogue follows actual materials/actions. These new connective
 * words do not replace Sol's manuscript or count as canonical source exposure. */
export function BakeryConversation({s,store}:{s:GardenState;store:GardenStore}){
 const c=s.chapter,b=c.bakery,step=(step:BakeryStep)=>store.send({type:'BAKERY_STEP',step});
 const goToRina=()=>{store.send({type:'CLOSE'});store.send({type:'GO',point:b.rina,target:'Rina at the bakery'});};
 const question=(id:string,title:string,reply:string)=><ReadingDetails id={'rina-'+id} s={s} store={store}><summary>{title}</summary><Reply who="Rina">{reply}</Reply></ReadingDetails>;
 if(b.stage==='arrival')return <>
  <Reply who="Pip">Are you making bread for the gathering?</Reply>
  <Reply who="Rina">These loaves are for people who ordered them earlier. They are counting on me to have their bread ready today. I can move the sacks, but I cannot bake with rainwater dripping onto my flour.</Reply>
  <Reply who="Sol">I found the cracked tile. There is an intact spare on Rina’s shelf. I’ll use the ladder and replace the damaged one. Pip, could you bring me the spare?</Reply>
  <Choices><button className="g-primary" onClick={()=>step('PERMISSION')}>I can bring the spare tile to Sol.</button><button className="g-alternative" onClick={()=>store.send({type:'CLOSE'})}>I’ll look around first.</button></Choices>
 </>;
 if(b.stage==='needed'||b.stage==='carried')return <>
  <Reply who="Rina">{b.stage==='needed'?'Yes. You may take the spare tile from that shelf. Bring it to Sol so he can replace the cracked one.':'You have the spare tile. Sol is waiting beside the ladder. I’ll keep these sacks away from the puddle.'}</Reply>
  <ReadingParagraph>{bakeryInstruction(s)}</ReadingParagraph>
  {question('moving-flour','Why not just move the flour?', 'Moving the sacks keeps them dry for now, but the roof will keep leaking until the cracked tile is replaced. We need a repair that lasts while I work.')}
 </>;
 if(['delivered','gap','misplaced'].includes(b.stage))return <>
  <Reply who="Sol">{b.stage==='delivered'?'Thank you. I’ll take out the cracked tile first. Then direct me to put the spare over the opening so the rain stays outside.':b.stage==='gap'?'The cracked tile is down here beside the ladder. The opening it left is still letting water in. Show me where the spare should go.':'The spare is beside the opening, so the rain can still get through. I can lift that same tile and move it. We do not need another one.'}</Reply>
  <Reply who="Rina">{b.stage==='misplaced'?'I can still see drops falling near the sacks. The opening needs to be covered before I can bring my flour back.':'I’ll watch from below. When the opening is covered, the drops should stop falling inside.'}</Reply>
  <ReadingParagraph>Return to the roof repair to choose and place the tile.</ReadingParagraph>
 </>;
 if(b.stage==='sealed')return <>
  <ReadingParagraph>The last drops fell into the puddle. Outside, rain still tapped on the roof. Rina looked up, then put a hand on one of the flour sacks.</ReadingParagraph>
  <Reply who="Rina">The roof is keeping the water out now. Before we make dough, I need to check whether the flour stayed dry. Will you check it with me?</Reply>
  <Reply who="Pip">The repair stopped the leak. It didn’t stop the rain.</Reply>
  <Choices label="What will Pip do next?"><button className="g-primary" onClick={()=>step('CHECK')}>Let Rina check the flour</button></Choices>
  {question('wet-flour','Why does the flour need to stay dry?', 'Rainwater can carry dirt through the roof. I cannot use flour that got wet that way. Once we know this flour stayed dry, we can measure it and add clean water for the dough.')}
 </>;
 if(b.stage==='checked')return <>
  <ReadingParagraph>{b.unshapedBatches?'Rina set the unevenly baked lump aside. The middle was still doughy. She opened another dry sack and brought a clean bowl to the counter.':'Rina opened the sacks. The flour was dry. Sol packed his tools and returned to his workshop, leaving Pip beside the mixing bowl.'}</ReadingParagraph>
  <Reply who="Rina">{b.unshapedBatches?'That lump was too large to bake evenly. We still have dry flour for a new batch. This time, we can divide and shape the dough before it goes into the oven.':'The flour is dry! Sol’s repair means I can keep my promise. First we’ll mix the dough. Then we’ll divide and shape it into similar-sized loaves so they bake evenly.'}</Reply>
  <Reply who="Pip">I can help you get the bread ready.</Reply>
  <Choices label="Ready to make the dough?">{near(c.pip,b.rina,1.65)?<button className="g-primary" onClick={()=>step('MIX')}>Make the dough with Rina</button>:<button className="g-primary" onClick={goToRina}>Go to Rina</button>}</Choices>
  {question('dough','What turns flour into dough?', 'We measure flour, clean water, yeast and a little salt, then mix and knead them. Kneading means pressing and folding the dough until it holds together and feels stretchy.')}
 </>;
 if(b.stage==='mixed')return <>
  <ReadingParagraph>Rina measured the ingredients. Pip helped mix them, and Rina pressed and folded the dough. After it had rested and risen, one large lump filled the bowl.</ReadingParagraph>
  <Reply who="Rina">The dough is ready to shape. Similar-sized loaves will bake evenly. A single large lump would take longer in the middle than our recipe allows.</Reply>
  <Choices label="How will Pip help prepare the bread?"><button className="g-primary" onClick={()=>step('SHAPE')}>Shape the loaves</button><button className="g-alternative" onClick={()=>step('BAKE_UNSHAPED')}>Try baking the whole lump</button></Choices>
  {question('evenly','Why do the loaves need to be similar sizes?', 'Small pieces and large pieces do not bake at the same speed. When the loaves are similar sizes, they can all be ready together.')}
 </>;
 if(b.stage==='shaped')return <>
  <ReadingParagraph>Pip helped divide the dough. Rina shaped the pieces into three loaves and arranged them with space between them.</ReadingParagraph>
  <Reply who="Rina">These are ready for the oven. I’ll handle the hot tray. While they bake, think about what the roof repair has made possible.</Reply>
  <Choices label="What will happen next?"><button className="g-primary" onClick={()=>step('BAKE')}>Bake the bread</button></Choices>
  {question('repair-mattered','What would have happened without the repair?', 'The leak would have threatened the flour while I worked. Keeping it dry lets me make the bread I promised. A small repair can make a big difference to someone else.')}
 </>;
 if(b.stage==='baked')return <>
  <ReadingParagraph>A little later, Rina lifted the golden loaves from the oven. She set them aside to cool, then chose one for Sol.</ReadingParagraph>
  <Reply who="Rina">There’s the bread I promised. I’d like Sol to have one loaf as a thank-you. He thinks fixing a tile was only a little job, but it made all this possible.</Reply>
  <Reply who="Pip">Let’s go and show him.</Reply>
  <Choices label="What will Pip do next?"><button className="g-primary" onClick={()=>step('TAKE_LOAF')}>Take a loaf to thank Sol</button></Choices>
  {question('orders','What about the people waiting for their bread?', 'Their bread stays here. This loaf is for Sol. I’ll come back to give the customers their orders, so I cannot stay at the garden gathering today.')}
 </>;
 if(b.stage==='escorting')return <><Reply who="Rina">I have Sol’s loaf. Walk with me along the path to his workshop. If you need to look at something, I’ll wait for you.</Reply><ReadingParagraph>Return to the game and walk with Rina. The loaf stays in her hands until she gives it to Sol.</ReadingParagraph></>;
 if(b.stage==='done')return <>
  <Reply who="Rina">Thank you for fixing the roof, Sol. The flour stayed dry, and I made the bread I promised. This loaf is for you.</Reply>
  <Reply who="Sol">For me? I only replaced one tile.</Reply>
  <Reply who="Pip">That tile kept the water out. We could make the bread because the flour stayed dry.</Reply>
  <Reply who="Rina">Exactly. I need to get back to my customers now. Pip, tell him what you saw.</Reply>
  <ReadingParagraph>Sol looked from the loaf to the page on his workbench. He had started writing about the repair, but his draft stopped before the baking and Rina’s visit.</ReadingParagraph>
  <Choices label="Continue the conversation at Sol’s workshop."><button className="g-primary" onClick={event=>{const focus=captureFocus(event.currentTarget);store.send({type:'CLOSE'});store.send({type:'TALK',who:'sol',focus});}}>Talk to Sol</button></Choices>
 </>;
 return <ReadingParagraph>{bakeryInstruction(s)}</ReadingParagraph>;
}
