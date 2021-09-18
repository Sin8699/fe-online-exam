import { useState, useEffect, useCallback } from 'react'
import dayjs from 'dayjs'
import { sentenceCase } from 'change-case'
import {
  Card,
  Menu,
  Table,
  Stack,
  Dialog,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination
} from '@material-ui/core'
import { Icon } from '@iconify/react'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import slashFill from '@iconify/icons-eva/slash-fill'
import Page from '../components/Page'
import Label from '../components/Label'
import Loader from '../components/Loader'
import Scrollbar from '../components/Scrollbar'
import TestModal from '../components/Modal/test'
import MenuAction from '../components/MenuAction'
import SearchNotFound from '../components/SearchNotFound'
import { TableListHead, TableListToolbar, TablePaginationActions } from '../components/table'
import { renderAction } from '../utils/MenuAction/actionTest'
import { getComparator, applySortFilter } from '../utils/filter'
import TABLE_HEAD from '../constants/TableHead/test'
import useAxios from '../hooks/useAxios'
import { GET_ALL_CLIENT_TEST } from '../api/client-test'

//----------------------------------------------------------------

const TestUserManager = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('score')
  const [filterName, setFilterName] = useState('')
  const [moreActionSelectedItem, setMoreActionSelectedItem] = useState({})
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [anchorEl, setAnchorEl] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const { response: dataAllTest, loading: loadingData } = useAxios(GET_ALL_CLIENT_TEST())

  useEffect(() => {
    setData(dataAllTest?.data || [])
  }, [dataAllTest])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value)
  }

  const listActions = renderAction({
    onDetail: () => {
      setAnchorEl(null)
      onShowModal()
    }
  })

  const onShowModal = () => {
    setShowModal(true)
    setAnchorEl(null)
  }

  const onCloseModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const filteredTests = applySortFilter(data, getComparator(order, orderBy), filterName, 'extraInfo.studentId')

  const isTestUserNotFound = filteredTests.length === 0

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
            Manage My Test
          </Typography>
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
                  {filteredTests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, extraInfo, status, totalScore, testKitId, createdAt } = row
                    const { studentId, fullName } = extraInfo

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell align="left">{studentId}</TableCell>
                        <TableCell align="left">{fullName}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color="success">
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">{totalScore}</TableCell>
                        <TableCell align="left">{testKitId}</TableCell>
                        <TableCell align="left">{dayjs(createdAt).format('DD-MM-YYYY HH:mm a')}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={(e) => {
                              setAnchorEl(e.currentTarget)
                              setMoreActionSelectedItem(row)
                            }}
                          >
                            <Icon icon={moreVerticalFill} width={20} height={20} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {data.length === 0 && !loadingData && (
                    <TableRow>
                      <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                        <Icon icon={slashFill} style={{ fontSize: 50 }} />
                        <p style={{ fontSize: 20 }}>No data</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                {isTestUserNotFound && data.length !== 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
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
      {showModal && (
        <Dialog disableEnforceFocus maxWidth="md" fullWidth open={showModal} onClose={onCloseModal}>
          <TestModal onClose={onCloseModal} selectedItem={moreActionSelectedItem} />
        </Dialog>
      )}
    </Page>
  )
}

export default TestUserManager
