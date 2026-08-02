import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './styles/global.css';
import './styles/components.css';
import './styles/pages.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
