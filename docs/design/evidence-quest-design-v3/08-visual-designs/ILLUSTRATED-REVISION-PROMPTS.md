# Item 08 — Illustrated revision prompts

September 11, 2026. Exact prompts for the built-in image-generation edits following the user's request for white Jo and the rich quality of their attached cast/Stage images. These are generation records, not instructions that supersede Items 05–07. The original files returned by the tool remain in the generated_images directory; copied results are in this design directory. The first Stage pass is an intermediate, outside the current gallery/register.

Appearance and material quality come from the user's two supplied images, preserved in reference-inputs. Exact coordinates, source wording, exposure conditions, puzzle state and interaction controls remain authored separately. The current cast and room references are static flattened appearance references; they are not production asset layers or a runtime.

## 1. Jo replacement / current cast

Output: `V08-CAST-ILLUSTRATED.png`.

```text
Use case: precise-object-edit.
Edit target: the supplied Evidence Quest cast illustration.
Change only Jo, the girl third from the left when counting the small robot, wearing teal overalls and a coral T-shirt with her left palm open.
Redesign Jo as a white girl, age about 12, with fair skin, natural light peach/pink undertones, brown eyes, and dark-brown hair in the same two high buns. Preserve her happy expression, welcoming pose, proportions, clothing, shoes, position and size.
Keep the boy holding the backpack, Loop the robot, the red-haired boy with tablet, the girl with black bob, and both paper puppets unchanged. Preserve their skin tones, faces, clothing, silhouettes and all props.
Maintain exactly this high-quality illustrated treatment: expressive facial modeling, clean detailed contours, soft warm shading, fabric folds, carefully rendered paper texture, consistent contact shadows. Preserve the same warm ivory background, seven-character lineup, composition, landscape aspect ratio and full uncropped bodies.
Do not simplify into geometric/vector stick figures. No captions, extra characters, logos, or text. Output the complete edited cast sheet.
```

## 2. Stage illustrated first pass / superseded intermediate

Output: `V08-STAGE-ILLUSTRATED-CANDIDATE.png`.

```text
Use case: style-transfer / precise game-scene illustration.
Create the revised Stage scene for Evidence Quest at the high illustrated quality of input 1.
INPUT ROLES:
1: User's preferred Stage illustration: governing rendering quality, warm lighting, wood/paper texture, soft depth, attractive finished cartoon character modeling.
2: Revised cast sheet: governing exact character appearance. Jo is the WHITE girl with fair skin, dark brown hair in two high buns, teal overalls and coral shirt. Keep the player boy and robot unchanged from that sheet.
3: Simplified Stage plan: governing scene arrangement, object positions and character scale ONLY. Do not copy its simplistic drawing quality.

Produce one complete fixed-camera 2D game-room illustration, landscape 3:2. Match the craftsmanship and detail of input 1 throughout; no flat geometric stick-figure reduction.
Use the object bounds, positions and smaller world character sizes of input 3. Do not enlarge the physical characters to the height they had in input 1. In a 120-by-80 logical frame, player's feet at (20,50), about 12 units tall; Jo at (37,48), about 14 units tall; Loop at (76,35), about 7 units tall. Warm open walkable wooden floor fills the center and lower scene.
Keep paper miniature at left, folded note on miniature, pull tab below, crew board with CLOSED folded request and teal tablet near center, docked Loop at right-center, open left/right doorway arrows near lower sides, and rehearsal desk across bottom-right.
Protect the whole projection backdrop in top area from x38 to114, y2 to25. Both riverbanks must be fully visible. Depict initial story state: Pip is the distinctive CUT-PAPER puppet from input 2 in teal tunic, angular black paper hair, coral backpack; Grandma is the paper puppet from input 2 in coral cardigan and plum skirt. Pip left bank, seed loose nearby, Grandma right bank, broken footbridge stubs and TWO SEPARATE folded boats on river. Do not turn Pip into a duplicate of the physical player boy in yellow. Same paper figures and backpack in the miniature at left.
Bottom desk has ONE open teal caddy at left with FOUR story tiles and TWO distinct cream paper note tabs; blank pale rail to its right; the same yellow/coral/cream physical pads at right. No tiles on rail. No joined bridge, planted seed, flower or solved story at this initial setup.
Preserve clear exits and open floor; all furniture within input 3 bounds. Crisp material edges, warm directional sunlight, soft contact shadows, detailed faces/clothes, carefully layered paper texture. No UI dashboard. No source body text, dialogue, labels, new clues, extra people, extra robots, or text anywhere. This is the final rendered visual reference for the room, not a conceptual mood board.
```

