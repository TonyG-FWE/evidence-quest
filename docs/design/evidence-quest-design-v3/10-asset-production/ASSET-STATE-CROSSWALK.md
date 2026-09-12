# Item 10 — Asset/state/access crosswalk

**Derived from [asset-manifest.json](asset-manifest.json), September 11, 2026. Edit the manifest, then regenerate this view.** This is coverage and written design reasoning, not an executed game walkthrough.

The manifest contains157 exact Item09 AssetUse bindings for96 reusable assets. This crosswalk covers107 existing Item05 scene/object/access IDs, all93 Item06 states plus3 technical states, and121 Item06 transitions. Additional native view owners and composition bindings are listed in the manifest; they do not add world entities.

## Reading the mappings

Each object row identifies its exact binding records. Their logical bounds, normalized anchors, origin, role, visibility conditions and physical authority are in the manifest. Shared asset reuse does not imply simultaneous drawing or shared gameplay state. Do not render every asset in a context set unconditionally.

All states retain the actual current room beneath a supporting interface when Item06 permits it. Home and invalid-save recovery can use the empty Stage backplate as a nonplayable backdrop, never an invented restored room. A contained background region such as MD.PLAIN.WALL or clipped furniture lip reuses existing pixels; it is not a second full image.

A state set is only a compact index of its eligible components. No separate asset is commissioned for each UI state. Existing Item06 actions/input/focus and Item07 words remain authoritative. Opening supporting controls suspends world input and settles/pauses active cues according to Item09.

## Shared component sets

These sets are generated from each state's assetIds, not independent editable inventories.

| Set | Eligible asset IDs |
|---|---|
| `SET.01` | `ASSET.ENV.ST.BACKPLATE`, `ASSET.UI.HOME` |
| `SET.02` | `ASSET.ACT.PLAYER`, `ASSET.FX.FOCUS`, `ASSET.UI.HOME` |
| `SET.03` | `ASSET.ACT.PLAYER`, `ASSET.FX.FOCUS`, `ASSET.UI.WORLD` |
| `SET.04` | `ASSET.UI.READER` |
| `SET.05` | `ASSET.PROP.DEVICE`, `ASSET.SOURCE.E2.CLIP`, `ASSET.UI.READER` |
| `SET.06` | `ASSET.SOURCE.E2.PHOTO`, `ASSET.UI.READER` |
| `SET.07` | `ASSET.PROP.CADDY.BODY`, `ASSET.PROP.CADDY.LID`, `ASSET.PROP.LEAFLET`, `ASSET.TILE.BLOOM`, `ASSET.TILE.BRIDGE`, `ASSET.TILE.FERRY`, `ASSET.TILE.PLANT`, `ASSET.UI.READER` |
| `SET.08` | `ASSET.UI.REASONING` |
| `SET.09` | `ASSET.ACT.ARI`, `ASSET.ACT.JO`, `ASSET.ACT.REMY`, `ASSET.UI.TALK` |
| `SET.10` | `ASSET.PROP.CADDY.BODY`, `ASSET.PROP.CADDY.LID`, `ASSET.PROP.LEAFLET`, `ASSET.TILE.BLOOM`, `ASSET.TILE.BRIDGE`, `ASSET.TILE.FERRY`, `ASSET.TILE.PLANT`, `ASSET.UI.KIT` |
| `SET.11` | `ASSET.FX.STORY_LIGHT`, `ASSET.PUP.BACKPACK`, `ASSET.PUP.BOAT`, `ASSET.PUP.BROKEN_BRIDGE`, `ASSET.PUP.FLOWER`, `ASSET.PUP.GRANDMA`, `ASSET.PUP.HILL`, `ASSET.PUP.JOIN`, `ASSET.PUP.LEFT_BANK`, `ASSET.PUP.PIP`, `ASSET.PUP.RIVER`, `ASSET.PUP.ROOTS`, `ASSET.PUP.SEED`, `ASSET.UI.PADS`, `ASSET.UI.RAIL`, `ASSET.UI.WORK` |
| `SET.12` | `ASSET.PROP.CADDY.BODY`, `ASSET.PROP.CADDY.LID`, `ASSET.PROP.LEAFLET`, `ASSET.TILE.BLOOM`, `ASSET.TILE.BRIDGE`, `ASSET.TILE.FERRY`, `ASSET.TILE.PLANT`, `ASSET.UI.WORK` |
| `SET.13` | `ASSET.UI.COACH` |
| `SET.14` | `ASSET.UI.SYSTEM` |
| `SET.15` | `ASSET.ENV.ST.BACKPLATE`, `ASSET.UI.SYSTEM` |
| `SET.16` | `ASSET.PROP.TOAST.ARM`, `ASSET.PROP.TOAST.BODY`, `ASSET.PROP.TOAST.GLASS`, `ASSET.PROP.TOAST.LID`, `ASSET.PROP.TOAST.PIECE`, `ASSET.PROP.TOAST.TRAY`, `ASSET.UI.TOAST` |
| `SET.17` | `ASSET.FX.STORY_LIGHT`, `ASSET.PUP.BACKPACK`, `ASSET.PUP.BOAT`, `ASSET.PUP.BROKEN_BRIDGE`, `ASSET.PUP.FLOWER`, `ASSET.PUP.GRANDMA`, `ASSET.PUP.HILL`, `ASSET.PUP.JOIN`, `ASSET.PUP.LEFT_BANK`, `ASSET.PUP.PIP`, `ASSET.PUP.RIVER`, `ASSET.PUP.ROOTS`, `ASSET.PUP.SEED`, `ASSET.UI.ENDING`, `ASSET.UI.PADS`, `ASSET.UI.RAIL` |
| `SET.18` | `ASSET.ENV.ST.BACKPLATE`, `ASSET.UI.TECH` |
| `SET.19` | `ASSET.UI.TECH` |

## Item05 scenes, objects, read-only elements and accesses

The shorthand ACC.EVIDENCE family expands to E1–E8; ST.RAIL expands to A–D; all four TILE IDs are explicit. Source access and possession remain separate from passage exposure.

