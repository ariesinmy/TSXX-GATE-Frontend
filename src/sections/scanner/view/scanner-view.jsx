import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { scanners } from 'src/_mock/scanner';

import ScannerCard from '../scanner-card';
import ScannerSort from '../scanner-sort';
import ScannerFilters from '../scanner-filters';
import ScannerUpload from '../scanner-upload';

import Divider from '@mui/material/Divider';

// ----------------------------------------------------------------------

export default function ScannerView() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Scanner
      </Typography>

      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 3 }}>
        <ScannerUpload />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 1 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ScannerFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ScannerSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {scanners.map((scanner) => (
          <Grid key={scanner.id} xs={12} sm={6} md={3}>
            <ScannerCard scanItem={scanner} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
