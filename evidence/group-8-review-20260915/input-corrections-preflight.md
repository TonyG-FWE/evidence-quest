# Final input corrections: independent review preparation

Two defects became visible during the full Chromium run. The failed 33-case partial run and its screenshots/traces remain preserved by the implementation task. This note does not claim the corrective tests or final full run have passed.

## G8-N03: unavailable bridge inputs during rope collection

The bakery fixture clicked a named post while Pip's rope pickup was still active. The serialized model correctly refused a conflicting world mutation, but the displayed construction buttons were still enabled, so the click appeared available and produced no placement preview. The native initial route had also required waiting and retrying a premature post click.

The source correction applies the existing action/view/background `disabled` condition to collecting, selecting, post preview, nudging, rotating, placing, joining, fastening and releasing. Reading, Help and Back retain their existing routes. Check that the controls visibly disable during the actual pickup, become usable after it finishes, and then create and commit a real post placement with the same two ropes. No animation speed, state transition or acceptance limit changes are needed.

## G8-N04: delayed reader entry focus

The keyboard fixture opened Grandma's letter through the backpack and immediately pressed Tab. Reader content was present before the delayed animation-frame callback established entry focus. The next key could therefore begin from the wrong control.

The source correction establishes the existing focus target in a layout effect before the new reader is painted. The immediate-Tab test is unchanged. Check the opening Close control, Tab to Help, nested Help return, Back to the backpack's Read control and Back to the world Backpack control. Also confirm an existing completed save still reopens and retains its exact stories.

## Review boundaries

These changes affect `GardenApp.tsx`; canonical words, story events, the domain/save model and world artwork remain separate unchanged inputs. The prior full native usual/Pip/open-draft playthrough and roof/construction framing receipts retain their original candidate scope. A current supplemental native input/focus check, fresh Node 24 handler matrix, unchanged-source comparison and final ordinary browser routes will bind the corrected candidate. Preserve every earlier receipt and failure.
