import { useState, useEffect } from 'react';
// eslint-disable-next-line perfectionist/sort-imports
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/icons8-english-48.png',
  },
  {
    value: 'zh',
    label: '繁體中文',
    icon: '/assets/icons/icons8-taiwan-flag-48.png',
  },
  {
    value: 'jp',
    label: 'Japanese',
    icon: '/assets/icons/icons8-japan-48.png',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { t, i18n } = useTranslation();

  const [selectedLang, setSelectedLang] = useState(LANGS[0]);
  const [open, setOpen] = useState(null);


  const changeLng = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSelectLanguage = (language) => {
    // event.stopPropagation();
    const newSelectedLang = LANGS.find((item) => item.value === language)
    setSelectedLang(newSelectedLang);
    setOpen(null);
    changeLng(language)
  };

  return (
    <>
      <div key={selectedLang.value}>
        <IconButton
          key={selectedLang.value}
          onClick={handleOpen}
          sx={{
            width: 40,
            height: 40,
            ...(open && {
              bgcolor: 'action.selected',
            }),
          }}
        >
          <img src={selectedLang.icon} alt={selectedLang.label} />
        </IconButton>
      </div>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === selectedLang.value}
            onClick={() => handleSelectLanguage(option.value)}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

LanguagePopover.propTypes = {}