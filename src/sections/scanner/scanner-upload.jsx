import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

// eslint-disable-next-line react/prop-types
export default function ScannerUpload({ onImageUpload, isProcessing }) {
    const { t } = useTranslation();
    const handleFileChange = (event) => {
        if (onImageUpload) {
            onImageUpload(event);
        }
    };

    return (
        <Button
            component="label"
            variant="outlined"
            startIcon={isProcessing ? null : <CloudUploadIcon />}
            sx={{ width: "270px", height: "250px", fontSize: "1.2rem", borderRadius: "18px" }}
        >
            {
                isProcessing
                ? <Box sx={{ display: 'flex' }}>
                    <CircularProgress size="5rem" />
                  </Box>
                : t("scanner.UploadNewImage")
            }
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
    );
}