| Existing identity | Exact binding IDs | Reused assets | Meaning |
|---|---|---|---|
| `ACC.COACH` | `BIND.ACC.COACH.base` | `ASSET.UI.COACH` | Native accessible access; no separate room sprite. |
| `ACC.COMPARE` | `BIND.ACC.COMPARE.base` | `ASSET.UI.REASONING` | Native accessible access; no separate room sprite. |
| `ACC.EVIDENCE.E1` | `BIND.ACC.EVIDENCE.E1.base` | `ASSET.UI.READER` | Native accessible access; no separate room sprite. |
| `ACC.EVIDENCE.E2` | `BIND.ACC.EVIDENCE.E2.base` | `ASSET.UI.READER` | Native accessible access; no separate room sprite. |
| `ACC.EVIDENCE.E3` | `BIND.ACC.EVIDENCE.E3.base` | `ASSET.UI.READER` | Native accessible access; no separate room sprite. |
| `ACC.EVIDENCE.E4` | `BIND.ACC.EVIDENCE.E4.base` | `ASSET.UI.READER` | Native accessible access; no separate room sprite. |
| `ACC.EVIDENCE.E5` | `BIND.ACC.EVIDENCE.E5.base` | `ASSET.UI.READER` | Native accessible access; no separate room sprite. |
| `ACC.EVIDENCE.E6` | `BIND.ACC.EVIDENCE.E6.base` | `ASSET.UI.READER` | Native accessible access; no separate room sprite. |
| `ACC.EVIDENCE.E7` | `BIND.ACC.EVIDENCE.E7.base` | `ASSET.UI.READER` | Native accessible access; no separate room sprite. |
| `ACC.EVIDENCE.E8` | `BIND.ACC.EVIDENCE.E8.base` | `ASSET.UI.READER` | Native accessible access; no separate room sprite. |
| `ACC.GOAL` | `BIND.ACC.GOAL.base` | `ASSET.UI.WORLD` | Native accessible access; no separate room sprite. |
| `ACC.KIT` | `BIND.ACC.KIT.base` | `ASSET.UI.KIT` | Native accessible access; no separate room sprite. |
| `ACC.OBJECTS` | `BIND.ACC.OBJECTS.base` | `ASSET.UI.WORLD` | Native accessible access; no separate room sprite. |
| `ACC.PLAN.SEARCH` | `BIND.ACC.PLAN.SEARCH.base` | `ASSET.UI.REASONING` | Native accessible access; no separate room sprite. |
| `ACC.PLAN.STORY` | `BIND.ACC.PLAN.STORY.base` | `ASSET.UI.REASONING` | Native accessible access; no separate room sprite. |
| `ACC.PRESENT` | `BIND.ACC.PRESENT.base` | `ASSET.UI.TALK` | Native accessible access; no separate room sprite. |
| `ACC.STORY.STATE` | `BIND.ACC.STORY.STATE.base` | `ASSET.UI.WORK` | Native accessible access; no separate room sprite. |
| `ACC.THEORY` | `BIND.ACC.THEORY.base` | `ASSET.UI.REASONING` | Native accessible access; no separate room sprite. |
| `ACC.TIMELINE` | `BIND.ACC.TIMELINE.base` | `ASSET.UI.REASONING` | Native accessible access; no separate room sprite. |
| `ACC.VENUE` | `BIND.ACC.VENUE.base` | `ASSET.UI.WORLD` | Native accessible access; no separate room sprite. |
| `ACT.ARI` | `BIND.ACT.ARI.base` | `ASSET.ACT.ARI` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ACT.JO` | `BIND.ACT.JO.base` | `ASSET.ACT.JO` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ACT.LOOP` | `BIND.ACT.LOOP.base` | `ASSET.ACT.LOOP` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ACT.PLAYER` | `BIND.ACT.PLAYER.base` | `ASSET.ACT.PLAYER` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ACT.REMY` | `BIND.ACT.REMY.base` | `ASSET.ACT.REMY` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.ACCESS.E2` | `BIND.CY.ACCESS.E2.base` | `ASSET.PROP.DEVICE` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.EXIT.ST` | `BIND.CY.EXIT.ST.base` | `ASSET.ENV.DOOR` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.EXIT.WK` | `BIND.CY.EXIT.WK.base` | `ASSET.ENV.DOOR` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.MODEL.BENCH` | `BIND.CY.MODEL.BENCH.base` | `ASSET.PROP.CY.BENCH` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.MODEL.BOAT` | `BIND.CY.MODEL.BOAT.base` | `ASSET.PUP.BOAT` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.NOTICE.BOARD` | `BIND.CY.NOTICE.BOARD.base` | `ASSET.PROP.CY.BOARD` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.PETALS` | `BIND.CY.PETALS.base` | `ASSET.PROP.PETAL` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.SOURCE.E3` | `BIND.CY.SOURCE.E3.base`, `BIND.CY.SOURCE.E3.clip` | `ASSET.PROP.NOTICE`, `ASSET.PROP.NOTICE.CLIP` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.SOURCE.E7` | `BIND.CY.SOURCE.E7.base` | `ASSET.PROP.LEAFLET` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `CY.TABLET.STAND` | `BIND.CY.TABLET.STAND.base` | `ASSET.PROP.CY.STAND` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `KIT.CADDY` | `BIND.KIT.CADDY.media`, `BIND.KIT.CADDY.carried`, `BIND.KIT.CADDY.seated`, `BIND.KIT.CADDY.lid` | `ASSET.PROP.CADDY.BODY`, `ASSET.PROP.CADDY.LID` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `KIT.NOTE.E6` | `BIND.KIT.NOTE.E6.pocket` | `ASSET.PROP.LEAFLET` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `KIT.NOTE.E7` | `BIND.KIT.NOTE.E7.pocket` | `ASSET.PROP.LEAFLET` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `LOOP.FOLLOW.PAD` | `BIND.LOOP.FOLLOW.PAD.base` | `ASSET.UI.PADS` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `MD.ACCESS.E8` | `BIND.MD.ACCESS.E8.recess` | `ASSET.UI.RACK` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `MD.EXIT.WK` | `BIND.MD.EXIT.WK.base` | `ASSET.ENV.DOOR` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `MD.PLAIN.WALL` | `BIND.MD.PLAIN.WALL.region` | `ASSET.ENV.MD.BACKPLATE` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `MD.RACK.STATION` | `BIND.MD.RACK.STATION.base` | `ASSET.PROP.MD.RACK` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `MD.RECORDING.TABLE` | `BIND.MD.RECORDING.TABLE.base`, `BIND.MD.RECORDING.TABLE.petals` | `ASSET.PROP.MD.TABLE`, `ASSET.PROP.PETAL` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `MD.SOURCE.E5` | `BIND.MD.SOURCE.E5.base` | `ASSET.PROP.SLATE` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `MD.SOURCE.E6` | `BIND.MD.SOURCE.E6.base` | `ASSET.PROP.LEAFLET` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `MD.SOURCE.E7` | `BIND.MD.SOURCE.E7.base` | `ASSET.PROP.LEAFLET` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `MODEL.BACKPACK` | `BIND.MODEL.BACKPACK.base` | `ASSET.PUP.BACKPACK` | Read-only paper display; separate MODEL/PUP instance state. |
| `MODEL.BROKEN_BRIDGE` | `BIND.MODEL.BROKEN_BRIDGE.base` | `ASSET.PUP.BROKEN_BRIDGE` | Read-only paper display; separate MODEL/PUP instance state. |
| `MODEL.GRANDMA` | `BIND.MODEL.GRANDMA.base` | `ASSET.PUP.GRANDMA` | Read-only paper display; separate MODEL/PUP instance state. |
| `MODEL.PIP` | `BIND.MODEL.PIP.base` | `ASSET.PUP.PIP` | Read-only paper display; separate MODEL/PUP instance state. |
| `MODEL.RIVER` | `BIND.MODEL.RIVER.base` | `ASSET.PUP.RIVER` | Read-only paper display; separate MODEL/PUP instance state. |
| `MODEL.SEED` | `BIND.MODEL.SEED.base` | `ASSET.PUP.SEED` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.BACKPACK` | `BIND.PUP.BACKPACK.base` | `ASSET.PUP.BACKPACK` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.BOATS` | `BIND.PUP.BOATS.base`, `BIND.PUP.BOATS.part1`, `BIND.PUP.BOATS.part2` | `ASSET.PUP.BOAT`, `ASSET.PUP.JOIN` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.BROKEN_BRIDGE` | `BIND.PUP.BROKEN_BRIDGE.base`, `BIND.PUP.BROKEN_BRIDGE.part1` | `ASSET.PUP.BROKEN_BRIDGE` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.FLOWER` | `BIND.PUP.FLOWER.base`, `BIND.PUP.FLOWER.part1` | `ASSET.PUP.FLOWER`, `ASSET.FX.STORY_LIGHT` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.GRANDMA` | `BIND.PUP.GRANDMA.base` | `ASSET.PUP.GRANDMA` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.HILL` | `BIND.PUP.HILL.base`, `BIND.PUP.HILL.part1` | `ASSET.PUP.HILL`, `ASSET.PUP.ROOTS` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.LEFT_BANK` | `BIND.PUP.LEFT_BANK.base` | `ASSET.PUP.LEFT_BANK` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.PIP` | `BIND.PUP.PIP.base` | `ASSET.PUP.PIP` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.RIVER` | `BIND.PUP.RIVER.base` | `ASSET.PUP.RIVER` | Read-only paper display; separate MODEL/PUP instance state. |
| `PUP.SEED` | `BIND.PUP.SEED.base` | `ASSET.PUP.SEED` | Read-only paper display; separate MODEL/PUP instance state. |
| `SC.CY` | `BIND.SC.CY.base` | `ASSET.ENV.CY.BACKPLATE` | Scene root: combine matching room and current shared-owner bindings. |
| `SC.MD` | `BIND.SC.MD.base` | `ASSET.ENV.MD.BACKPLATE` | Scene root: combine matching room and current shared-owner bindings. |
| `SC.ST` | `BIND.SC.ST.base` | `ASSET.ENV.ST.BACKPLATE` | Scene root: combine matching room and current shared-owner bindings. |
| `SC.WK` | `BIND.SC.WK.base` | `ASSET.ENV.WK.BACKPLATE` | Scene root: combine matching room and current shared-owner bindings. |
| `ST.ACCESS.E2` | `BIND.ST.ACCESS.E2.base` | `ASSET.PROP.DEVICE` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.BOARD` | `BIND.ST.BOARD.base` | `ASSET.PROP.ST.BOARD` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.CONSOLE` | `BIND.ST.CONSOLE.base` | `ASSET.PROP.ST.CONSOLE` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.CONTROL.CLEAR` | `BIND.ST.CONTROL.CLEAR.base` | `ASSET.UI.PADS` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.CONTROL.REHEARSE` | `BIND.ST.CONTROL.REHEARSE.base` | `ASSET.UI.PADS` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.CONTROL.RESET` | `BIND.ST.CONTROL.RESET.base` | `ASSET.UI.PADS` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.CONTROL.SHOW` | `BIND.ST.CONTROL.SHOW.base` | `ASSET.UI.PADS` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.CONTROL.STOP` | `BIND.ST.CONTROL.STOP.base` | `ASSET.UI.PADS` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.DOCK` | `BIND.ST.DOCK.base` | `ASSET.PROP.ST.DOCK.BODY` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.DOCK.FLAP` | `BIND.ST.DOCK.FLAP.base` | `ASSET.PROP.DOCK.FLAP` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.DOCK.PAD` | `BIND.ST.DOCK.PAD.base` | `ASSET.UI.PADS` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.EXIT.CY` | `BIND.ST.EXIT.CY.base` | `ASSET.ENV.DOOR` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.EXIT.WK` | `BIND.ST.EXIT.WK.base` | `ASSET.ENV.DOOR` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.MODEL` | `BIND.ST.MODEL.base`, `BIND.ST.MODEL.left-bank`, `BIND.ST.MODEL.hill` | `ASSET.PROP.ST.MODEL.CABINET`, `ASSET.PUP.LEFT_BANK`, `ASSET.PUP.HILL` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.MODEL.TAB` | `BIND.ST.MODEL.TAB.base` | `ASSET.PROP.MODEL.TAB` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.PROJECTION` | `BIND.ST.PROJECTION.composite` | `ASSET.UI.WORK` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.RACK.BAY` | `BIND.ST.RACK.BAY.base` | `ASSET.UI.RACK` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.RAIL` | `BIND.ST.RAIL.base` | `ASSET.UI.RAIL` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.RAIL.A` | `BIND.ST.RAIL.A.slot` | `ASSET.UI.RAIL` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.RAIL.B` | `BIND.ST.RAIL.B.slot` | `ASSET.UI.RAIL` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.RAIL.C` | `BIND.ST.RAIL.C.slot` | `ASSET.UI.RAIL` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.RAIL.D` | `BIND.ST.RAIL.D.slot` | `ASSET.UI.RAIL` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.SOURCE.E1` | `BIND.ST.SOURCE.E1.base` | `ASSET.PROP.BRIEF.FLAP` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.SOURCE.E4` | `BIND.ST.SOURCE.E4.base` | `ASSET.PROP.REQUEST` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `ST.SOURCE.E6` | `BIND.ST.SOURCE.E6.base` | `ASSET.PROP.NOTE.DRAWER` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `TILE.BLOOM` | `BIND.TILE.BLOOM.rack`, `BIND.TILE.BLOOM.rail` | `ASSET.TILE.BLOOM` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `TILE.BRIDGE` | `BIND.TILE.BRIDGE.rack`, `BIND.TILE.BRIDGE.rail` | `ASSET.TILE.BRIDGE` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `TILE.FERRY` | `BIND.TILE.FERRY.rack`, `BIND.TILE.FERRY.rail` | `ASSET.TILE.FERRY` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `TILE.PLANT` | `BIND.TILE.PLANT.rack`, `BIND.TILE.PLANT.rail` | `ASSET.TILE.PLANT` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.ACCESS.NAV` | `BIND.WK.ACCESS.NAV.base` | `ASSET.PROP.WK.SIGN` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.BENCH` | `BIND.WK.BENCH.base` | `ASSET.PROP.WK.BENCH` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.EXIT.CY` | `BIND.WK.EXIT.CY.base` | `ASSET.ENV.DOOR` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.EXIT.MD` | `BIND.WK.EXIT.MD.base` | `ASSET.ENV.DOOR` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.EXIT.ST` | `BIND.WK.EXIT.ST.base` | `ASSET.ENV.DOOR` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.SCENERY` | `BIND.WK.SCENERY.base` | `ASSET.PROP.PETAL` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.TOAST` | `BIND.WK.TOAST.base`, `BIND.WK.TOAST.lid`, `BIND.WK.TOAST.left-arm`, `BIND.WK.TOAST.right-arm`, `BIND.WK.TOAST.tray`, `BIND.WK.TOAST.toast` | `ASSET.PROP.TOAST.BODY`, `ASSET.PROP.TOAST.LID`, `ASSET.PROP.TOAST.ARM`, `ASSET.PROP.TOAST.TRAY`, `ASSET.PROP.TOAST.PIECE` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.TOAST.MAGNIFIER` | `BIND.WK.TOAST.MAGNIFIER.glass` | `ASSET.PROP.TOAST.GLASS` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.TOAST.SKIP` | `BIND.WK.TOAST.SKIP.base` | `ASSET.UI.TOAST` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.TOAST.START` | `BIND.WK.TOAST.START.start` | `ASSET.UI.PADS` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |
| `WK.WAYFINDING` | `BIND.WK.WAYFINDING.base` | `ASSET.PROP.WK.SIGN` | Exact Item05 V/C/H/A and current ownership; shared art does not merge source or physical identities. |

## All interface states

The functional references show layout/state intent. Their simplified drawing is not the production aesthetic; current cast and room paintings still govern finish.

| State | Component set | Functional reference | State-specific boundary |
|---|---|---|---|
| `UI.HOME.CHECKING` | `SET.01` | [V08-HOME-EMPTY](../08-visual-designs/V08-HOME-EMPTY.png) | Remove Start/Continue and saved room. Put Checking saved progress… in their position; retain Settings. No animated indefinite spinner. |
| `UI.HOME.EMPTY` | `SET.01` | [V08-HOME-EMPTY](../08-visual-designs/V08-HOME-EMPTY.png) | Confirmed no run. |
| `UI.HOME.SAVED` | `SET.01` | [V08-HOME-SAVED](../08-visual-designs/V08-HOME-SAVED.png) | Current session wins over older durable record. |
| `UI.GUIDE.OPENING` | `SET.02` | [V08-OPENING](../08-visual-designs/V08-OPENING.png) | Only relevant stage suggestion; exits always usable. |
| `UI.WORLD.IDLE` | `SET.03` | [V08-OPENING](../08-visual-designs/V08-OPENING.png) | No new status merely from idling. |
| `UI.WORLD.MOVING` | `SET.03` | [V08-OPENING](../08-visual-designs/V08-OPENING.png) | Solid destination bracket stays at chosen object, dotted route lies on legal floor, walking avatar and Stop walking replace idle caption. New target moves the bracket. |
| `UI.WORLD.OPERATING` | `SET.03` | [V08-OPENING](../08-visual-designs/V08-OPENING.png) | Source body only at its readable commit. |
| `UI.WORLD.CHOOSER` | `SET.03` | [V08-CHOOSER](../08-visual-designs/V08-CHOOSER.png) | Border of ST.BOARD offers request and post, no silent choice. |
| `UI.WORLD.BLOCKED` | `SET.03` | [V08-OPENING](../08-visual-designs/V08-OPENING.png) | Use ink text on the cream caption strip with a small outlined stop symbol; retain selected position and all exits. No red screen shake. |
| `UI.GOAL` | `SET.03` | [V08-OPENING](../08-visual-designs/V08-OPENING.png) | Use the P.SHEET surface over the current stopped room: original assignment first, current objective, optional selected question, Latest action, Return. Reopen never replays the intro. |
| `UI.NAV.OBJECTS` | `SET.03` | [V08-COMPACT-NAV](../08-visual-designs/V08-COMPACT-NAV.png) | No PUP movement or remote occupant leak. |
| `UI.NAV.MAP` | `SET.03` | [V08-NAV](../08-visual-designs/V08-NAV.png) | Public description distinct from current room description. |
| `UI.NOTES.EMPTY` | `SET.04` | [V08-NOTES-EMPTY](../08-visual-designs/V08-NOTES-EMPTY.png) | No hidden clue title placeholders. |
| `UI.NOTES.LIST` | `SET.04` | [V08-NOTES](../08-visual-designs/V08-NOTES.png) | No spoiler summaries or whole E5 unlocked from slate. |
| `UI.SOURCE.TEXT` | `SET.04` | [V08-READ-E7](../08-visual-designs/V08-READ-E7.png) | Legitimate available body; exposure of actual displayed spans. |
| `UI.SOURCE.POST` | `SET.05` | [V08-E2-FIRST](../08-visual-designs/V08-E2-FIRST.png) | Reopening retains actual last component; no full description at initial landing. |
| `UI.SOURCE.CLIP` | `SET.05` | [V08-E2-END](../08-visual-designs/V08-E2-END.png) | Full CT.SRC.E2.A only after Describe recording. |
| `UI.SOURCE.PHOTO` | `SET.06` | [V08-E2-PHOTO](../08-visual-designs/V08-E2-PHOTO.png) | Never full E3 or physical Flatten. |
| `UI.SOURCE.ZOOM` | `SET.04` | [V08-COMPACT-SOURCE-FULL](../08-visual-designs/V08-COMPACT-SOURCE-FULL.png) | Intentional reuse; no new source text from enlargement. |
| `UI.SOURCE.WORD` | `SET.04` | [V08-WORD](../08-visual-designs/V08-WORD.png) | Exactly five vocabulary bindings. |
| `UI.SOURCE.PICK` | `SET.04` | [V08-PICK](../08-visual-designs/V08-PICK.png) | Empty uses CT.SOURCE.NO_AVAILABLE; NAV.MEDIA selectable after public description display. |
| `UI.SOURCE.TILE` | `SET.07` | [V08-TILE-INSPECT](../08-visual-designs/V08-TILE-INSPECT.png) | No puppet solution demo. |
| `UI.COMPARE.EMPTY` | `SET.08` | [V08-COMPARE](../08-visual-designs/V08-COMPARE.png) | Use both same-size source regions from V08-COMPARE, each labeled First/Second detail plus Add detail; no example text. Keep optional blank My idea and Save idea. |
| `UI.COMPARE.PARTIAL` | `SET.08` | [V08-COMPARE](../08-visual-designs/V08-COMPARE.png) | Only the selected region gets actual text and Change/Remove. Other region stays Add detail; no suggested source or relation. |
| `UI.COMPARE.READY` | `SET.08` | [V08-COMPARE](../08-visual-designs/V08-COMPARE.png) | Both selected details use equal paper surfaces. The player-selected relationship gets a gold fill and textual selection indication, not a verdict. Optional My idea field can extend the scroll body. |
| `UI.TIMELINE.EMPTY` | `SET.08` | [V08-TIMELINE](../08-visual-designs/V08-TIMELINE.png) | Remove every sample time and source row. Show Times from your discoveries will appear here. Keep Event times / Discovery order. |
| `UI.TIMELINE.KNOWN` | `SET.08` | [V08-TIMELINE](../08-visual-designs/V08-TIMELINE.png) | Intentions distinct from completed events. |
| `UI.IDEA.DRAFT` | `SET.08` | [V08-PLAN-PRIVATE](../08-visual-designs/V08-PLAN-PRIVATE.png) | Never auto-focus or fill answer. |
| `UI.IDEA.RECORDED` | `SET.08` | [V08-PLAN-RECORDED](../08-visual-designs/V08-PLAN-RECORDED.png) | Save status separately acknowledged. |
| `UI.LEAD` | `SET.08` | [V08-LEAD](../08-visual-designs/V08-LEAD.png) | Authored questions, not asserted facts; Go separate. |
| `UI.PLAN.PRIVATE` | `SET.08` | [V08-PLAN-PRIVATE](../08-visual-designs/V08-PLAN-PRIVATE.png) | Private, no Jo knowledge. |
| `UI.PLAN.RECORDED` | `SET.08` | [V08-PLAN-RECORDED](../08-visual-designs/V08-PLAN-RECORDED.png) | Recorded crew tool does not manufacture NPC reply. |
| `UI.PLAN.ADDRESSED` | `SET.08` | [V08-PLAN-DELIVERED](../08-visual-designs/V08-PLAN-DELIVERED.png) | Before delivery use You’re showing Jo: plus exact draft/details and Show Jo or Go to Jo’s room. V08-PLAN-DELIVERED is the resulting state; it must not appear before commit. |
| `UI.TALK.TOPICS` | `SET.09` | [V08-TALK](../08-visual-designs/V08-TALK.png) | Same lower speaker band, with greeting and actual eligible topic controls instead of the correction line. No typing is required. |
| `UI.TALK.REPLY` | `SET.09` | [V08-TALK](../08-visual-designs/V08-TALK.png) | Knowledge matrix/fallback; no automatic model request. |
| `UI.PRESENT.SELECT` | `SET.09` | [V08-PRESENT](../08-visual-designs/V08-PRESENT.png) | Same P.PLAN column with acquired-detail picker and Here / People you’ve met elsewhere groups. No hidden recipient or reply. |
| `UI.PRESENT.REVIEW` | `SET.09` | [V08-PRESENT](../08-visual-designs/V08-PRESENT.png) | Remote travel only; no offscreen reply. |
| `UI.PRESENT.APPROACH` | `SET.09` | [V08-PRESENT](../08-visual-designs/V08-PRESENT.png) | Close the sheet to the world. The named Going to show… caption and Cancel accompany physical travel. Only arrival and delivery open the reply band. |
| `UI.KIT.CLOSED` | `SET.10` | [V08-KIT-OWNERS](../08-visual-designs/V08-KIT-OWNERS.png) | Both actions available without reading. |
| `UI.KIT.OPEN` | `SET.10` | [V08-KIT](../08-visual-designs/V08-KIT.png) | Bodies only on deliberate inspection. |
| `UI.KIT.CARRIED` | `SET.10` | [V08-KIT](../08-visual-designs/V08-KIT.png) | Only local Stage handoff, no remote rail. |
| `UI.KIT.HANDOFF` | `SET.10` | [V08-KIT-OWNERS](../08-visual-designs/V08-KIT-OWNERS.png) | No doorway auto-seat; cancel uses actual owner. |
| `UI.KIT.SEATED` | `SET.10` | [V08-KIT-OWNERS](../08-visual-designs/V08-KIT-OWNERS.png) | Elsewhere CT.KIT.AT_STAGE + travel/acquired sources. |
| `UI.KIT.VACANT` | `SET.10` | [V08-KIT-OWNERS](../08-visual-designs/V08-KIT-OWNERS.png) | Fixed Media notes stay accessible. |
| `UI.WORK.NEEDS_KIT` | `SET.11` | [V08-RESOURCES](../08-visual-designs/V08-RESOURCES.png) | Preview or Launch follows docking, no source gate. |
| `UI.WORK.NEEDS_LOOP` | `SET.11` | [V08-RESOURCES](../08-visual-designs/V08-RESOURCES.png) | Missing projection does not forbid planning. |
| `UI.WORK.EMPTY` | `SET.11` | [V08-WORK-EMPTY](../08-visual-designs/V08-WORK-EMPTY.png) | Before an attempted Rehearse show CT.RAIL.HELP; after that attempt the pictured CT.WORK.EMPTY is shown. No four numbered answer blanks. |
| `UI.WORK.READY` | `SET.11` | [V08-WORK-CHANGED](../08-visual-designs/V08-WORK-CHANGED.png) | Use Ready to rehearse. Only an actual edit appends the changed-version message shown in the reference. Keep current rail and rack ownership synchronized. |
| `UI.WORK.CERTIFIED` | `SET.11` | [V08-WORK-SUCCESS](../08-visual-designs/V08-WORK-SUCCESS.png) | Only full current successful rehearsal. |
| `UI.WORK.SHOW_CHECK` | `SET.11` | [V08-WORK-HISTORY](../08-visual-designs/V08-WORK-HISTORY.png) | Same Show pad; no comprehension/AI requirement. |
| `UI.WORK.MORE` | `SET.11` | [V08-WORK-MORE](../08-visual-designs/V08-WORK-MORE.png) | Opening pauses, choosing actual reset clears eligibility, cancel does not. |
| `UI.RAIL.SELECTED` | `SET.12` | [V08-RAIL-ACTIONS](../08-visual-designs/V08-RAIL-ACTIONS.png) | Only valid actions for current owner. |
| `UI.RAIL.DESTINATIONS` | `SET.12` | [V08-RAIL-ACTIONS](../08-visual-designs/V08-RAIL-ACTIONS.png) | Result uses exact operation caption, not generic success. |
| `UI.RUN.STARTING` | `SET.11` | [V08-WORK-EMPTY](../08-visual-designs/V08-WORK-EMPTY.png) | Same Watch composition, nonempty actual order, initial puppets and mode heading; Stop remains available. Do not use the EMPTY error from the shared geometry reference. |
| `UI.RUN.REHEARSAL` | `SET.11` | [V08-WORK-SEED](../08-visual-designs/V08-WORK-SEED.png) | Successful/no-op cues continue normally. |
| `UI.RUN.SHOW` | `SET.11` | [V08-STORYBOARD-PREMIERE](../08-visual-designs/V08-STORYBOARD-PREMIERE.png) | Full successful finalization required before ending. |
| `UI.RUN.UNMET` | `SET.11` | [V08-WORK-UNMET](../08-visual-designs/V08-WORK-UNMET.png) | No automatic hint or lost tile. |
| `UI.RUN.PAUSED` | `SET.11` | [V08-WORK-PAUSED](../08-visual-designs/V08-WORK-PAUSED.png) | Next unfinished tile only; state already settled. |
| `UI.RUN.TERMINAL` | `SET.11` | [V08-WORK-PAUSED](../08-visual-designs/V08-WORK-PAUSED.png) | Use the same paused Watch band but replace Next tile with mode paused after its last cue. Primary is Continue to finish rehearsal/premiere. No cue replay or early celebration. |
| `UI.RUN.FAILED` | `SET.11` | [V08-WORK-UNMET](../08-visual-designs/V08-WORK-UNMET.png) | Replace paused/Continue labels with Rehearsal finished. Preserve the actual last puppet state and rail. Rehearse, Arrange, Notes, Help and Return remain. No grade. |
| `UI.STORY.DESCRIBE` | `SET.11` | [V08-COMPACT-WATCH](../08-visual-designs/V08-COMPACT-WATCH.png) | Use a P.READER source-like sheet after settling playback. Heading Story now, then banks, Pip/backpack, Grandma, seed, boats, roots/light using one applicable CT.STORY fragment each. Keep Enlarge the whole story and Back. No draggable objects. |
| `UI.COACH.ENTRY` | `SET.13` | [V08-HELP-ENTRY](../08-visual-designs/V08-HELP-ENTRY.png) | Opening not sending; optional text. |
| `UI.COACH.TOPIC` | `SET.13` | [V08-HELP-CLARIFY](../08-visual-designs/V08-HELP-CLARIFY.png) | Replace the three clarification subjects with only known lead questions and Your story plan. Blank text is valid. No hidden clue topic. |
| `UI.COACH.PENDING` | `SET.13` | [V08-HELP-WAITING](../08-visual-designs/V08-HELP-WAITING.png) | Same waiting region with Getting help… before the two-second target. Keep submitted snapshot separate from any later editable draft. |
| `UI.COACH.WAITING` | `SET.13` | [V08-HELP-WAITING](../08-visual-designs/V08-HELP-WAITING.png) | Two-second design target, nonblocking. |
| `UI.COACH.FALLBACK_OFFER` | `SET.13` | [V08-HELP-FALLBACK](../08-visual-designs/V08-HELP-FALLBACK.png) | Closed offers only AVAILABLE; live arrival adds VIEW_NEW, not button replacement. |
| `UI.COACH.READY_CLOSED` | `SET.13` | [V08-HELP-WORLD](../08-visual-designs/V08-HELP-WORLD.png) | No response text/announcement until deliberate reopening and recheck. |
| `UI.COACH.RESPONSE` | `SET.13` | [V08-HELP-PREPARED](../08-visual-designs/V08-HELP-PREPARED.png) | Use the actual eligible bank response. Local fallback bears Prepared hint; a service-selected bank response does not claim local fallback. Ask again, Show me a way and Keep playing remain available. |
| `UI.COACH.CLARIFY` | `SET.13` | [V08-HELP-CLARIFY](../08-visual-designs/V08-HELP-CLARIFY.png) | Meaning not assumed; explicit resubmission. |
| `UI.COACH.DIRECT` | `SET.13` | [V08-HELP-DIRECT](../08-visual-designs/V08-HELP-DIRECT.png) | Permitted new facts recorded, no whole-source reading flags. |
| `UI.COACH.STALE` | `SET.13` | [V08-HELP-STALE](../08-visual-designs/V08-HELP-STALE.png) | Closed panel quietly removes old marker. |
| `UI.COACH.CANCELED` | `SET.13` | [V08-HELP-ENTRY](../08-visual-designs/V08-HELP-ENTRY.png) | Return to entry with Request canceled. Your idea is kept. Preserve the real draft; remove pending/ready marker. No late insertion. |
| `UI.PAUSE` | `SET.14` | [V08-PAUSE-SAVE](../08-visual-designs/V08-PAUSE-SAVE.png) | Historical recap action only after completion. |
| `UI.SETTINGS` | `SET.14` | [V08-SETTINGS](../08-visual-designs/V08-SETTINGS.png) | Actual applied state, truthful preference saving. |
| `UI.SAVE.PENDING` | `SET.14` | [V08-PAUSE-SAVE](../08-visual-designs/V08-PAUSE-SAVE.png) | Use the quiet caption/status position with Saving…; Menu details may say Your latest changes are still being saved. No saved badge before acknowledgment. |
| `UI.SAVE.SAVED` | `SET.14` | [V08-PAUSE-SAVE](../08-visual-designs/V08-PAUSE-SAVE.png) | Same position with Saved on this device. No global success animation or implication that every newer change is saved. |
| `UI.SAVE.SESSION` | `SET.14` | [V08-PAUSE-SAVE](../08-visual-designs/V08-PAUSE-SAVE.png) | Session stays playable; no false cloud promise. |
| `UI.RECOVERY.READ` | `SET.15` | [V08-RECOVERY-READ](../08-visual-designs/V08-RECOVERY-READ.png) | Unknown durable record preserved. |
| `UI.RECOVERY.VERSION` | `SET.15` | [V08-RECOVERY-INCOMPATIBLE](../08-visual-designs/V08-RECOVERY-INCOMPATIBLE.png) | Back remains available. Start a new game only opens the separate New game confirmation; no automatic conversion. |
| `UI.RECOVERY.DAMAGED` | `SET.15` | [V08-RECOVERY-DAMAGED](../08-visual-designs/V08-RECOVERY-DAMAGED.png) | No invented partial progress/success. |
| `UI.RECOVERY.REPLACE` | `SET.15` | [V08-RECOVERY-READ](../08-visual-designs/V08-RECOVERY-READ.png) | Use P.DECISION: exact known/unknown replacement sentence; Keep this visit unsaved first and Replace saved game second. Do not reuse Retry or Play without saving from the visual family example. |
| `UI.RECOVERY.RUN` | `SET.15` | [V08-RECOVERY-RESUME](../08-visual-designs/V08-RECOVERY-RESUME.png) | Use This playback couldn’t be continued. Keep independently valid case progress; show Return/Go to Stage and Rehearse only at valid Stage approach. Do not use the normal-resume reassurance. |
| `UI.RESUME.RUN` | `SET.14` | [V08-RECOVERY-RESUME](../08-visual-designs/V08-RECOVERY-RESUME.png) | Actual retained mode, stable cue, exposure uncertainty. |
| `UI.RESET.CASE` | `SET.14` | [V08-RECOVERY-NEW-GAME](../08-visual-designs/V08-RECOVERY-NEW-GAME.png) | Safe cancel first; only actual acceptance resets case. |
| `UI.RETURN.FOREGROUND` | `SET.14` | [V08-RECOVERY-RESUME](../08-visual-designs/V08-RECOVERY-RESUME.png) | Show Welcome back. Your game is paused. Restore the prior task/draft and retained mode; Return to festival does not autoplay. |
| `UI.TOAST.COVERED` | `SET.16` | [V08-STORYBOARD-TOAST](../08-visual-designs/V08-STORYBOARD-TOAST.png) | Optional, no tiny-toast spoiler before reveal. |
| `UI.TOAST.REVEALING` | `SET.16` | [V08-STORYBOARD-TOAST](../08-visual-designs/V08-STORYBOARD-TOAST.png) | Not all captions pre-announced; leave settles final result. |
| `UI.TOAST.REVEALED` | `SET.16` | [V08-STORYBOARD-TOAST](../08-visual-designs/V08-STORYBOARD-TOAST.png) | No clue/reward/required flag. |
| `UI.TOAST.MAGNIFIER` | `SET.16` | [V08-STORYBOARD-TOAST](../08-visual-designs/V08-STORYBOARD-TOAST.png) | Use the enlarged tiny-toast detail from V08-STORYBOARD-TOAST with CT.TOAST.ENLARGED and Close. No evidence toolbar or collection action. |
| `UI.TOAST.REPLAY` | `SET.16` | [V08-STORYBOARD-TOAST](../08-visual-designs/V08-STORYBOARD-TOAST.png) | Same revealed result, no new case state. |
| `UI.ENDING.CELEBRATION` | `SET.17` | [V08-PREMIERE](../08-visual-designs/V08-PREMIERE.png) | Historical completion already committed. |
| `UI.ENDING.AFTERMATH` | `SET.17` | [V08-STORYBOARD-PREMIERE](../08-visual-designs/V08-STORYBOARD-PREMIERE.png) | Editorial own-room scenes; no NPC relocation. |
| `UI.ENDING.RECAP` | `SET.17` | [V08-RECAP](../08-visual-designs/V08-RECAP.png) | Reopened recap uses Back/Return to room and preserves current location/order. |
| `UI.TECH.LOADING` | `SET.18` | [V08-OPENING](../08-visual-designs/V08-OPENING.png) | Native CT.TECH status with Retry/Back/room descriptions; no game shown from invalid content. Art failure leaves named controls usable when content is valid. |
| `UI.TECH.CONTENT_ERROR` | `SET.18` | [V08-OPENING](../08-visual-designs/V08-OPENING.png) | Native CT.TECH status with Retry/Back/room descriptions; no game shown from invalid content. Art failure leaves named controls usable when content is valid. |
| `UI.TECH.ART_STATUS` | `SET.19` | [V08-OPENING](../08-visual-designs/V08-OPENING.png) | Native CT.TECH status with Retry/Back/room descriptions; no game shown from invalid content. Art failure leaves named controls usable when content is valid. |

## All Item06 transitions

These state lists name applicable contexts, not a forced route or new transition destination. The exact trigger/prerequisite/commit is the existing Item06 transition and Item09 operation; the actual physical owner selects its clip from the manifest. Common navigation, comparison, coaching and recovery use native controls and require no additional bitmap.

| Transition | Applicable existing states | Component sets | Canonical action/content reference |
|---|---|---|---|
| `T.CLIP.DESCRIBE` | `UI.SOURCE.CLIP` | `SET.05` | CT.CLIP.DESCRIBE → CT.SRC.E2.A complete description, explicitly exposed. |
| `T.CLIP.STEP` | `UI.SOURCE.CLIP` | `SET.05` | Previous/Next/frame button → only chosen frame, end marker if final. |
| `T.COACH.CANCEL` | `UI.COACH.CANCELED` | `SET.13` | CT.HELP.CANCEL → CANCELED; late result ignored. |
| `T.COACH.DIRECT` | `UI.COACH.ENTRY`, `UI.COACH.DIRECT` | `SET.13` | CT.HELP.DIRECT → appropriate CT.DIRECT exact answer; prior response opportunity canceled. |
| `T.COACH.DIRECT_CLOSE` | `UI.COACH.DIRECT` | `SET.13` | Shared close → actual source/outcome/assistance history retained; no tile auto-placement. |
| `T.COACH.FALLBACK` | `UI.COACH.FALLBACK_OFFER`, `UI.COACH.RESPONSE` | `SET.13` | CT.HELP.USE_PREPARED → exact eligible local response; sole reply ownership. |
| `T.COACH.OFFER` | `UI.COACH.WAITING`, `UI.COACH.FALLBACK_OFFER` | `SET.13` | CT.HELP.OFFER after proposed eight seconds; closed view only AVAILABLE. |
| `T.COACH.OPEN_READY` | `UI.COACH.READY_CLOSED`, `UI.COACH.RESPONSE`, `UI.COACH.STALE` | `SET.13` | READY → recheck, response or STALE; no stale text flashed first. |
| `T.COACH.THINK` | `UI.COACH.ENTRY`, `UI.COACH.PENDING` | `SET.13` | CT.HELP.THINK → PENDING with submitted text or TOPIC without it. |
| `T.COACH.TOPIC` | `UI.COACH.TOPIC` | `SET.13` | CT.HELP.TOPIC → eligible authored attention/clarification, labeled Prepared hint. |
| `T.COACH.WAIT` | `UI.COACH.PENDING` | `SET.13` | CT.HELP.WAITING after proposed two seconds. |
| `T.COMPARE.CHOOSE` | `UI.COMPARE.EMPTY` | `SET.08` | CT.SOURCE.ADD/CHANGE → CT.SOURCE.CHOOSE. |
| `T.COMPARE.RELATE` | `UI.COMPARE.READY`, `UI.IDEA.RECORDED` | `SET.08` | CT.COMPARE relationship labels; CT.COMPARE.RELATION_HELP explains ownership. |
| `T.COMPARE.REMOVE` | `UI.COMPARE.PARTIAL` | `SET.08` | CT.SOURCE.REMOVE → remaining slots + retained idea/relation. |
| `T.COMPARE.SAVE` | `UI.COMPARE.READY`, `UI.IDEA.RECORDED` | `SET.08` | CT.IDEA.SAVE → CT.IDEA.RECORDED or actual empty/limit message. |
| `T.ENDING.AFTER` | `UI.ENDING.CELEBRATION` | `SET.17` | CT.ENDING.CONTINUE → AFTER + exact own-room reactions. |
| `T.ENDING.RECAP` | `UI.ENDING.AFTERMATH` | `SET.17` | NEXT/end/SKIP_REACTIONS → FACT + only actual conditional recap records. |
| `T.ENDING.REOPEN` | `UI.GOAL`, `UI.PAUSE`, `UI.ENDING.RECAP` | `SET.03`, `SET.14`, `SET.17` | CT.ENDING.REOPEN → same factual historical recap in place. |
| `T.ENDING.REPLAY` | `UI.ENDING.RECAP` | `SET.17` | REPLAY at actual Stage Show approach, or GO_REPLAY travel only when elsewhere; current check still applies. |
| `T.ENDING.RETURN` | `UI.ENDING.RECAP` | `SET.17` | RETURN or shared Back/Return to room according to caller; preserve current location/order. |
| `T.ENDING.SKIP` | `UI.ENDING.CELEBRATION` | `SET.17` | SKIP/actual leave → completed recap or chosen room; no erased completion. |
| `T.GOAL.ACTION` | `UI.GOAL`, `UI.NAV.MAP` | `SET.03` | Current actual goal/action or Map; no automatic hypothesis. |
| `T.GUIDE.DISMISS` | `UI.GUIDE.OPENING` | `SET.02` | CT.UI.DISMISS; no extra line or goal loss. |
| `T.GUIDE.MODEL` | `UI.GUIDE.OPENING` | `SET.02` | CT.OBJ.MODEL_RESULT + CT.JO.MODEL; next suggestion CT.GUIDE.PREVIEW. |
| `T.GUIDE.PREVIEW` | `UI.GUIDE.OPENING` | `SET.02` | CT.WORK.PREVIEW_RESULT; available crew actions, no prescribed hidden destination. |
| `T.HOME.CHECK` | `UI.HOME.CHECKING`, `UI.HOME.EMPTY`, `UI.HOME.SAVED`, `UI.RECOVERY.READ`, `UI.RECOVERY.VERSION`, `UI.RECOVERY.DAMAGED` | `SET.01`, `SET.15` | CT.START.CHECK → actual Start/Continue/recovery result, no invented empty slot. |
| `T.HOME.CONTINUE` | `UI.HOME.SAVED`, `UI.WORLD.IDLE`, `UI.RESUME.RUN` | `SET.01`, `SET.03`, `SET.14` | CT.START.CONTINUE/LOCATION/VISIT → current room and actual paused-run/draft status. |
| `T.HOME.OVER` | `UI.HOME.SAVED`, `UI.RESET.CASE` | `SET.01`, `SET.14` | CT.START.OVER or CT.RECOVERY.NEW → CT.RESET.QUESTION/SCOPE; no reset yet. |
| `T.HOME.SETTINGS` | `UI.HOME.EMPTY`, `UI.HOME.SAVED`, `UI.SETTINGS` | `SET.01`, `SET.14` | CT.UI.SETTINGS → settings families, same caller retained. |
| `T.HOME.START` | `UI.HOME.EMPTY`, `UI.WORLD.IDLE`, `UI.GUIDE.OPENING` | `SET.01`, `SET.03`, `SET.02` | CT.START.START → CT.GOAL.ASSIGNMENT + opening room/guidance. |
| `T.IDEA.CLOSE` | `UI.IDEA.DRAFT` | `SET.08` | Shared close, draft preserved in session; save status separate. |
| `T.IDEA.EDIT` | `UI.IDEA.RECORDED`, `UI.LEAD` | `SET.08` | CT.IDEA.EDIT → draft/status; old version remains actual history. |
| `T.IDEA.HELP` | `UI.IDEA.DRAFT` | `SET.08` | Explicit Help → CT.HELP entry; no silent request. |
| `T.IDEA.LEAD` | `UI.IDEA.RECORDED`, `UI.LEAD` | `SET.08` | Lead selection → CT.LEAD.CHOOSE. |
| `T.IDEA.SAVE` | `UI.IDEA.DRAFT` | `SET.08` | CT.IDEA.SAVE → CT.IDEA.RECORDED or actual empty/limit message. |
| `T.KIT.COLLECT` | `UI.KIT.CLOSED`, `UI.KIT.OPEN`, `UI.KIT.CARRIED` | `SET.10` | CT.KIT.COLLECT → carried/HAVE result, no note bodies. |
| `T.KIT.OPEN` | `UI.KIT.CLOSED`, `UI.KIT.OPEN` | `SET.10` | CT.KIT.OPEN → CT.KIT.CONTENTS at lid commit. |
| `T.KIT.SEAT` | `UI.KIT.HANDOFF`, `UI.KIT.SEATED` | `SET.10` | CT.KIT.HANDOFF → CT.KIT.SEATED at actual seat; queued work action follows only if current. |
| `T.LEAD.SET` | `UI.LEAD` | `SET.08` | CT.LEAD.FOLLOW → CT.GOAL.QUESTION; Go is separate. |
| `T.NAV.DESCRIBE` | `UI.NAV.MAP` | `SET.03` | Selected CT.NAV entry, public information only. |
| `T.NAV.GO` | `UI.NAV.MAP`, `UI.LEAD` | `SET.03`, `SET.08` | CT.WORLD.GO → legal door chain; arrival scene. |
| `T.NAV.OBJECT` | `UI.NAV.OBJECTS` | `SET.03` | CT.WORLD.LOCAL_LIST/actual action → legal movement. |
| `T.NOTES.KIT` | `UI.NOTES.EMPTY`, `UI.KIT.CARRIED` | `SET.04`, `SET.10` | CT.KIT.OPEN_CURRENT or AT_STAGE → legitimate owner/access, never remote unread seated leaflet. |
| `T.NOTES.OPEN` | `UI.NOTES.LIST`, `UI.SOURCE.TEXT` | `SET.04` | CT.NOTES.OPEN_SOURCE → actual acquired component/title/body. |
| `T.NOTES.TAB` | `UI.NOTES.EMPTY`, `UI.KIT.CARRIED` | `SET.04`, `SET.10` | CT.NOTES tab labels → corresponding heading/content. |
| `T.PAUSE.HOME` | `UI.PAUSE` | `SET.14` | CT.PAUSE.HOME → Continue this visit if unsaved; live state retained. |
| `T.PAUSE.RETURN` | `UI.PAUSE` | `SET.14` | CT.UI.FESTIVAL → world with run still paused. |
| `T.PAUSE.SETTINGS` | `UI.PAUSE` | `SET.14` | CT.UI.SETTINGS → settings families, same caller retained. |
| `T.PHOTO.ENLARGE` | `UI.SOURCE.PHOTO`, `UI.SOURCE.ZOOM` | `SET.06`, `SET.04` | CT.SOURCE.ENLARGE or CT.CLIP.ENLARGE_PHOTO; identical component info. |
| `T.PICK.CANCEL` | `UI.SOURCE.PICK` | `SET.04` | CT.UI.CANCEL → prior slot unchanged; no new status necessary. |
| `T.PICK.USE` | `UI.SOURCE.PICK` | `SET.04` | CT.SOURCE.USE → actual selected slot/details; no verdict. |
| `T.PLAN.DELIVER` | `UI.PLAN.ADDRESSED` | `SET.08` | At actual approach, CT.PRESENT.DONE/CT.PLAN.DELIVERED and appropriate §5 reply; snapshot once. |
| `T.PLAN.RECORD` | `UI.PLAN.PRIVATE` | `SET.08` | CT.PLAN.RECORD → CT.PLAN.RECORDED, no Jo reply. |
| `T.POST.PHOTO` | `UI.SOURCE.POST`, `UI.SOURCE.PHOTO` | `SET.05`, `SET.06` | CT.MEDIA.PHOTO → CT.SRC.E2.B + CT.MEDIA.PARTIAL. |
| `T.POST.PLAY` | `UI.SOURCE.POST`, `UI.SOURCE.CLIP` | `SET.05` | CT.CLIP.PLAY → actual frame/recording metadata. |
| `T.PRESENT.DELIVER` | `UI.PRESENT.APPROACH` | `SET.09` | At actual approach, CT.PRESENT.DONE/CT.PLAN.DELIVERED and appropriate §5 reply; snapshot once. |
| `T.PRESENT.REVIEW` | `UI.PRESENT.SELECT` | `SET.09` | CT.PRESENT.REVIEW + exact selected refs/words. |
| `T.PRESENT.SHOW` | `UI.PRESENT.REVIEW`, `UI.PRESENT.APPROACH` | `SET.09` | CT.PRESENT.SHOW → CT.PRESENT.GOING; delivery not yet claimed. |
| `T.PRESENT.TRAVEL` | `UI.PRESENT.REVIEW`, `UI.PRESENT.APPROACH` | `SET.09` | CT.PRESENT.GO → actual destination, retain undelivered selection. |
| `T.RAIL.CANCEL` | `UI.RAIL.DESTINATIONS` | `SET.12` | CT.RAIL.CANCEL → CT.RAIL.CANCELED, or INVALID on invalid drop; original owner. |
| `T.RAIL.COMMIT` | `UI.RAIL.DESTINATIONS` | `SET.12` | Operation-specific caption below, then CT.RAIL.CHANGED only for actual order change. |
| `T.RAIL.DESTINATIONS` | `UI.RAIL.SELECTED` | `SET.12` | CT.RAIL.ARRANGE/CHOOSE/DESTINATIONS → valid named operations. |
| `T.RAIL.INSERT` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | `SET.12`, `SET.11` | CT.RAIL gap/move action → CT.RAIL.PLACED + changed caption. |
| `T.RAIL.MOVE` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | `SET.12`, `SET.11` | CT.RAIL gap/move action → CT.RAIL.PLACED + changed caption. |
| `T.RAIL.NOOP` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.CERTIFIED`, `UI.RUN.PAUSED` | `SET.12`, `SET.11` | CT.RAIL.SAME/START_LIMIT/END_LIMIT; certification retained, no changed caption. |
| `T.RAIL.REPLACE` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | `SET.12`, `SET.11` | CT.RAIL.REPLACE → CT.RAIL.REPLACED + changed caption. |
| `T.RAIL.RETURN` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | `SET.12`, `SET.11` | CT.RAIL.RETURN → CT.RAIL.RETURNED + changed caption. |
| `T.RAIL.SWAP` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | `SET.12`, `SET.11` | CT.RAIL.SWAP → CT.RAIL.SWAPPED + changed caption. |
| `T.RECOVERY.NEW` | `UI.RECOVERY.VERSION` | `SET.15` | CT.START.OVER or CT.RECOVERY.NEW → CT.RESET.QUESTION/SCOPE; no reset yet. |
| `T.RECOVERY.REPLACE` | `UI.RECOVERY.REPLACE` | `SET.15` | Actual unknown/known message + Replace saved game → save result; cancel keeps visit. |
| `T.RECOVERY.RETRY` | `UI.RECOVERY.READ` | `SET.15` | CT.RECOVERY.RETRY → startup check, no overwrite. |
| `T.RESET.ACCEPT` | `UI.RESET.CASE` | `SET.14` | CT.RESET.ACCEPT → initial assignment; OLD_MAY_RETURN only on actual save failure. |
| `T.RESET.CANCEL` | `UI.RESET.CASE` | `SET.14` | KEEP_PLAYING/KEEP_SAVED → same caller, no case change. |
| `T.RESUME.OPEN` | `UI.RESUME.RUN` | `SET.14` | CT.RUN.OPEN → actual Stage approach and correct-mode paused/terminal controls. |
| `T.RUN.BEGIN` | `UI.RUN.STARTING`, `UI.RUN.REHEARSAL`, `UI.RUN.SHOW` | `SET.11` | CT.RUN.TITLE and current cue; no success claim. |
| `T.RUN.CONTINUE` | `UI.RUN.PAUSED` | `SET.11` | CT.RUN.CONTINUE → actual next cue; no repair of prior unmet outcome. |
| `T.RUN.CUE` | `UI.RUN.REHEARSAL` | `SET.11` | Exact §6.4 factual endpoint caption; next/paused/finished result per actual state. |
| `T.RUN.FINALIZE` | `UI.RUN.TERMINAL`, `UI.RUN.FAILED`, `UI.WORK.CERTIFIED`, `UI.ENDING.CELEBRATION` | `SET.11`, `SET.17` | CT.RUN.FINALIZE → FINISHED/CERTIFIED or completed-show ending; no repeated last cue. |
| `T.RUN.LEAVE` | `UI.RUN.PAUSED`, `UI.RUN.TERMINAL`, `UI.WORLD.IDLE`, `UI.WORLD.MOVING` | `SET.11`, `SET.03` | Settle current cue once, CT.RUN.PAUSED or TERMINAL; leave then actual movement. |
| `T.RUN.REHEARSE` | `UI.WORK.EMPTY` | `SET.11` | CT.WORK.REHEARSE → missing-resource/empty message or Rehearsal starting. |
| `T.RUN.RESTART` | `UI.RUN.PAUSED` | `SET.11` | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.RUN.RESTART.REHEARSAL` | `UI.RUN.PAUSED`, `UI.RUN.UNMET`, `UI.RUN.STARTING` | `SET.11` | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.RUN.RESTART.SHOW` | `UI.RUN.PAUSED`, `UI.RUN.STARTING`, `UI.WORK.SHOW_CHECK` | `SET.11` | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.RUN.SHOW` | `UI.WORK.CERTIFIED`, `UI.RUN.STARTING`, `UI.RUN.SHOW` | `SET.11` | CT.WORK.LAUNCH/REPLAY → eligible Premiere starting; otherwise Show check. |
| `T.RUN.STOP` | `UI.RUN.REHEARSAL`, `UI.RUN.SHOW`, `UI.RUN.PAUSED`, `UI.RUN.TERMINAL` | `SET.11` | Settle current cue once, CT.RUN.PAUSED or TERMINAL; leave then actual movement. |
| `T.RUN.UNMET_CONTINUE` | `UI.RUN.UNMET` | `SET.11` | CT.RUN.CONTINUE → actual next cue; no repair of prior unmet outcome. |
| `T.SAVE.ACK` | `UI.SAVE.PENDING` | `SET.14` | CT.SAVE.SAVED only latest corresponding acknowledgment. |
| `T.SAVE.FAIL` | `UI.SAVE.PENDING` | `SET.14` | CT.SAVE.FAILED/DETAIL, no interruption forced. |
| `T.SAVE.RETRY` | `UI.SAVE.SESSION` | `SET.14` | CT.SAVE.RETRY → PENDING or real replacement decision. |
| `T.SETTINGS.CHANGE` | `UI.SETTINGS` | `SET.14` | Actual label/choice and APPLIED; save result separately truthful. |
| `T.SHOW.CHECK` | `UI.WORK.SHOW_CHECK` | `SET.11` | Actual prerequisite first, otherwise CT.WORK.CHECK. |
| `T.SOURCE.SELECT` | `UI.SOURCE.TEXT`, `UI.SOURCE.ZOOM`, `UI.SOURCE.WORD` | `SET.04` | CT.SOURCE.DETAIL → exact chosen passage + CT.ACCESS.DETAIL_SELECTED. |
| `T.SOURCE.UNZOOM` | `UI.SOURCE.ZOOM` | `SET.04` | CT.UI.BACK → same source/component/scroll; no new text. |
| `T.SOURCE.WORD` | `UI.SOURCE.TEXT`, `UI.SOURCE.ZOOM`, `UI.SOURCE.WORD` | `SET.04` | Selected defined word → its CT.WORD entry. |
| `T.SOURCE.WORD.CLOSE` | `UI.SOURCE.WORD` | `SET.04` | CT.SOURCE.DEFINITION_CLOSE → same reader word focus. |
| `T.SOURCE.ZOOM` | `UI.SOURCE.TEXT`, `UI.SOURCE.ZOOM`, `UI.SOURCE.WORD` | `SET.04` | CT.SOURCE.ENLARGE or CT.CLIP.ENLARGE_PHOTO; identical component info. |
| `T.STORY.CLOSE` | `UI.STORY.DESCRIBE` | `SET.11` | Shared Back/Close → paused same caller; no new cue. |
| `T.TALK.ASK` | `UI.TALK.TOPICS`, `UI.TALK.REPLY` | `SET.09` | Actual CT.TALK topic → exact §5 matrix reply. |
| `T.TALK.BACK` | `UI.TALK.REPLY` | `SET.09` | CT.UI.BACK → current topic list, no repeated intro. |
| `T.TALK.SOURCE` | `UI.TALK.TOPICS`, `UI.TALK.REPLY` | `SET.09` | Own-source request → actual §2 body and origin; source access, not a new author. |
| `T.TIMELINE.SOURCE` | `UI.TIMELINE.KNOWN` | `SET.08` | CT.NOTES.OPEN_SOURCE → actual acquired component/title/body. |
| `T.TIMELINE.VIEW` | `UI.TIMELINE.KNOWN` | `SET.08` | Event times/Discovery order; actual rows reordered, no history change. |
| `T.TOAST.LOOK` | `UI.TOAST.REVEALED` | `SET.16` | CT.TOAST.LOOK → ENLARGED. |
| `T.TOAST.REPLAY` | `UI.TOAST.REVEALED` | `SET.16` | CT.TOAST.REPLAY → FLOURISH then same result. |
| `T.TOAST.SETTLE` | `UI.TOAST.REVEALING`, `UI.TOAST.REVEALED` | `SET.16` | PUNCHLINE + final MAGNIFIER description; reveal committed once. |
| `T.TOAST.START` | `UI.TOAST.COVERED`, `UI.TOAST.REVEALING` | `SET.16` | CT.TOAST.START → actual reveal-stage captions. |
| `T.VISIBILITY.HIDE` | `UI.WORLD.IDLE`, `UI.RUN.PAUSED`, `UI.RUN.TERMINAL` | `SET.03`, `SET.11` | No background announcement; handled event settles/pauses and attempts save. |
| `T.VISIBILITY.RETURN` | `UI.RETURN.FOREGROUND` | `SET.14` | CT.RETURN.VISIBLE and existing task/mode/draft; no automatic resume. |
| `T.WORK.CLEAR` | `UI.WORK.MORE` | `SET.11` | CT.WORK.CLEAR/description → CLEAR_RESULT; historical premiere retained. |
| `T.WORK.EDIT` | `UI.WORK.NEEDS_LOOP` | `SET.11` | CT.RAIL.ARRANGE/CHOOSE/DESTINATIONS → valid named operations. |
| `T.WORK.MISSING` | `UI.WORK.NEEDS_KIT` | `SET.11` | Actual CT.WORK.MISSING_KIT/LOOP; no source prerequisite. |
| `T.WORK.RESET` | `UI.WORK.MORE` | `SET.11` | CT.WORK.RESET/description → RESET_RESULT; retain order, remove current certification. |
| `T.WORLD.ABORT` | `UI.WORLD.OPERATING` | `SET.03` | Actual pre/post-commit cue/result remains; fresh intent. CT.PRESENT.CANCELED only if delivery never committed. |
| `T.WORLD.ARRIVE` | `UI.WORLD.MOVING`, `UI.WORLD.OPERATING` | `SET.03` | Room crossing CT.WORLD.ARRIVED + actual scene; at object, its operating content. No new arbitrary arrival lore. |
| `T.WORLD.CANCEL` | `UI.WORLD.MOVING`, `UI.WORLD.OPERATING` | `SET.03` | CT.WORLD.STOP → CT.WORLD.STOPPED. |
| `T.WORLD.CHOOSE` | `UI.WORLD.CHOOSER` | `SET.03` | CT.WORLD.CHOOSE + chosen actual label → movement; Cancel leaves unchanged. |
| `T.WORLD.COMMIT` | `UI.WORLD.OPERATING`, `UI.WORLD.IDLE`, `UI.SOURCE.TEXT`, `UI.KIT.CARRIED` | `SET.03`, `SET.04`, `SET.10` | Exact physical result §3.3/§6.1/§9 or actual source heading/body. |
| `T.WORLD.MOVE` | `UI.WORLD.IDLE`, `UI.WORLD.MOVING`, `UI.PAUSE` | `SET.03`, `SET.14` | Actual action label → CT.WORLD.GOING for named target; retarget cancels old uncommitted operation. |
| `T.WORLD.RETARGET` | `UI.WORLD.MOVING`, `UI.WORLD.OPERATING` | `SET.03` | Actual action label → CT.WORLD.GOING for named target; retarget cancels old uncommitted operation. |
| `T.WORLD.RETRY` | `UI.WORLD.BLOCKED` | `SET.03` | BLOCKED/UNREACHABLE replaced by new actual movement/status. |
| `T.WORLD.TOOL` | `UI.WORLD.IDLE`, `UI.WORLD.MOVING`, `UI.PAUSE` | `SET.03`, `SET.14` | Chosen toolbar label → its heading; applies pause caption if running. |

## Source-presentation boundary

- **ST.SOURCE.E1:** `E1.a`, `E1.b`, `E1.c`. Exact available native body at legitimate readable endpoint; actual passages recorded, possession is not comprehension.
- **ST.SOURCE.E4:** `E4.a`, `E4.b`. Exact available native body at legitimate readable endpoint; actual passages recorded, possession is not comprehension.
- **ST.SOURCE.E6:** `E6.a`, `E6.b`. Exact available native body at legitimate readable endpoint; actual passages recorded, possession is not comprehension.
- **CY.SOURCE.E3:** `E3.a`, `E3.b`. Only CT.OBJ.NOTICE_PARTIAL before noticeFlat; full CT.SRC.E3 after flat+secured commit.
- **CY.SOURCE.E7:** `E7.a`, `E7.b`, `E7.c`. Exact available native body at legitimate readable endpoint; actual passages recorded, possession is not comprehension.
- **MD.SOURCE.E5:** `E5.a`. Exact available native body at legitimate readable endpoint; actual passages recorded, possession is not comprehension.
- **MD.SOURCE.E6:** `E6.a`, `E6.b`. Exact available native body at legitimate readable endpoint; actual passages recorded, possession is not comprehension.
- **MD.SOURCE.E7:** `E7.a`, `E7.b`, `E7.c`. Exact available native body at legitimate readable endpoint; actual passages recorded, possession is not comprehension.
- **KIT.NOTE.E6:** `E6.a`, `E6.b`. Unopened carried copy may be read without earlier source; collection alone exposes no body.
- **KIT.NOTE.E7:** `E7.a`, `E7.b`, `E7.c`. Unopened carried copy may be read without earlier source; collection alone exposes no body.
- **ST.ACCESS.E2:** `E2.a`, `E2.a/frame1`, `E2.a/frame2`, `E2.a/frame3`, `E2.a/end`, `E2.a/description`, `E2.b`, `E2.c`. First frame and actually shown posted interpretation only; clip frame2/3/end/photo/full description separately gated.
- **CY.ACCESS.E2:** `E2.a`, `E2.a/frame1`, `E2.a/frame2`, `E2.a/frame3`, `E2.a/end`, `E2.a/description`, `E2.b`, `E2.c`. First frame and actually shown posted interpretation only; clip frame2/3/end/photo/full description separately gated.
- **ACT.LOOP:** `E5.c`, `E5.c/seen`, `E5.c/response`. Local seen and wake response are separate E5.c facts; no recorded slate/account inherited.
- **LOOP.FOLLOW.PAD:** `E5.c`, `E5.c/seen`, `E5.c/response`. Local seen and wake response are separate E5.c facts; no recorded slate/account inherited.
- **WK.ACCESS.NAV:** `NAV.ST`, `NAV.CY`, `NAV.WK`, `NAV.MEDIA`. Public room functions only; never current hidden occupants.
- **ACT.JO:** `E1.a`, `E1.b`, `E1.c`, `E6.a`, `E6.b`. Only authored selected reply/delivered source paragraphs; NPC receives only supplied facts.
- **ACT.REMY:** `E2.c`, `E7.a`, `E7.b`, `E7.c`. Only authored selected reply/delivered source paragraphs; NPC receives only supplied facts.
- **ACT.ARI:** `E5.b`. Only authored selected reply/delivered source paragraphs; NPC receives only supplied facts.
- **MD.ACCESS.E8:** `E8/TILE.FERRY`, `E8/TILE.BRIDGE`, `E8/TILE.PLANT`, `E8/TILE.BLOOM`. Exact available native body at legitimate readable endpoint; actual passages recorded, possession is not comprehension.

## Fifteen written route and state checks

Each trace checks the planned composition against the established behavior. None is labeled a completed browser, input, player or educational test.

### R10.01

**States:** `UI.HOME.EMPTY` → `UI.GUIDE.OPENING` → `UI.WORLD.IDLE`.

**Objects/accesses:** `SC.ST`, `ST.MODEL.TAB`, `ST.CONTROL.SHOW`.

Start, optionally pull the model tab or try Preview, then dismiss guidance and choose any exit. Empty dock/bay and blank projection remain visible around the avatar and independent miniature. Skipping retains the assignment and all exits.

### R10.02

**States:** `UI.SOURCE.TEXT` → `UI.NAV.MAP` → `UI.WORLD.MOVING`.

**Objects/accesses:** `ST.SOURCE.E4`, `WK.ACCESS.NAV`, `ACC.VENUE`, `MD.EXIT.WK`.

Unfold E4, read NAV.MEDIA, and choose Media through Workshop. Native request preserves intention; the venue description gives suitability. No Loop portrait or occupancy claim appears before arrival.

### R10.03

**States:** `UI.SOURCE.POST` → `UI.SOURCE.CLIP` → `UI.SOURCE.PHOTO` → `UI.SOURCE.TEXT` → `UI.PRESENT.APPROACH`.

**Objects/accesses:** `CY.ACCESS.E2`, `CY.SOURCE.E3`, `ACT.REMY`.

Inspect E2's first frame and message; explicitly step the recording or enlarge the photo. Flatten E3 and optionally present selected passages. Only chosen components appear. The notice's moving reverse stays unreadable; full E3 appears after securing. Remy acknowledges only delivered facts.

### R10.04

**States:** `UI.WORLD.IDLE` → `UI.KIT.CLOSED` → `UI.KIT.OPEN`.

**Objects/accesses:** `SC.MD`, `ACT.LOOP`, `MD.ACCESS.E8`, `ACT.ARI`.

Travel directly to Media, then wake Loop or collect the kit in either order. Ari and Loop are openly present. No earlier reading, curtain or conversation gate. The historical slate and unread note bodies are not automatically exposed.

### R10.05

**States:** `UI.KIT.CARRIED` → `UI.KIT.HANDOFF` → `UI.KIT.SEATED` → `UI.SOURCE.TEXT`.

**Objects/accesses:** `KIT.CADDY`, `KIT.NOTE.E6`, `KIT.NOTE.E7`, `ST.RACK.BAY`.

Collect the kit without reading its notes, walk to Stage, seat it at the bay, and open the leaflets there. One caddy carries two notes and four unique tiles. Mounted copies remain; portable readers use the same canonical E6/E7.

### R10.06

**States:** `UI.WORK.NEEDS_LOOP` → `UI.WORK.NEEDS_KIT` → `UI.WORK.READY`.

**Objects/accesses:** `ST.RACK.BAY`, `ST.DOCK`, `ACT.LOOP`.

Return the kit before Loop; also trace Loop before the kit. Kit alone allows tile planning with a blank projection. Loop alone displays the initial story beside an empty bay. Both must physically arrive before rehearsal.

### R10.07

**States:** `UI.RUN.REHEARSAL` → `UI.RUN.UNMET` → `UI.SOURCE.TEXT` → `UI.COACH.ENTRY`.

**Objects/accesses:** `PUP.PIP`, `PUP.GRANDMA`, `PUP.SEED`, `KIT.NOTE.E6`.

Run One Boat then Hill. Inspect a note or request help, then revise the plan. Grandma holds the seed while Pip remains left; no roots or light. Hill pauses with a factual caption. An actual edit resets current story/certification, retaining notes and history.

### R10.08

**States:** `UI.RUN.REHEARSAL` → `UI.WORK.CERTIFIED`.

**Objects/accesses:** `ST.RAIL`, `PUP.BOATS`, `PUP.FLOWER`.

Trace BPL, FBPL, BFPL, BPFL and BPLF using the existing cue rules. All reach the same together/planted/lit result through shared assets. A trailing harmless Ferry still completes before finalization; no separate movie per order.

### R10.09

**States:** `UI.WORK.CERTIFIED` → `UI.RUN.SHOW` → `UI.ENDING.CELEBRATION` → `UI.ENDING.AFTERMATH` → `UI.ENDING.RECAP`.

**Objects/accesses:** `ST.CONTROL.SHOW`, `ST.PROJECTION`, `PUP.BACKPACK`.

Launch the certified arrangement, finalize the premiere, skip aftermath if wanted, then optionally replay. The same Show pad changes label. Both-bank payoff and backpack remain visible. Historical completion occurs once; replay starts the actual eligible current arrangement.

### R10.10

**States:** `UI.RUN.PAUSED` → `UI.SOURCE.TEXT` → `UI.RESUME.RUN`.

**Objects/accesses:** `ST.CONTROL.STOP`, `ST.EXIT.WK`, `ST.RAIL`.

Stop, open a source or leave during each playback mode; return and Continue. Repeat at the final cue endpoint. Handled interruption settles one endpoint and retains the correct next cue/mode. Continue at the last committed cue finalizes without replay. Hard-close exposure remains uncertain.

### R10.11

**States:** `UI.WORK.CERTIFIED` → `UI.RAIL.SELECTED` → `UI.WORK.SHOW_CHECK`.

**Objects/accesses:** `ST.RAIL`, `ST.CONTROL.SHOW`.

After certification, select a tile and cancel. Then actually edit the order and request Launch. Selection/cancel preserves certification. A real edit resets current puppets and eligibility while preserving historical premiere completion; Launch requests a new rehearsal.

### R10.12

**States:** `UI.COACH.WAITING` → `UI.COACH.FALLBACK_OFFER` → `UI.COACH.STALE` → `UI.COACH.RESPONSE`.

**Objects/accesses:** `ACC.COACH`, `ACC.THEORY`, `ST.RAIL`.

Continue exploring while coaching waits; accept prepared fallback; allow a late reply or change the relevant context. Acknowledged draft remains. No late duplicate or stale response is shown, and no tiles move automatically. Waiting targets remain Item06/09 design targets, not measured service behavior.

### R10.13

**States:** `UI.NAV.OBJECTS` → `UI.RAIL.DESTINATIONS` → `UI.STORY.DESCRIBE` → `UI.SETTINGS`.

**Objects/accesses:** `ACC.OBJECTS`, `ACC.KIT`, `ST.RAIL`, `ACC.STORY.STATE`.

Use keyboard named movement, open the kit, select/place tiles on a 390px layout, use Largest/Roomier, and switch Arrange/Watch. Whole-room overview and both-bank description/enlargement remain available. No drag/hover/sound requirement. Typing never moves the avatar; focus returns to the surviving owner.

### R10.14

**States:** `UI.SAVE.SESSION` → `UI.RECOVERY.VERSION` → `UI.RECOVERY.DAMAGED` → `UI.RESET.CASE` → `UI.TECH.ART_STATUS`.

**Objects/accesses:** `ACC.GOAL`, `ACC.OBJECTS`, `KIT.CADDY`.

Trace storage failure, valid resume, invalid save, canceled New game, and missing art as written scenarios. Honest native recovery uses Home when no valid room exists. Current session remains playable when storage fails. Canceling reset retains state; moved-note focus resolves the current kit.

### R10.15

**States:** `UI.TOAST.COVERED` → `UI.TOAST.REVEALING` → `UI.TOAST.REVEALED` → `UI.TOAST.REPLAY`.

**Objects/accesses:** `WK.TOAST`, `WK.TOAST.SKIP`, `WK.TOAST.MAGNIFIER`.

Ignore Toast, cancel its approach, begin then leave/Skip, return to the magnifier, and Replay. Ignoring or canceling the approach leaves it covered. Started reveal settles on the tiny toast. The two-second replay ends in the same pose; all routes remain clear and the case has no Toast gate.


## Conditional invariants checked in the design

- Exactly one Loop and one caddy follow current ownership. Both portable leaflets survive collection/handoff; mounted E6/E7 remain. Every tile is still unique while selected, replaced or swapped.
- Opening has no projection. Kit-only has no projection. Loop-only has the initial projection and no tile kit. Ready requires both independent physical returns.
- E2's default first frame cannot expose a doorway/end marker, full description or photo body. Curled/moving E3 cannot expose its complete text. Public Media information cannot expose occupancy.
- Unmet Hill/Flower retain actual positions and a factual pause. Harmless Ferry continues. Pip, Grandma, seed/roots and both banks remain understandable; paper displays are not draggable puzzle controls.
- All five valid arrangements use shared state/clip assets. Cue endpoint, arrangement completion, rehearsal certification and historical premiere completion are separate.
- Controlled interruption settles the active cue once. Hard close preserves uncertainty about possibly seen outcomes. Selection/cancel does not reset the arrangement; a real edit does.
- Stale/late coaching never flashes before discard. Direct help can introduce authored information without marking entire unread notes read or placing tiles.
- Named controls, captions, whole-room overview, Arrange/Watch and reduced motion preserve the same rules. Missing art never implies a source was seen or a solution understood.

See [validation-report.json](validation-report.json) for executed schema/reference/path/count/arithmetic checks and explicit runtime/production limits.

