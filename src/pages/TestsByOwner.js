import { useState, useCallback } from 'react'
import dayjs from 'dayjs'
import { sentenceCase } from 'change-case'
import get from 'lodash/get'
import {
  Card,
  Menu,
  Table,
  Stack,
  Dialog,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  OutlinedInput,
  TableContainer,
  TablePagination
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { LoadingButton } from '@material-ui/lab'
import { Icon } from '@iconify/react'
import navigationOutline from '@iconify/icons-eva/navigation-outline'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import slashFill from '@iconify/icons-eva/slash-fill'
import Page from '../components/Page'
import Label from '../components/Label'
import Scrollbar from '../components/Scrollbar'
import TestModal from '../components/Modal/test'
import MenuAction from '../components/MenuAction'
import { TablePaginationActions } from '../components/table'
import { ExportToExcel } from '../components/ExportToExcel'
import { flattenResTestsByOwner } from '../helpers/obj'
import { renderAction } from '../utils/MenuAction/actionTest'
import TABLE_HEAD from '../constants/TableHead/test'
import axios from '../api/config'

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 150,
  margin: 30,
  boxShadow: theme.customShadows.z8,
  '& fieldset': { borderWidth: `1px !important`, borderColor: `${theme.palette.grey[500_32]} !important` }
}))

//----------------------------------------------------------------

const ManagerTestUserByOwner = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [selectedItem, setSelectedItem] = useState({})
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [anchorEl, setAnchorEl] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState()

  const getData = () => {
    setLoading(true)
    axios
      .get(`tests/all?testKitId=${id}`)
      .then((res) => setData(get(res, 'data.data') || []))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  const handleButtonGet = () => {
    getData()
  }

  const onChangeId = (e) => {
    setId(e.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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

  return (
    <Page title="Manage Response Test">
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
            Manage Response Test
          </Typography>
        </Stack>
        <Card>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <div>
              <SearchStyle value={id || ''} onChange={onChangeId} placeholder="Code test kit" type="number" />
              <LoadingButton
                variant="contained"
                loading={loading}
                startIcon={<Icon icon={navigationOutline} />}
                onClick={handleButtonGet}
              >
                Get tests
              </LoadingButton>
            </div>
            <ExportToExcel
              apiData={flattenResTestsByOwner(data)}
              fileName={id}
              disabled={!(id && data && data.length !== 0)}
            />
          </Stack>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }} style={{ maxHeight: 'calc(100vh - 370px)' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((cell) => (
                      <TableCell key={cell.id} align={cell.alignCenter ? 'center' : 'left'}>
                        {cell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(data || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, extraInfo, status, totalScore, testKitId, createdAt, User } = row
                    const { studentId, fullName } = extraInfo
                    const { email } = User
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell align="left">{studentId}</TableCell>
                        <TableCell align="left">{fullName}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color="success">
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell align="center">{totalScore}</TableCell>
                        <TableCell align="center">{testKitId}</TableCell>
                        <TableCell align="left">{dayjs(createdAt).format('DD-MM-YYYY HH:mm a')}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={(e) => {
                              setAnchorEl(e.currentTarget)
                              setSelectedItem(row)
                            }}
                          >
                            <Icon icon={moreVerticalFill} width={20} height={20} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {data.length === 0 && (
                    <TableRow>
                      <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
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
      {showModal && (
        <Dialog disableEnforceFocus maxWidth="md" fullWidth open={showModal} onClose={onCloseModal}>
          <TestModal onClose={onCloseModal} selectedItem={selectedItem} />
        </Dialog>
      )}
    </Page>
  )
}

export default ManagerTestUserByOwner
