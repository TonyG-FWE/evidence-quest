import { createRoot } from 'react-dom/client';
import { copy } from './core/content.js';

// The checked bootstrap is replaced by the native shell in TASK11.07.
createRoot(document.getElementById('root')!).render(<main aria-live="polite"><p>{copy('CT.TECH.LOADING')}</p></main>);
