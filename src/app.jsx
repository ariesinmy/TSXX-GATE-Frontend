/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useState } from 'react';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const [themeMode, setThemeMode] = useState("light");

  return (
      <ThemeProvider themeMode={themeMode}>
        <Router themeMode={themeMode} setThemeMode={setThemeMode} />
      </ThemeProvider>
  );
}
