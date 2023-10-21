/* eslint-disable new-cap */
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { reports } from 'src/_mock/report';

import Iconify from 'src/components/iconify';

import ReportCard from '../report-card';
import ReportSort from '../report-sort';
import ReportSearch from '../report-search';

import ReportModal from '../report-modal';
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------


export default function ReportView() {
  const { t } = useTranslation();

  const [reportItems, setReportItems] = React.useState([...reports]);

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
        <ReportSearch reports={reports} />
        <ReportSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {reportItems.map((report, index) => (
          <ReportCard key={report.id} report={report} index={index} />
        ))}
      </Grid>

      <ReportModal open={open} handleClose={handleClose}/>
    </Container>
  );
}
