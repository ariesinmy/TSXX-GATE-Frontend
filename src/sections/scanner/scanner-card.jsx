import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
// import Typography from '@mui/material/Typography';

// import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
// import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

function MyDialog({imageSrc, open, handleCloseDialog}) {
  return (
      <Dialog open={open} onClose={handleCloseDialog}>
        <img src={imageSrc} alt=''/>
      </Dialog>
  );
}

export default function ScannerCard({ scanItem }) {
  // console.log(scanItem);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const renderStatus = (
    <Label
      variant="filled"
      color={(scanItem.status === 'danger' && 'error') || 'info'}
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

  // const renderPrice = (
  //   <Typography variant="subtitle1">
  //     <Typography
  //       component="span"
  //       variant="body1"
  //       sx={{
  //         color: 'text.disabled',
  //         textDecoration: 'line-through',
  //       }}
  //     >
  //       {scanItem.priceSale && fCurrency(scanItem.priceSale)}
  //     </Typography>
  //     &nbsp;
  //     {fCurrency(scanItem.price)}
  //   </Typography>
  // );

  return (
    <Card>
      <Box
        sx={{ pt: '100%', position: 'relative' }}
        style={{cursor: "pointer"}}
        onClick={handleOpenDialog}
      >
        {scanItem.status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {scanItem.name}
        </Link>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={scanItem.colors} />
          {renderPrice}
        </Stack> */}
      </Stack>

      <MyDialog imageSrc={scanItem.cover} open={open} handleCloseDialog={handleCloseDialog} />
    </Card>
  );
}

ScannerCard.propTypes = {
  scanItem: PropTypes.object,
};

MyDialog.propTypes = {
  imageSrc: PropTypes.string,
  open: PropTypes.object,
  handleCloseDialog: PropTypes.func.isRequired,
};