import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
};

const dateInputStyle = {
    width: '85%',
    padding: '8px',
    border:' 1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s'
}

const getLang = (lang) => {
    if (lang === "jp") return "日本語";
    if (lang === "zh") return "繁體中文";
    return "English";
}

// eslint-disable-next-line react/prop-types
function ReportModal({ open, handleClose, setIsLoading, handleNewReportItems }) {
    const { t, i18n } = useTranslation();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [selectedReportType, setSelectedReportType] = useState(''); // 初始选择为空

    // Function to handle generating the report
    const handleGenerate = async () => {
        handleClose();
        // Convert the selected date to timestamps
        const startTimeStamp = new Date(startDate).getTime() / 1000; // Convert to seconds
        const endTimeStamp = new Date(endDate).getTime() / 1000; // Convert to seconds

        // Now you have the selected report type (selectedReportType) and timestamps (startTimeStamp, endTimeStamp).
        // You can use these values in your Axios request.
        console.log('Report Type:', selectedReportType);
        console.log('Start Timestamp:', startTimeStamp);
        console.log('End Timestamp:', endTimeStamp);
        if (selectedReportType && startTimeStamp && endTimeStamp) {
            setIsLoading(true);
        }

        // You can use these values in your Axios request here.
        const data = {
            endTimestamp: endTimeStamp,
            language: getLang(i18n.language),
            startTimestamp: startTimeStamp,
            type: selectedReportType
          }
        const response = await axios({
            method: 'post',
            url: `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/AnalysisServer/report`,
            data
        })
        if (response?.data) {
            const newReportData = response.data; // data.content, data.title
            handleSaveContent(newReportData)
        }
        console.log(response);
    };

    const handleSaveContent = (newReportData) => {
        setIsLoading(false);
        handleNewReportItems(newReportData);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} display='flex-column' justifyContent='center' alignItems='center'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant="h3" component="h2" gutterBottom>
                        {t("report.CreateReport")}
                    </Typography>
                </Box>

                <Divider variant="middle" />

                <Box marginY={2}>
                    <Typography variant="h6">{t("report.ReportType")}</Typography>
                    <RadioGroup
                        name="reportType"
                        value={selectedReportType}
                        onChange={(e) => setSelectedReportType(e.target.value)}
                    >
                        <FormControlLabel
                            value="attendance"
                            control={<Radio color="primary" />}
                            label={t("report.Attendance")}
                        />
                        <FormControlLabel
                            value="machine"
                            control={<Radio color="primary" />}
                            label={t("report.SafetyInspection")}
                        />
                    </RadioGroup>
                </Box>


                <Box marginBottom={2}>
                    <Typography variant="h6">{t("report.StartDate")}</Typography>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={dateInputStyle}
                    />
                </Box>
                <Box marginBottom={1}>
                    <Typography variant="h6">{t("report.EndDate")}</Typography>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={dateInputStyle}
                    />
                </Box >
                <Button variant="contained" onClick={() => handleGenerate()} style={{ width: '100%', marginTop: 20 }}>
                    {t("report.Generate")}
                </Button>
            </Box>
        </Modal>
    );
}

export default ReportModal;
