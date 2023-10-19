import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, useState, useEffect } from 'react';

import "./i18n";

import App from './app';

// ----------------------------------------------------------------------

function Root() {
  return (
      <HelmetProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Root />);
