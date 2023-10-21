import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ReportCard({ report, index }) {
  const { cover, title, view, share, avatarUrl, createdAt } = report;

  const latestReportLarge = index === 0;

  const latestReport = index === 1 || index === 2;

  const renderAvatar = (
    <Avatar
      src={avatarUrl}
      sx={{
        width: 32,
        height: 32,
        ...((latestReportLarge || latestReport) && {
          zIndex: 9,
          top: 24,
          left: 24,
          width: 40,
          height: 40,
        }),
      }}
    />
  );

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestReportLarge && { typography: 'h5', height: 60 }),
        ...((latestReportLarge || latestReport) && {
          color: 'common.white',
        }),
      }}
    >
      {title}
    </Link>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        { number: view, icon: 'eva:eye-fill' },
        { number: share, icon: 'eva:share-fill' },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={{
            ...((latestReportLarge || latestReport) && {
              opacity: 0.48,
              color: 'common.white',
            }),
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        color: 'text.disabled',
        ...((latestReportLarge || latestReport) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  return (
    <Grid xs={12} sm={latestReportLarge ? 12 : 6} md={latestReportLarge ? 6 : 3}>
      <Card>
        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestReportLarge || latestReport) && {
              width: 1,
              bottom: 0,
              position: 'absolute',
            }),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            {renderAvatar}
            <Box>{renderDate}</Box>
          </Box>

          {renderTitle}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

ReportCard.propTypes = {
  report: PropTypes.object.isRequired,
  index: PropTypes.number,
};