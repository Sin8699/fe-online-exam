import { useState, useEffect, useCallback } from 'react';
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
  Dialog,
  Avatar,
} from '@material-ui/core';
// icon
import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import TestModal from '../components/Modal/test';
import MenuAction from '../components/MenuAction';
import SearchNotFound from '../components/SearchNotFound';
import { TableListHead, TableListToolbar, TablePaginationActions } from '../components/table';
//helper
import { renderAction } from '../utils/MenuAction/actionTest';
import { getComparator, applySortFilter } from '../utils/filter';
//constant
import TABLE_HEAD from '../constants/TableHead/test';

//mock_data
import TEST_LIST from '../_mocks_/test';

//----------------------------------------------------------------

const TestUserManager = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('score');
  const [filterName, setFilterName] = useState('');
  const [moreActionSelectedItem, setMoreActionSelectedItem] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const listActions = renderAction({
    onDetail: () => {
      setAnchorEl(null);
      onShowModal();
    },
  });

  const onShowModal = () => {
    setShowModal(true);
    setAnchorEl(null);
  };

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const filteredTests = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isTestUserNotFound = filteredTests.length === 0;

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
            Manage Test User
          </Typography>
        </Stack>

        <Card>
          <TableListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }} style={{ maxHeight: 'calc(100vh - 370px)' }}>
              <Table stickyHeader>
                <TableListHead isSelectedAll={false} order={order} orderBy={orderBy} headLabel={TABLE_HEAD} onRequestSort={handleRequestSort} />
                <TableBody>
                  {filteredTests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, subject, course, avatarUrl, test_kit_id, score } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{subject}</TableCell>
                        <TableCell align="left">{course}</TableCell>
                        <TableCell align="left">{score}</TableCell>
                        <TableCell align="left">{test_kit_id}</TableCell>

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
                {isTestUserNotFound && (
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
      <Dialog disableEnforceFocus maxWidth="md" fullWidth open={showModal} onClose={onCloseModal}>
        <TestModal onClose={onCloseModal} selectedItem={moreActionSelectedItem} />
      </Dialog>
    </Page>
  );
};

export default TestUserManager;
