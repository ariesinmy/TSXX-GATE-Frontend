/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';

import { useTranslation } from "react-i18next";
import axios from 'axios';

// ----------------------------------------------------------------------

export default function AppView() {
  const { t, i18n } = useTranslation();
  const rate = 91;

  const [deptAZ, setDeptAZ] = useState("dept1"); // dept1, dept2, dept3, dept4
  const [deptHQ, setDeptHQ] = useState("dept1");

  const [scanRecordAZ, setScanRecordAZ] = useState([]); // [{zone: string, timeStamp: }]
  const [scanRecordHQ, setScanRecordHQ] = useState([]);

  const [attendanceDataList, setAttendanceDataList] = useState([]);


  useEffect(() => {
    // 定义日期范围
    const startTimestamp = Math.floor(new Date('2023-09-11').getTime() / 1000) - (8 * 3600); // 减去8小时的秒数
    const endTimestamp = Math.floor(new Date('2023-09-23').getTime() / 1000) - (8 * 3600); // 减去8小时的秒数
    const apiEndpoint = `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/enterRecord/totalLateDistributed`;
    
    // 构建时间戳数组
    const timestampArray = [];
    let currentTimestamp = startTimestamp;
    while (currentTimestamp < endTimestamp) {
      timestampArray.push(currentTimestamp);
      currentTimestamp += 86400; // 增加一天的秒数
    }
    
    // 发起API请求并整合结果
    const fetchData = async () => {
      try {
        const responsePromises = timestampArray.map(async (timestamp) => {
          const response = await axios.get(apiEndpoint, {
            params: {
              start_timestamp: timestamp,
              end_timestamp: timestamp + 86400,
            },
          });
          return response.data; // 假设API响应是一个对象
        });
        
        const responses = await Promise.all(responsePromises);
        console.log(responses);
        setAttendanceDataList(responses);
      } catch (error) {
        console.error(`API请求失败：${error}`);
      }
    };

    const fetchMachineRecordData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/machineRecord/?start_timestamp=1670189220&end_timestamp=1695345420`);
        const data = response.data;

        // 先將 data 依照 timeStamp 由舊到新做排序
        data.sort((a, b) => a.timestamp - b.timestamp);

        // 使用 reduce 函數將數據分為 "AZ" 和 "HQ"，同時計算每天的 toolScanTime 總和和計數
        const resultAZ = data.reduce((acc, record) => {
          if (record.zone === 'AZ') {
            const date = new Date(record.timestamp * 1000); // 將秒數轉換為毫秒
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            
            if (!acc[formattedDate]) {
              acc[formattedDate] = { total: 0, count: 0 };
            }

            acc[formattedDate].total += record.toolScanTime;
            acc[formattedDate].count++;
          }
          return acc;
        }, {});

        const resultHQ = data.reduce((acc, record) => {
          if (record.zone === 'HQ') {
            const date = new Date(record.timestamp * 1000); // 將秒數轉換為毫秒
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

            if (!acc[formattedDate]) {
              acc[formattedDate] = { total: 0, count: 0 };
            }

            acc[formattedDate].total += record.toolScanTime;
            acc[formattedDate].count++;
          }
          return acc;
        }, {});

        // 計算每天的平均值
        // eslint-disable-next-line no-restricted-syntax
        for (const date in resultAZ) {
          resultAZ[date].average = (resultAZ[date].total / resultAZ[date].count).toFixed(2);
        }

        for (const date in resultHQ) {
          resultHQ[date].average = (resultHQ[date].total / resultHQ[date].count).toFixed(2);
        }

        // 更新狀態變數
        setScanRecordAZ(resultAZ);
        setScanRecordHQ(resultHQ);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMachineRecordData();
    
    fetchData();
  }, []);


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

  const getAttendTotal = () => {
    const lastEle = attendanceDataList[attendanceDataList.length - 1];
    return lastEle.theNumberOfEarly + lastEle.theNumberOfOnTime + lastEle.theNumberOfLate
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t("app.Welcome")} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title={t("app.AttendanceCount")}
            total={attendanceDataList.length > 0 ? getAttendTotal() : 0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/fingerprint.png" />}
            itemType="number"
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title={t("app.LateArrivals")}
            total={attendanceDataList.length > 0 ? attendanceDataList[attendanceDataList.length - 1].theNumberOfLate : 0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/overdue.png" />}
            itemType="number"
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title={t("app.MachineStatus")}
            total={-1}
            status
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/robot.png" />}
          />
        </Grid>

        {/* 出勤概覽 + 員工數量 ============================================================================ */}
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title={t("app.AttendanceOverview")}
            // subheader={`${t(`app.Subtitle`)} ${rate}%`}
            chart={{
              labels: [
                '09/12/2023',
                '09/13/2023',
                '09/14/2023',
                '09/15/2023',
                '09/16/2023',
                '09/17/2023',
                '09/18/2023',
                '09/19/2023',
                '09/20/2023',
                '09/21/2023',
                '09/22/2023',
              ],
              series: [
                {
                  name: t("app.OnTime"),
                  type: 'line',
                  fill: 'solid',
                  data: attendanceDataList.map(item => item.theNumberOfOnTime),
                },
                {
                  name: t("app.Late"),
                  type: 'line',
                  fill: 'solid',
                  data: attendanceDataList.map(item => item.theNumberOfLate),
                },
                {
                  name: t("app.Early"),
                  type: 'line',
                  fill: 'solid',
                  data: attendanceDataList.map(item => item.theNumberOfEarly),
                },
              ]
            }}
            chartType="attendance"
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
                { label: `${t("app.OnTime")}`, value: 90 },
                { label: `${t("app.Late")}`, value: 20 },
                { label: `${t("app.Early")}`, value: 12 },
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
                { label: `${t("app.OnTime")}`, value: 40 },
                { label: `${t("app.Late")}`, value: 10 },
                { label: `${t("app.Early")}`, value: 9 },
              ],
            }}
            dept={deptHQ}
            selectDEPT={handleSelectDeptHQ}
          />
        </Grid>

        {/* 機台的掃描時間曲線圖 + 員工分佈圖 ============================================================================ */}
        <Grid xs={12} md={6} lg={12}>
          <AppWebsiteVisits
            title={t("app.ToolScanTime")}
            // subheader={`${t(`app.Subtitle`)} ${rate}%`}
            chart={{
              labels: Object.keys(scanRecordHQ),
              series: [
                {
                  name: "AZ",
                  type: 'line',
                  fill: 'solid',
                  data: Object.keys(scanRecordHQ).map(date => scanRecordAZ[date]?.average || null),
                },
                {
                  name: "HQ",
                  type: 'line',
                  fill: 'solid',
                  data: Object.keys(scanRecordHQ).map(date => scanRecordHQ[date].average),
                },
              ],
            }}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
