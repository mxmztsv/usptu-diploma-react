import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {App} from './App';

/**
 * Точка входа. Генерирует автоматически
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Регистрируем ServiceWorker, чтоб приложение могло работать как PWA
serviceWorkerRegistration.register();
