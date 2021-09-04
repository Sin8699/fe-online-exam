import React, { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
// material
import {
  Card,
  Menu,
  Table,
  Stack,
  Button,
  Dialog,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination
} from '@material-ui/core'
// icon
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import slashFill from '@iconify/icons-eva/slash-fill'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
// components
import Page from '../components/Page'
import Scrollbar from '../components/Scrollbar'
import MenuAction from '../components/MenuAction'
import Loader from '../components/Loader'
import TestKitModal from '../components/Modal/testkit'
import SearchNotFound from '../components/SearchNotFound'
import { TableListHead, TableListToolbar, TablePaginationActions } from '../components/table'
//helper
import useAxios from '../hooks/useAxios'
import { renderAction } from '../utils/MenuAction/actionTestKit'
import { getComparator, applySortFilter } from '../utils/filter'
import { toast } from 'react-toastify'
//constant
import TABLE_HEAD from '../constants/TableHead/testkit'
import { TYPE_MODAL } from '../constants/modal'
//api
import { TEST_KIT_LIST } from '../api/test-kit'

//----------------------------------------------------------------

const TestKitManage = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [filterName, setFilterName] = useState('')
  const [itemSelected, setItemSelected] = useState({})
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [anchorEl, setAnchorEl] = useState(null)
  const [typeModal, setTypeModal] = useState()
  const [showModal, setShowModal] = useState(false)

  const { response: dataTestKit, loading: loadingData, fetchData: getTestKit } = useAxios(TEST_KIT_LIST())

  useEffect(() => {
    setData(dataTestKit || [])
  }, [dataTestKit])

  //sort
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  const handleFilterByName = (event) => {
    setFilterName(event.target.value)
  }

  //page table
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  //modal
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const onSuccessAction = () => {
    getTestKit()
    setShowModal(false)
  }

  const listActions = renderAction({
    onEdit: () => {
      setAnchorEl(null)
      setTypeModal(TYPE_MODAL.Edit)
      setShowModal(true)
    },
    onEditQuestion: () => {
      setAnchorEl(null)
      navigate(`/dashboard/edittestkit/${itemSelected.id}`)
    },
    onDelete: () => {
      setAnchorEl(null)
      toast.error('Feature not available')
    }
  })

  const filteredTestKits = applySortFilter(data, getComparator(order, orderBy), filterName, 'course')
  const isTestKitNotFound = filteredTestKits.length === 0

  return (
    <Page title="Test Kit | Online Exam-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Manage Test kit
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setShowModal(true)
              setItemSelected({})
              setTypeModal(TYPE_MODAL.Create)
            }}
            startIcon={<Icon icon={plusFill} />}
          >
            new test kit
          </Button>
        </Stack>

        <Card>
          <TableListToolbar filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }} style={{ maxHeight: 'calc(100vh - 370px)' }}>
              <Table stickyHeader>
                <TableListHead
                  isSelectedAll={false}
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {loadingData && data.length === 0 && (
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Loader />
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredTestKits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, description, subject, course, duration, startDate } = row
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">
                          {String(description).substr(0, 20)} {description.length > 20 ? '...' : ''}
                        </TableCell>
                        <TableCell align="left">{subject}</TableCell>
                        <TableCell align="left">{course}</TableCell>
                        <TableCell align="left">{duration} minutes</TableCell>
                        <TableCell align="left">{dayjs(startDate).format('DD-MM-YYYY HH:mm a')}</TableCell>

                        <TableCell align="right">
                          <IconButton
                            onClick={(e) => {
                              setAnchorEl(e.currentTarget)
                              setItemSelected(row)
                            }}
                          >
                            <Icon icon={moreVerticalFill} width={20} height={20} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {isTestKitNotFound && data.length !== 0 && (
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  )}
                  {data.length === 0 && !loadingData && (
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
      <Dialog disableEnforceFocus maxWidth="sm" fullWidth open={showModal} onClose={handleCloseModal}>
        <TestKitModal
          selectedItem={itemSelected}
          typeModal={typeModal}
          onClose={handleCloseModal}
          onSuccess={onSuccessAction}
        />
      </Dialog>
    </Page>
  )
}

export default TestKitManage
