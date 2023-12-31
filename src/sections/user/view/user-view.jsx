import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

// import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { grey } from 'src/theme/palette';

// users 這裡之後要 call api 使用
// users type: return ({
  // id: faker.string.uuid(),
  // avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  // employeeId,
  // zoom: sample(['AZ', 'HQ']),
  // department: sample([
  //   'DEPT1',
  //   'DEPT2',
  //   'DEPT3',
  //   'DEPT4',
  // ]),
  // shiftTime: sample(['7:30', '8:30', '9:30']),
  // status: sample(['arrival', 'late']),
// })
// ----------------------------------------------------------------------

export default function UserPage() {
  const {t} = useTranslation();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/enterRecord/?start_timestamp=1695225600&end_timestamp=1695312000`);
        const data = response.data;
        const updatedObjList = data.map((obj, index) => ({
            ...obj,
            avatarUrl: `/assets/images/avatars/avatar_${Math.floor(Math.random() * 25) + 1}.jpg`
          }
        ));
        console.log(updatedObjList)
        setUsers(updatedObjList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchEmployeeData();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.employeeId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, employeeId) => {
    const selectedIndex = selected.indexOf(employeeId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, employeeId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    console.log(event.target.value)
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{t("employee.Employees")}</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          {t("employee.NewEmployee")}
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table
              sx={{ width: "100%" }}
            >
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'employeeId', label: t("employee.EmployeeId")},
                  { id: 'zone', label: t("employee.Zone")},
                  { id: 'department', label: t("employee.Department")},
                  { id: 'shiftTime', label: t("employee.ShiftTime")},
                  { id: 'status', label: t("employee.Status")},
                ]}
              />
              <TableBody>
                {users.length === 0 ?
                  <Box sx={{ m: 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress size="5rem" color='grey'/>
                  </Box>:
                dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      avatarUrl={row.avatarUrl}
                      employeeId={row.employeeId}
                      zone={row.zone}
                      department={row.department}
                      shiftTime={row.shiftTime}
                      status={row.status}
                      selected={selected.indexOf(row.employeeId) !== -1}
                      handleClick={(event) => handleClick(event, row.employeeId)}
                    />
                  ))
                }

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
