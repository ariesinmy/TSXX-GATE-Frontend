import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

function MyDialog({ imageSrc, open, handleCloseDialog }) {
  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <img src={imageSrc} alt='' />
    </Dialog>
  );
}

export default function ScannerCard({ scanItem, upload }) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const getStatusColor = (status) => {
    if (status === 'danger') return 'error';
    if (status === 'warning') return 'warning';
    return 'info';
  }

  const renderStatus = (
    <Label
      variant="filled"
      color={getStatusColor(scanItem.status)}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {scanItem.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={scanItem.name}
      src={scanItem.cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <Card>
      <Box
        sx={{ pt: '100%', width: 'auto', height: 'auto', position: 'relative' }}
        style={{ cursor: "pointer" }}
        onClick={handleOpenDialog}
      >
        {scanItem.status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {scanItem.name}
        </Link>
      </Stack>

      <MyDialog imageSrc={scanItem.cover} open={open} handleCloseDialog={handleCloseDialog} />
    </Card>
  );
}

ScannerCard.propTypes = {
  scanItem: PropTypes.object,
  upload: PropTypes.bool,
};

MyDialog.propTypes = {
  imageSrc: PropTypes.string,
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func.isRequired,
};