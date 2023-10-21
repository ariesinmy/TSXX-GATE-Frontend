import { useState } from 'react';
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function AppView() {
  const { t, i18n } = useTranslation();
  const rate = 91;

  const [deptAZ, setDeptAZ] = useState("dept1"); // dept1, dept2, dept3, dept4
  const [deptHQ, setDeptHQ] = useState("dept1");

  const handleSelectDeptAZ = (value) => {
    console.log(value)
    setDeptAZ(value);
    // code
  };

  const handleSelectDeptHQ = (value) => {
    console.log(value)
    setDeptHQ(value);
    // code
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t("app.Welcome")} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={t("app.AttendanceCount")}
            total={159}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/fingerprint.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={t("app.LateArrivals")}
            total={12}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/overdue.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={t("app.MachineStatus")}
            total={-1}
            status
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/robot.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={t("app.Contraband")}
            total={5}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/alert.png" />}
          />
        </Grid>

        {/* 出勤概覽 + 員工數量 ============================================================================ */}
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title={t("app.AttendanceOverview")}
            subheader={`${t(`app.Subtitle`)} ${rate}%`}
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: t("app.OnTime"),
                  type: 'line',
                  fill: 'solid',
                  data: [35, 32, 36, 47, 45, 52, 64, 52, 59, 49, 39],
                },
                {
                  name: t("app.Late"),
                  type: 'line',
                  fill: 'solid',
                  data: [30, 21, 14, 29, 22, 43, 21, 41, 15, 27, 43],
                },
                {
                  name: t("app.Early"),
                  type: 'line',
                  fill: 'solid',
                  data: [10, 6, 12, 9, 5, 8, 20, 14, 16, 27, 3],
                },
                // {
                //   name: t("app.Absent"),
                //   type: 'column',
                //   fill: 'solid',
                //   data: [7, 6, 15, 10, 13, 9, 3, 2, 0, 3, 4],
                // },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppConversionRates
            title={t("app.EmployeeCount")}
            chart={{
              series: [
                { label: t("country.Taiwan"), value: 24500 },
                { label: t("country.USA"), value: 10000 },
                { label: t("country.Japan"), value: 19000 },
              ],
            }}
          />
        </Grid>

        {/* AZ 和 HQ 的部門 Chart ============================================================================ */}
        <Grid xs={12} md={6} lg={6}>
          <AppCurrentVisits
            title={t("app.AttendanceChartAZ")}
            chart={{
              series: [
                { label: 'On Time', value: 90 },
                { label: 'Early', value: 20 },
                { label: 'Late', value: 12 },
              ],
            }}
            dept={deptAZ}
            selectDEPT={handleSelectDeptAZ}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AppCurrentVisits
            title={t("app.AttendanceChartHQ")}
            chart={{
              series: [
                { label: 'On Time', value: 40 },
                { label: 'Early', value: 10 },
                { label: 'Late', value: 9 },
              ],
            }}
            dept={deptHQ}
            selectDEPT={handleSelectDeptHQ}
          />
        </Grid>

        {/* 機台的掃描時間曲線圖 + 員工分佈圖 ============================================================================ */}
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title={t("app.ToolScanTime")}
            // subheader={`${t(`app.Subtitle`)} ${rate}%`}
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: "AZ",
                  type: 'line',
                  fill: 'solid',
                  data: [35, 32, 36, 47, 45, 52, 64, 52, 59, 49, 39],
                },
                {
                  name: "HQ",
                  type: 'line',
                  fill: 'solid',
                  data: [30, 21, 14, 29, 22, 43, 21, 41, 15, 27, 43],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title={t("app.EmployeeDistribution")}
            chart={{
              series: [
                { label: 'AT', value: 1844 },
                { label: 'HD', value: 2256 },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={6}>
          <AppCurrentSubject
            title="Attendance Diagram: AZ"
            chart={{
              categories: ["On Time", "Late", "Early", "Contraband"],
              series: [
                { name: 'DEPT1', data: [80, 50, 30, 1] },
                { name: 'DEPT2', data: [50, 30, 20, 2] },
                { name: 'DEPT3', data: [43, 6, 0, 2] },
                { name: 'DEPT4', data: [80, 10, 10, 3] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AppCurrentSubject
            title="Attendance Diagram: HQ"
            chart={{
              categories: ["On Time", "Late", "Early", "Contraband"],
              series: [
                { name: 'DEPT1', data: [50, 30, 20, 2] },
                { name: 'DEPT2', data: [80, 10, 10, 3] },
                { name: 'DEPT3', data: [80, 50, 30, 1] },
                { name: 'DEPT4', data: [43, 6, 0, 2] },
              ],
            }}
          />
        </Grid> */}



        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTasks
            title={t("app.Tasks")}
            list={[
              { id: '1', name: 'Attendance Checking' },
              { id: '2', name: 'Daily Report Generation' },
              { id: '3', name: 'Planning Meeting' },
              { id: '4', name: 'Scoping & Estimations' }
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
