import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

ReportSearch.propTypes = {
  reports: PropTypes.array.isRequired,
};

export default function ReportSearch({ reports }) {
  const { t } = useTranslation();
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: 'body2',
            },
          },
        },
      }}
      options={reports}
      getOptionLabel={(report) => report.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={`${t("report.SearchReport")}...`}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
