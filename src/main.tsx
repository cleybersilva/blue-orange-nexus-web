import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/i18n.ts' // Import i18n configuration

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, PWA features won't be available
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
