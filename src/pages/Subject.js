import { useEffect, useState, useCallback } from 'react';
//icon
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import slashFill from '@iconify/icons-eva/slash-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Card,
  Menu,
  Table,
  Stack,
  Dialog,
  Button,
  TableRow,
  Container,
  TableBody,
  TableCell,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Loader from '../components/Loader';
import Scrollbar from '../components/Scrollbar';
import MenuAction from '../components/MenuAction';
import SubjectModal from '../components/Modal/subject';
import SearchNotFound from '../components/SearchNotFound';
import DialogConfirmAction from '../components/ConfirmAction';
import { TableListHead, TableListToolbar } from '../components/table';
//helpers
import useAxios from '../hooks/useAxios';
import { getComparator, applySortFilter } from '../utils/filter';
import { renderAction } from '../utils/MenuAction/actionSubject';
//constant
import { TYPE_MODAL } from '../constants/modal';
import TABLE_HEAD from '../constants/TableHead/subject';
//api
import { SUBJECT_LIST, DELETE_SUBJECT } from '../api/subject';

// ----------------------------------------------------------------------

export default function Subject() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [itemSelected, setItemSelected] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { response, loading, fetchData: getData } = useAxios(SUBJECT_LIST(), true);

  useEffect(() => {
    setData(response?.data || []);
  }, [response, data]);

  const onSuccess = async () => {
    await getData();
  };

  const onShowModal = (type) => {
    setShowModal(true);
    setAnchorEl(null);
    setTypeModal(type);
  };

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const { loading: deleteLoading, fetchData: deleteSubject } = useAxios(DELETE_SUBJECT(itemSelected?.id), false);
  const handleDelete = async () => {
    const code = await deleteSubject();
    setConfirmDelete(false);
    if (code === 0) onSuccess();
  };

  const listActions = renderAction({
    onEdit: () => {
      setAnchorEl(null);
      onShowModal(TYPE_MODAL.Edit);
    },
    onDelete: () => {
      setAnchorEl(null);
      setConfirmDelete(true);
    },
  });

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

  const filteredSubjects = applySortFilter(data, getComparator(order, orderBy), filterName);
  const isSubjectNotFound = filteredSubjects.length === 0;

  return (
    <Page title="Dashboard: Subject | Online Exam-UI">
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
            Manage Subject
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => {
              onShowModal(TYPE_MODAL.Create);
              setItemSelected();
            }}
          >
            New Subject
          </Button>
        </Stack>

        <Card>
          <TableListToolbar filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }} style={{ maxHeight: 'calc(100vh - 370px)' }}>
              <Table>
                <TableListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} onRequestSort={handleRequestSort} />

                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Loader />
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading &&
                    filteredSubjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, name, description } = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{description}</TableCell>
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
                  {isSubjectNotFound && data.length !== 0 && (
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
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Dialog disableEnforceFocus maxWidth="sm" fullWidth open={showModal} onClose={onCloseModal}>
        <SubjectModal onClose={onCloseModal} onSuccess={onSuccess} typeModal={typeModal} selectedItem={itemSelected} />
      </Dialog>
      <DialogConfirmAction open={confirmDelete} onClose={() => setConfirmDelete(false)} onSubmit={handleDelete} isLoading={deleteLoading} />
    </Page>
  );
}
