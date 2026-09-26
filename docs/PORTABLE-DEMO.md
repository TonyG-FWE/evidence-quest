# Play Evidence Quest

The portable demo contains the game, recorded voices and its own Node runtime. It needs a supported desktop computer and a current browser with WebGL2. After downloading and extracting it, authored play works offline. No Node installation, build commands or API keys are needed.

## Start

Download the archive for your computer from the repository's **Releases** page once the reviewed release is published. PR workflow artifacts are review candidates, not a published release. Extract the entire archive before starting.

For a PR review artifact, first extract GitHub's outer ZIP, then extract the platform archive inside it. The checksum and test report sit beside that archive. Review artifacts expire after 14 days; they are not permanent download links.

| Computer | Archive | Launcher |
| --- | --- | --- |
| Windows 10/11, Intel or AMD 64-bit | `win32-x64.zip` | Double-click **Start Evidence Quest.cmd** |
| Mac with Apple Silicon (M1 or newer), macOS 13.5+ | `darwin-arm64.tar.gz` | Double-click **Start Evidence Quest.command** |
| Intel Mac, macOS 13.5+ | `darwin-x64.tar.gz` | Double-click **Start Evidence Quest.command** |
| Linux x64 with glibc 2.28+, a desktop and a current browser | `linux-x64.tar.gz` | Run **Start Evidence Quest.sh**; file managers may call this **Run as a program** |

Archive names also contain the source commit. macOS and Linux archives preserve executable permissions. Linux terminal fallback: `./'Start Evidence Quest.sh'` from the extracted folder. These are portable launchers, not signed app installers.

For the first launch, use the download from this repository and approve only the expected launcher/runtime:

- **Windows:** an unrecognized-download prompt may offer **Run anyway**. Use that option only after confirming the source. Some managed-computer policies prevent continuation. [Microsoft's explanation](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation).
- **macOS:** if the launcher or bundled `node` is blocked as an unknown developer, try opening it once, then go to **System Settings → Privacy & Security → Open Anyway** for that file and confirm **Open**. [Apple's instructions](https://support.apple.com/en-us/102445).
- **Approval unavailable:** use a permitted computer or ask its administrator. Windows Smart App Control has no per-app exception; these launch instructions do not require disabling it or other system protections. [Microsoft's explanation](https://support.microsoft.com/en-us/windows/security/threat-malware-protection/smart-app-control-frequently-asked-questions).

The launcher checks the package, starts its local server and opens **http://127.0.0.1:4364/garden**. Choose **Begin Pip’s adventure**, then **Start playing**. Keep the launcher window open. Press **Ctrl+C** there to stop; closing the browser alone does not stop the server. The game is served only on your own computer.

## What is included

Explore, repair the bridge, deliver and plant the seed, help at the bakery, read and write, and continue through the gathering and finale. Included recordings support narration, conversations and word help. Reading practice can record and replay your microphone locally when you grant browser permission.

This portable edition uses authored content. Live Sol feedback, AI speech assessment and generated narration of new custom writing are unavailable. It does not contact those services or use credentials configured on your computer. The source repository retains separately documented optional-service configuration.

Progress remains in this browser's local storage at the fixed game address. Use the same browser and address when returning. Microphone permission and recordings are browser-controlled; simulated microphone checks are not evidence of acceptance on every microphone.

## If something does not open

- **Browser did not open:** open the printed address yourself in a current browser with WebGL2 enabled.
- **Port 4364 is in use:** stop your earlier game from its launcher window, then try again. The launcher never stops another process.
- **Package file missing or changed:** extract a fresh copy to a new folder. Do not merge old and new package folders.
- **Microphone unavailable:** allow this local site to use your microphone and check the browser's input device. Listening and the adventure remain available without recording.
- **Poor graphics performance:** close other graphics-heavy apps and use a computer/browser supporting hardware-accelerated WebGL2. Existing performance qualification gaps remain; packaging does not establish universal device support.

Current pronunciation limitations and development qualification gaps remain documented in the source repository. These downloads preserve the demo; they do not represent production qualification.

## Package identity

`portable-manifest.json` records the source commit, platform, bundled runtime and file hashes. The adjacent `.sha256` download identifies the whole archive. Node notices are in `runtime/LICENSE`, other dependency notices remain in `licenses/`, the bundled frontend notices and `node_modules/`.

Maintainers publish only after PR review and merge, using the manual **Portable demo** workflow on `main` with **Publish reviewed release** enabled. That run rebuilds and tests every platform at the selected main commit before creating the release. It does not merge a PR. Standard PR runs upload candidate archives, checksums and test results only.

The native runner matrix checks extraction, launchers, offline rendered startup, audio, simulated microphone recording/replay, restart, occupied ports and file integrity. Full recorded-voice journey acceptance is a separate check on a computer with working graphics. Before publishing a changed game, run `test:portable` with `EQ_PORTABLE_JOURNEY=1` and retain its archive hash and journey report for review. In PowerShell, set `$env:EQ_PORTABLE_JOURNEY='1'` before `npm run test:portable`; in a POSIX shell, run `EQ_PORTABLE_JOURNEY=1 npm run test:portable`.

The September 26 Windows package completed that full offline journey locally. Hosted Windows and Linux full-journey attempts failed the existing movement checks; the Linux capture showed the graphics-recovery screen. These failures remain recorded as runner/graphics qualification gaps. The matrix does not claim full gameplay or performance acceptance on every platform.
