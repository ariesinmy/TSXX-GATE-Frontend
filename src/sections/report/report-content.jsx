import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "800px",
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
};

// eslint-disable-next-line react/prop-types
function ReportContent({ open, handleClose, targetId, reportItems }) {
    console.log(targetId);
    return (
        targetId ?
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} display='flex-column' justifyContent='center' alignItems='center' >
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant="h6" component="h2" gutterBottom>
                        {reportItems.filter( report => report.id === targetId)[0].title}
                    </Typography>
                </Box>

                <Divider variant="middle" />

                <Box marginY={2}>
                    <Typography variant="body">{reportItems.filter( report => report.id === targetId)[0].content}</Typography>
                </Box>
            </Box>
        </Modal>
        : <></>
    );
}

export default ReportContent;

ReportContent.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    targetId: PropTypes.string,
    reportItems: PropTypes.array.isRequired,
};