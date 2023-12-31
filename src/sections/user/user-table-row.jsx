import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function UserTableRow({
  avatarUrl,
  employeeId,
  zone,
  department,
  shiftTime,
  status,
  selected,
  handleClick,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const checkStatus = (userStatus) => {
    if (userStatus === 'arrival') {
      return 'success';
    }
    if (userStatus === 'late') {
      return 'error';
    } 
    return 'warning';
  }
  

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={employeeId} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {employeeId}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{zone}</TableCell>

        <TableCell>{department}</TableCell>

        <TableCell >{shiftTime}</TableCell>

        <TableCell>
          {/* status -> early, arrival, late */}
          <Label color={checkStatus(status)}>{t(`employee.${status}`)}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  zone: PropTypes.any,
  handleClick: PropTypes.func,
  shiftTime: PropTypes.any,
  employeeId: PropTypes.any,
  department: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};