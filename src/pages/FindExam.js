import * as React from 'react'
import get from 'lodash/get'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import searchFill from '@iconify/icons-eva/search-fill'
import { Stack, Container, Typography, TextField, Button, Card } from '@material-ui/core'
import Page from '../components/Page'
import Loader from '../components/Loader'
import Label from '../components/Label'
import axios from '../api/config'

export default function FindExamSubject() {
  const navigate = useNavigate()
  const [codeTest, setCodeTest] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [infoTestKit, setInfoTestKit] = React.useState()
  const [canExam, setCanExam] = React.useState(false)
  const [notStart, setNotStarted] = React.useState(false)
  const [ended, setEnded] = React.useState(false)

  React.useEffect(() => {
    const examNotStart = dayjs().isBefore(dayjs(get(infoTestKit, 'startDate')))
    const examHasEnd = dayjs().isAfter(dayjs(get(infoTestKit, 'startDate')).minute(get(infoTestKit, 'duration')))
    setNotStarted(examNotStart)
    setEnded(examHasEnd)
    setCanExam(examNotStart === false && examHasEnd === false)
  }, [infoTestKit])

  const handleCode = (e) => {
    setCodeTest(e.target.value)
  }

  const handleGetTestKit = () => {
    setLoading(true)
    axios
      .get(`test-kit/info-to-test/${codeTest}`)
      .then((res) => setInfoTestKit(res?.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  const handleStartTest = () => {
    navigate(`/dashboard/test-exam/${codeTest}`)
  }

  return (
    <Page title="Test Exam">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Tìm kiếm đề thi
          </Typography>
        </Stack>
        <Stack spacing={1} alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h3">Code</Typography>
          <TextField type="number" onChange={handleCode} />
          <Button variant="contained" startIcon={<Icon icon={searchFill} />} onClick={handleGetTestKit}>
            Tìm kiếm
          </Button>
          {loading && <Loader />}
          {loading === false && infoTestKit && (
            <Card sx={{ p: 3 }} style={{ minWidth: '80%' }}>
              <Stack spacing={1} alignItems="center" justifyContent="center">
                <Typography variant="h5">Học kì: {infoTestKit.course}</Typography>
                <Typography variant="h2">Môn học: {infoTestKit.subject}</Typography>
                <Typography variant="subtitle1">Mô tả: {infoTestKit.description}</Typography>
                <Typography variant="h5">Ngày bắt đầu:</Typography>
                <Label variant="ghost" color={canExam ? 'success' : 'error'}>
                  <Typography variant="h5">{dayjs(infoTestKit.startDate).format('DD-MM-YYYY')}</Typography>
                </Label>
                <Typography variant="h5">Giờ bắt đầu:</Typography>
                <Label variant="ghost" color={canExam ? 'success' : 'error'}>
                  <Typography variant="h5">{dayjs(infoTestKit.startDate).format('HH:mm')}</Typography>
                </Label>
                <Typography variant="h5">Thời gian: {infoTestKit.duration} phút</Typography>
                <Typography variant="h5">Trạng thái</Typography>
                <Button variant="contained" disabled={!canExam} onClick={handleStartTest}>
                  {notStart && 'Bài thi chưa bắt đầu'}
                  {ended && 'Bài thi đã kết thúc'}
                  {canExam && 'Bắt đầu thi'}
                </Button>
              </Stack>
            </Card>
          )}
        </Stack>
      </Container>
    </Page>
  )
}
