import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { useTranslation, Trans } from "react-i18next";

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, total, status, icon, color = 'primary', itemType, sx, ...other }) {
  const { t, i18n } = useTranslation();
  
  function fMachineStatus(isGood) {
    return isGood ? t('machine.Good') : t('machine.NeedsRepair');
  }

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        {
          itemType || (total && total >= 0)
          ? (<Typography variant="h4">{fShortenNumber(total) || "Loading..."}</Typography>)
          : (<Typography variant="h4">{
            t("status", fMachineStatus(true))
          }</Typography>)
        }
        <Typography
          variant="h5"
          sx={{ color: 'text.disabled' }}
        >
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  status: PropTypes.bool,
  itemType: PropTypes.string,
};
