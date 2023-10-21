import { useState } from 'react';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'dangerous', label: 'Dangerous' },
  { value: 'safety', label: 'Safety' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'newest', label: 'Newest' },
];

export default function ShopProductSort() {
  const {t} = useTranslation();
  const [sortOption, setSortOption] = useState('newest');
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (newValue) => {
    setSortOption(newValue);
    setOpen(null);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        {t("scanner.SortBy")}:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {t(`scanner.${SORT_OPTIONS.filter(option => option.value === sortOption)[0].label}`)}
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={() => setOpen(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0,
              },
            },
          },
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortOption}
            onClick={() => handleClose(option.value)}
          >
            {t(`scanner.${option.label}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
