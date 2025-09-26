import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import 'simplebar-react/dist/simplebar.min.css';
import './assets/tailwind.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
