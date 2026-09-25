# Evidence Quest

A story-driven reading adventure for ages 9–12. Guide Pip through a riverside village, help its residents, and bring their stories together for Sparkfest.

Explore the village, repair a bridge, deliver a lantern seed by boat or by hand, help at Rina’s bakery, revisit Mara’s paper-bird story, and prepare a story to share in Jo and Loop’s studio. Reading, writing and choices connect to actions in the world.

## Run the demo

From the repository folder in PowerShell:

```powershell
.\scripts\bootstrap.ps1
.\scripts\npm.cmd ci
.\scripts\npm.cmd run build:demo
.\scripts\npm.cmd run start:demo
```

Open **[Evidence Quest](http://127.0.0.1:4364/garden)**. Keep the server terminal open while playing. Press Ctrl+C in that terminal to stop the server.

The bootstrap installs the required Node.js version locally. Initial setup needs an internet connection; authored gameplay does not require AI credentials.

## Begin an adventure

Choose **Begin Pip’s adventure** to enter the village and read the opening. Choose **Start playing** when you are ready to explore. You can take your time reading and return to help whenever you need it.

## Controls

| Action | Controls |
| --- | --- |
| Walk | Click the ground, use arrow keys or WASD, or choose a destination in Places & scene description. |
| Talk or inspect | E or the named on-screen control. |
| Backpack | I or Backpack. |
| Move a held object | Drag and release, or use the native controls. Arrow keys move, Shift makes smaller moves, Q/R turn, Enter releases and Escape cancels. |
| Boat | Use the load, steer, dock and unload controls. Pip stays on shore. |
| Plant | Prepare the soil, place and cover the seed, then touch the rooted sprout or choose its growth control. |
| Read and write | Use the reading area, clickable words, writing fields and choices. Tab moves focus; Enter or Space activates a focused button. |
| Story playback | Use the pause, resume and replay controls. |
| Pause or leave help | Escape or the named Back/Pause controls. |

## Reading and audio

The adventure includes narrated passages and character voices. Listening is optional. Click supported words for meaning and pronunciation help, or use the reading controls to hear a passage.

**Listen** plays the passage or conversation. **Practise reading** opens optional microphone recording and replay. Word help offers separate word and sentence listening. The demo uses the approved recorded voices; some short-word pronunciations still need refinement.

Writing activities let you try an ending before choosing to use it. Optional reading practice provides controls for recording, replaying and discarding a short reading. Larger text and reduced motion are available from Pause.

Optional live feedback and custom-text voices use separately configured services. The authored adventure can be played without them; configuration examples are in `.env.example`.

## Nerdy demo

The [12-minute run of show](docs/game-review/NERDY-DEMO-RUN-OF-SHOW-20260925.md) starts at Rina’s bakery, reached by ordinary fresh play before the call. It covers reading support, roof repair and baking, then writing and previewing Sol’s ending. Fullscreen is available in the main toolbar. Share computer audio so the audience can hear the game.

The [demo checklist and evidence](docs/game-review/NERDY-DEMO-20260924.md) distinguish completed demo checks from remaining production-art and performance qualifications. The clean demo presentation does not change artwork approval status.
