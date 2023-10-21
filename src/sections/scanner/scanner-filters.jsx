import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useTranslation } from 'react-i18next';


// ----------------------------------------------------------------------

export const SORT_OPTIONS = [
  { value: 'safety', label: 'Safety' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];
export const ZOOM_OPTIONS = ['AZ', 'HQ'];
export const DEPARTMENT_OPTIONS = [
  'DEPT1',
  'DEPT2',
  'DEPT3',
  'DEPT4',
];
export const DANGER_OPTIONS = [
  'Normal',
  'Warning',
  'Danger',
];

// ----------------------------------------------------------------------

export default function ScannerFilters({ openFilter, onOpenFilter, onCloseFilter }) {
  const {t} = useTranslation();

  const renderZoom = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Zone</Typography>
      <FormGroup>
        {ZOOM_OPTIONS.map((item) => (
          <FormControlLabel key={item} control={<Checkbox />} label={item} />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderDept = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Department</Typography>
      <FormGroup>
        {DEPARTMENT_OPTIONS.map((item) => (
          <FormControlLabel key={item} control={<Checkbox />} label={item} />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderScanningResult = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Scanning Result</Typography>
      <FormGroup>
        {DANGER_OPTIONS.map((item) => (
          <FormControlLabel key={item} control={<Checkbox />} label={item} />
        ))}
      </FormGroup>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        {t("scanner.Filters")}&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            {t("scanner.Filters")}
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderZoom}

            {renderDept}

            {renderScanningResult}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

ScannerFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