## 3. Stage consistency correction / current Stage

Output: `V08-STAGE-ILLUSTRATED.png`.

```text
Use case: sketch-to-render.
Repaint INPUT 1, the simplified Evidence Quest Stage layout, into a finished high-quality illustrated game environment.
INPUT 1 controls every object's placement, scale, composition and the physical characters' feet positions. INPUT 2 supplies the rich illustrated lighting/material/face quality ONLY. INPUT 3 supplies the cast identity ONLY.
Crucial: keep INPUT 1's smaller in-world figures and its exact room arrangement; do not adopt INPUT 2's enlarged figures or shifted objects. Full 3:2 landscape room, same camera, complete uncropped room.
Render warm wood grain, softly rounded furniture edges, fabric folds, expressive modeled faces, subtle reflected light and contact shadows at the craftsmanship of INPUT 2. This must look like a finished illustrated game rather than simple vector shapes.
Jo is a WHITE girl with fair peach skin, brown eyes and dark brown hair in two high buns, coral T-shirt and teal overalls, as in INPUT 3. The player boy stays brown-skinned, curly-haired, yellow overshirt, teal shirt, blue trousers, coral shoes.
Both the large projection AND the small paper miniature at left must contain the SAME cut-paper Pip: teal tunic, angular black paper hair, navy trousers, coral backpack. Neither image contains a yellow-shirt copy of the real player. Grandma is the white-haired cut-paper puppet in coral cardigan and plum skirt.
Preserve initial story: Pip and loose dark seed on left, Grandma on right, two separate folded boats, broken bridge ends, no planted roots, no flower. Keep both banks visible.
Bottom-left portion of desk: open teal caddy with four individual tile faces (one boat, joined boats, hill, flower). TWO small cream folded note leaflets tucked into that same caddy behind its four tiles, not behind the rail. Rail to right completely empty. Right four colored desk controls unchanged. Loop docked and projecting; board request still folded.
Keep all furniture and all doors where INPUT 1 puts them. No added objects, people, source text or solved puzzle. Remove the diagram's lettering; later native labels will be typeset separately. High-quality detailed art throughout, no plain vector children.
```

## 4. Courtyard / current appearance reference

Output: `V08-COURTYARD-ILLUSTRATED.png`.

```text
Use case: sketch-to-render. Create a finished illustrated COURTYARD for the Evidence Quest game.
INPUT 1 is the Courtyard layout: preserve its fixed-camera composition, object arrangement, clear central walking floor, left and right exits and relative figure sizes. Its simple vector drawing is NOT the desired rendering style.
INPUT 2 is the finished Stage: use exactly this high-quality visual finish, with warm material texture, soft directional sunlight, modeled faces, fabric folds, curved detailed furniture and delicate shadows.
INPUT 3 is the cast reference: exact player boy and Remy identities.
Landscape 3:2 complete room. Repaint this open-air courtyard as a warm contemporary maker-festival deck with soft foliage/sky beyond its low back wall. At left: same working bench with folded coral paper boat and a CLOSED cream note, and suspended PAPER PETALS moved by a breeze above. Center-left: same teal tablet on its stand, blank screen. Right: same large teal noticeboard with a visibly CURLED cream notice, lower securing clip. The fold reveals exactly one word, CANCELED; no other notice text. Do not flatten the notice.
Remy wears plum hoodie and navy shorts with blue high-tops and has swept ginger hair, holding his small tablet. Place him where input 1 places him. Player remains the brown-skinned curly-haired boy in mustard overshirt, teal T-shirt, blue trousers, coral shoes; same position as input 1. No other characters, no Loop, no kit, no mystery props or new gates.
Keep the lower side exits open with clear simple direction arrows. Do not place plants or equipment on the walking route. Material detailing must enrich the existing objects without changing the layout. No UI overlays, no dialogue, no labels, no other text. Sophisticated clear 2D illustration matching input 2, never crude geometry or low-detail vector figures.
```

## 5. Workshop / current appearance reference

Output: `V08-WORKSHOP-ILLUSTRATED.png`.

