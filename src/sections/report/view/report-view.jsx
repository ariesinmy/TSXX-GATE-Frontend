import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { reports } from 'src/_mock/report';

import Iconify from 'src/components/iconify';

import PostCard from '../report-card';
import PostSort from '../report-sort';
import PostSearch from '../report-search';

import ReportModal from '../report-modal';
import { useTranslation } from "react-i18next";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

// ----------------------------------------------------------------------


export default function ReportView() {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{t("report.Report")}</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          {t("report.NewReport")}
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch reports={reports} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {reports.map((report, index) => (
          <PostCard key={report.id} report={report} index={index} />
        ))}
      </Grid>

      <ReportModal open={open} handleClose={handleClose}/>
    </Container>
  );
}
