import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
export default function ScannerUpload({ onImageUpload }) {
    const handleFileChange = (event) => {
        if (onImageUpload) {
            onImageUpload(event);
        }
    };

    return (
        <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{ width: "270px", height: "250px", fontSize: "1.2rem", borderRadius: "18px" }}
        >
            Upload New Image
            <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
        </Button>
    );
}