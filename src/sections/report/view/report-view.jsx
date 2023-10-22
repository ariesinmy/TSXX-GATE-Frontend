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
import ReportSearch from '../report-search';

import ReportModal from '../report-modal';
import ReportContent from '../report-content';
import { useTranslation } from "react-i18next";
import CircularProgress from '@mui/material/CircularProgress';
import { faker } from '@faker-js/faker';


// ----------------------------------------------------------------------
// export const reports = [...Array(8)].map((_, index) => ({
//   id: faker.string.uuid(),
//   title: REPORT_TITLES[index + 1],
//   createdAt: faker.date.past(),
//   content: "Employee attendance is a critical aspect of any organization's success. It directly impacts productivity, team morale, and, ultimately, the bottom line. Consistent attendance is a sign of commitment and professionalism, and it ensures that we meet our operational goals. Moreover, it minimizes disruptions and maintains a stable work environment.",
//   avatarUrl: `/assets/images/reportAvatars/letter-${REPORT_TITLES[index + 1].includes("Attendance") ? "a" : "s"}.png`,
// }));

export default function ReportView() {
  const { t } = useTranslation();

  const [reportItems, setReportItems] = React.useState([...reports]);
  console.log(reportItems);

  const [open, setOpen] = React.useState(false);
  const [contentOpen, setContentOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [targetId, setTargetId] = React.useState("");
  const handleContentOpen = (reportId) => {
    console.log(reportId)
    setTargetId(reportId);
    setContentOpen(true);
  }

  const handleContentClose = () => {
    console.log("setOpenContentId is null")
    setContentOpen(false);
  }

  const [isLoading, setIsLoading] = React.useState(false);

  const handleNewReportItems = (newReportData) => {
    const newReportItem = {
      id: reportItems.length + 1,
      title: newReportData.title,
      createdAt: newReportData.end_timestamp,
      content: newReportData.content.map( string => string).join(' '),
      avatarUrl: `/assets/images/reportAvatars/letter-${newReportData.title.includes("Attendance") ? "a" : "s"}.png`,
    }
    setReportItems([newReportItem, ...reportItems]);
  }

  const handleDeleteReportItems = (deleteTargetId) => {
    const newReportItems = reportItems.map((report) => {
        if (report.id !== deleteTargetId) {
            return report;
        }
        return null; // or undefined
    }).filter(Boolean); // 过滤掉 null 或 undefined 项

    console.log(newReportItems);
    setReportItems(newReportItems);
}

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{t("report.Report")}</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={isLoading ? <Iconify icon="eva:plus-fill" /> : null}
          onClick={handleOpen}
        >
          {isLoading ? <CircularProgress size="2rem" /> : t("report.NewReport")}
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <ReportSearch reports={reports} />
      </Stack>

      <Grid container spacing={3}>
        {reportItems.map((report, index) => (
          <React.Fragment key={index}>
            <ReportCard key={report.id} report={report} handleSetReportId={handleContentOpen} handleDeleteReportItems={handleDeleteReportItems}/>
          </React.Fragment>
        ))}
      </Grid>
      
      <ReportContent open={contentOpen} handleClose={handleContentClose} targetId={targetId} reportItems={reportItems}/>
      <ReportModal open={open} handleClose={handleClose} isLoading={isLoading} setIsLoading={setIsLoading} handleNewReportItems={handleNewReportItems}/>
    </Container>
  );
}
