import { Helmet } from 'react-helmet-async';

import { ScannerView } from 'src/sections/scanner/view';

// ----------------------------------------------------------------------

export default function ScannerPage() {
  return (
    <>
      <Helmet>
        <title> Scanner | TSXX-Gate </title>
      </Helmet>

      <ScannerView />
    </>
  );
}
