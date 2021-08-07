import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  IconButton,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Menu,
  Button,
} from '@material-ui/core';
// icon
import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import MenuAction from '../components/MenuAction';
import DialogConfirmAction from '../components/ConfirmAction';
import SearchNotFound from '../components/SearchNotFound';
import { TableListHead, TableListToolbar, TablePaginationActions } from '../components/table';
//helper
import { renderAction } from '../utils/MenuAction/actionTestKit';
import { getComparator, applySortFilter } from '../utils/filter';
//constant
import TABLE_HEAD from '../constants/TableHead/testkit';

//mock_data
import TEST_LIST from '../_mocks_/testkit';

//----------------------------------------------------------------

const TestKitManage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [moreActionSelectedItem, setMoreActionSelectedItem] = useState({});
  console.log('moreActionSelectedItem: ', moreActionSelectedItem);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const getData = () => {
    setData(TEST_LIST);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const onSuccess = () => {
    getData();
  };

  const handleDelete = () => {
    onSuccess();
  };

  const listActions = renderAction({
    onEdit: () => {
      setAnchorEl(null);
    },
    onDelete: () => {
      setAnchorEl(null);
      setConfirmDelete(true);
    },
  });

  const filteredTestKits = applySortFilter(data, getComparator(order, orderBy), filterName, 'user_id_create');

  const isUserNotFound = filteredTestKits.length === 0;

  return (
    <Page title="Manage Test">
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { width: 160, maxWidth: '100%' } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {anchorEl && <MenuAction listActions={listActions} />}
      </Menu>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Manage Test kit
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/new-testkit" startIcon={<Icon icon={plusFill} />}>
            New Test kit
          </Button>
        </Stack>

        <Card>
          <TableListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }} style={{ maxHeight: 'calc(100vh - 370px)' }}>
              <Table stickyHeader>
                <TableListHead isSelectedAll={false} order={order} orderBy={orderBy} headLabel={TABLE_HEAD} onRequestSort={handleRequestSort} />
                <TableBody>
                  {filteredTestKits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, user_id_create, description, subject_id, courses_id } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{user_id_create}</TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="left">{subject_id}</TableCell>
                        <TableCell align="left">{courses_id}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={(e) => {
                              setAnchorEl(e.currentTarget);
                              setMoreActionSelectedItem(row);
                            }}
                          >
                            <Icon icon={moreVerticalFill} width={20} height={20} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{ inputProps: { 'aria-label': 'rows per page' }, native: true }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Card>
      </Container>
      <DialogConfirmAction open={confirmDelete} onClose={() => setConfirmDelete(false)} onSubmit={handleDelete} />
    </Page>
  );
};

export default TestKitManage;
