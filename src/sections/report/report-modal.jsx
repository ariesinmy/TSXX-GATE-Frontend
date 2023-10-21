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

// eslint-disable-next-line react/prop-types
function ReportModal({ open, handleClose }) {
    const { t } = useTranslation();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [selectedReportType, setSelectedReportType] = useState(''); // 初始选择为空

    const handleGenerate = () => {
        // 在这里处理生成报告的逻辑
        console.log(`Generating report of type: ${selectedReportType}`);
    };

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
                            value="Safety Inspection"
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
                <Button variant="contained" onClick={handleGenerate} style={{ width: '100%', marginTop: 20 }}>
                    Generate
                </Button>
            </Box>
        </Modal>
    );
}

export default ReportModal;
