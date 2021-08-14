import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { sentenceCase } from 'change-case';
// material
import {
  Card,
  Menu,
  Table,
  Stack,
  Button,
  Dialog,
  TableRow,
  Snackbar,
  TableCell,
  TableBody,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@material-ui/core';
import MuiAlert from '@material-ui/core/Alert';
// icon
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import slashFill from '@iconify/icons-eva/slash-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Loader from '../components/Loader';
import Scrollbar from '../components/Scrollbar';
import MenuAction from '../components/MenuAction';
import TestKitModal from '../components/Modal/testkit';
import SearchNotFound from '../components/SearchNotFound';
import { TableListHead, TableListToolbar, TablePaginationActions } from '../components/table';
//helper
import useAxios from '../hooks/useAxios';
import { find, get } from 'lodash';
import { renderAction } from '../utils/MenuAction/actionTestKit';
import { getComparator, applySortFilter } from '../utils/filter';
//constant
import TABLE_HEAD from '../constants/TableHead/testkit';
import { TYPE_MODAL } from '../constants/modal';
//api
import { TEST_KIT_LIST } from '../api/test-kit';

//----------------------------------------------------------------

const PositionAlert = { vertical: 'top', horizontal: 'center' };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TestKitManage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [itemSelected, setItemSelected] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [showModal, setShowModal] = useState(false);

  const { response: dataTestKit, loading, fetchData: getTestKit } = useAxios(TEST_KIT_LIST());

  const { dataSagaCourse } = useSelector((state) => state.courseState);
  const { dataSagaSubject } = useSelector((state) => state.subjectState);

  useEffect(() => {
    setData(dataTestKit?.data || []);
  }, [dataTestKit, data]);

  //sort
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  //page table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Alert
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //modal
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    getTestKit();
  }, [getTestKit]);

  const listActions = renderAction({
    onEdit: () => {
      setAnchorEl(null);
      setTypeModal(TYPE_MODAL.Edit);
      setShowModal(true);
    },
    onDelete: () => {
      setAnchorEl(null);
      setOpen(true);
    },
  });

  const filteredTestKits = applySortFilter(data, getComparator(order, orderBy), filterName, 'userId');
  const isTestKitNotFound = filteredTestKits.length === 0;

  return (
    <Page title="Test Kit | Online Exam-UI">
      <Snackbar anchorOrigin={PositionAlert} key={'top-center'} open={open} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          Forbidden!!!
        </Alert>
      </Snackbar>
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
          <Button
            variant="contained"
            onClick={() => {
              setShowModal(true);
              setItemSelected({});
              setTypeModal(TYPE_MODAL.Create);
            }}
            startIcon={<Icon icon={plusFill} />}
          >
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
                  {loading && (
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Loader />
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading &&
                    filteredTestKits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, userId, description, subjectId, courseId, status } = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell align="left">{String(userId).substr(0, 6)}...</TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">{get(find(dataSagaSubject, { id: subjectId }), 'name')}</TableCell>
                          <TableCell align="left">{get(find(dataSagaCourse, { id: courseId }), 'name')}</TableCell>
                          <TableCell align="left">
                            <Label variant="ghost" color={status === 'closed' ? 'error' : status === 'draft' ? 'warning' : 'success'}>
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={(e) => {
                                setAnchorEl(e.currentTarget);
                                setItemSelected(row);
                              }}
                            >
                              <Icon icon={moreVerticalFill} width={20} height={20} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {isTestKitNotFound && data.length !== 0 && (
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  )}
                  {data.length === 0 && !loading && (
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Icon icon={slashFill} style={{ fontSize: 50 }} />
                        <p style={{ fontSize: 20 }}>No data</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
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
      <Dialog disableEnforceFocus maxWidth="sm" fullWidth open={showModal} onClose={() => setShowModal(false)}>
        <TestKitModal onClose={handleCloseModal} selectedItem={itemSelected} typeModal={typeModal} />
      </Dialog>
    </Page>
  );
};

export default TestKitManage;
