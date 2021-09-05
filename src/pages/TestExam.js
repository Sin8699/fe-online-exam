import { useState, useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import get from 'lodash/get'
import dayjs from 'dayjs'
import Countdown from 'react-countdown'
import { Container, Typography, Stack, Button, Box } from '@material-ui/core'
import Page from '../components/Page'
import TemplateClientTest from '../components/TemplateExam'
import Loader from '../components/Loader'
import Clock from '../components/Clock'
import { Icon } from '@iconify/react'
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill'
import useAxios from '../hooks/useAxios'
import { CLIENT_TEST } from '../api/client-test'
import { TEST_KIT_DETAIL_FOR_TEST } from '../api/test-kit'

// ----------------------------------------------------------------------
const NotFoundTestKit = () => (
  <Stack alignItems="center" justifyContent="center">
    <Box
      component="img"
      src="/static/illustrations/illustration_404.svg"
      sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
    />
    <Typography variant="h3" align="center" sx={{ mb: 3 }} style={{ color: '#B72136' }}>
      Bài thi không còn khả dụng hoặc không tồn tại
    </Typography>
    <Button
      variant="contained"
      component={RouterLink}
      to="/dashboard/find-exam"
      startIcon={<Icon icon={arrowIosBackFill} />}
    >
      Trở về trang tìm kiếm
    </Button>
  </Stack>
)
// ----------------------------------------------------------------------

export default function TestExam() {
  const { id } = useParams()
  const [canExam, setCanExam] = useState(false)
  const [time, setTime] = useState()

  const { response: infoTest, loading: loadingInfoTest } = useAxios(TEST_KIT_DETAIL_FOR_TEST(id))
  const { response: questions, loading: loadingQuestion, fetchData: getQuestions } = useAxios(CLIENT_TEST(id))

  useEffect(() => {
    const examNotStart = dayjs().isBefore(dayjs(get(infoTest, 'startDate')))
    const timeEnd = dayjs(get(infoTest, 'startDate')).add(get(infoTest, 'duration'), 'm')
    const examHasEnd = dayjs().isAfter(timeEnd)
    const TimeRemaining = timeEnd - dayjs()
    setTime(TimeRemaining)
    setCanExam(examNotStart === false && examHasEnd === false)
  }, [infoTest])

  async function getDataQuestion() {
    const code = await getQuestions()
    return code
  }

  useEffect(() => {
    if (canExam) getDataQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canExam])

  const isOverTime = () => {
    setCanExam(false)
  }

  return (
    <Page title="Online Exam-UI" style={{ marginBottom: 20 }}>
      <Container>
        <Stack>
          {loadingInfoTest || loadingQuestion ? (
            <Typography variant="h3" align="center" sx={{ mb: 3 }}>
              Đang lấy thông tin đề thi
            </Typography>
          ) : (
            canExam && <Countdown date={Date.now() + time} onComplete={isOverTime} renderer={Clock} />
          )}
        </Stack>
        <div style={{ marginTop: 40 }}>
          {(loadingInfoTest || loadingQuestion) && <Loader />}
          {canExam && infoTest && questions && <TemplateClientTest infoTest={infoTest} questions={questions?.data} />}
          {!loadingInfoTest && !canExam && <NotFoundTestKit />}
        </div>
      </Container>
    </Page>
  )
}
