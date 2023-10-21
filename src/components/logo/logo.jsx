import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box component="span" sx={{ width: "auto", height: 40, cursor: 'pointer', ...sx, fontSize: "1.5rem"}}>
      <Typography
        variant="h4"
        sx={{
          color: (theme) => theme.palette.text.primary
        }}
      >
        <strong>
          <span>TSXX</span>
          <span style={{color: "#FF3333"}}>GATE</span>
        </strong>
      </Typography>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