```text
Use case: sketch-to-render. Create the finished illustrated WORKSHOP room for Evidence Quest.
Input 1 defines the exact scene arrangement, exits and prop silhouettes. Input 2 defines the required rich illustrated quality, warm wood/paper textures, sunlight, dimensional furniture, detailed characters and soft shadows. Input 3 defines the player boy's identity.
Use the complete fixed camera 3:2 landscape frame of input 1. Warm modern maker-festival room, clear wooden walking floor, shallow front-oblique camera. Keep the left paper/wood workbench with green cut-paper scenery and a closed cream note. Keep the tall venue-direction sign just right of that bench; its sign face has only simple arrow marks and empty label areas.
Keep a clearly OPEN passage to Media in the upper center of the room, at the position shown in input 1. Use a proper doorway-sized opening in that existing location, with no drawn occupants or view revealing what is inside. Keep the left exit to Stage and right exit to Courtyard, arrows visible at lower side boundaries.
Maximum Toast is the big covered maker contraption in its existing right-side bay: warm wood/teal housing, large closed lid, modest folded-in mechanical arms, one yellow physical start pad. It is playful handmade festival equipment, not futuristic machinery. Initial COVERED state: no toast, tray reveal, lowered magnifier, flames or broken parts. Do not add a repair puzzle.
Place only the brown-skinned curly-haired boy in mustard overshirt, teal shirt, blue trousers and coral sneakers near input 1's player position. No Jo, Remy, Ari or Loop in this room.
Render at the craftsmanship of input 2: subtly modeled surfaces, fabric creases, expressive face, fine wood grain, warm sun and contact shadows, tasteful background foliage only away from walkable floor. Maintain clear central through-route and all three open exits. No new obstacles, new source text, labels, dialogue or game UI. Do not turn this into a flat vector drawing.
```

## 6. Media / current appearance reference

Output: `V08-MEDIA-ILLUSTRATED.png`.

```text
Create a high quality illustrated final art direction reference for the Media room in Evidence Quest, a warm contemporary narrative mystery adventure for ages 9–12. EDIT image 1, the simple Media layout, into the rich finish of image 2, the illustrated Stage. Image 3 is the exact character identity reference. The first image is only a layout and object/state guide, NOT an acceptable final rendering style. Match image 2's lovingly painted wood grain, subtle paper fibers, expressive modeled faces, believable fabric folds, warm soft light, dimensional props, controlled contours and depth. No crude vector characters, flat geometric icon people, clip art or bland diagram look. Keep one fixed camera, full room, landscape 3:2.

Preserve the Media composition: a large PLAIN cream filming wall spans the upper back, with absolutely no shelves, decorations, posters, words or framed pictures on that plain filming wall. Below it on the left is a warm wooden filming table with exactly THREE separate coral paper petals on top and a single dark blue-green filming slate at its front, containing no readable letters, numbers or secret source contents. Ari stands left of center: match the cast's black chin-length bob, blue short-sleeved shirt with coral collar, yellow cargo trousers, cream sneakers and warm light-medium skin. Preserve her age, build, hair and outfit. Loop is a single friendly cream-and-teal one-eyed projector robot standing idle on the floor middle-right, with a dark navy lens, teal loop handle and two wheels. It is not damaged or plugged into a repair station. The player stands on the open lower-center floor: exactly the cast's brown curly-haired boy in mustard yellow overshirt, teal t-shirt, cobalt blue trousers and coral sneakers, without a backpack in this room.

On the right is a teal paper rack: TWO distinct mounted cream leaflets in its left half (unread, blank paper faces; do not generate source text). In the rack's right recess sits ONE CLOSED teal handled caddy, a clear portable box with a closed lid. No loose tiles visible and no additional caddies or copies elsewhere. Below the rack is ordinary wall/floor; no extra workstations or puzzle pieces.

Bottom center: a large clear south exit threshold bearing a simple dark down arrow, with ample unobstructed walking space leading to it. Retain clear open foreground and the existing table/slate, rack and caddy positions. Only the boy, Ari and Loop are present, no Jo or Remy. Keep all source bodies concealed, no captions or UI text, no visible solution. No new cameras, computers, games, microphones, seating, tools or gadgets. Make the whole room feel tactile, polished and inviting through beautifully rendered existing objects and materials. Rich full-scene game art at the exact illustrated quality of the Stage and cast references.
```

