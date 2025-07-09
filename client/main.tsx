import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Register service worker for push notifications
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Service worker registered:', reg);
      })
      .catch(err => {
        console.error('Service worker registration failed:', err);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />); 