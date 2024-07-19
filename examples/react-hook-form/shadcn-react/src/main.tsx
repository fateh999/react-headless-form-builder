import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import FormBuilderProvider from './form-builder-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FormBuilderProvider>
      <App />
    </FormBuilderProvider>
  </React.StrictMode>,
);
