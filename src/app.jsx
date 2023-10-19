/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useMemo, useState } from 'react';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const [themeMode, setThemeMode] = useState("light");
  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       themeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  //     },
  //   }),
  //   [themeMode],
  // );

  return (
      <ThemeProvider themeMode={themeMode}>
        <Router setThemeMode={setThemeMode} />
      </ThemeProvider>
  );
}
