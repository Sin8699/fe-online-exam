import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import { Box, Grid, Card, Stack, Radio, Button, Divider, Checkbox, Container, TextField, Typography } from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import { ShowPoint } from '../../assets/styled/Question'
import DialogNotification from '../Modal/notification'
import { Icon } from '@iconify/react'
import navigation2Fill from '@iconify/icons-eva/navigation-2-fill'
import { TYPE_QUESTION } from '../../constants/type-question'
import validateData from '../../helpers/validationSchema'
import useAxios from '../../hooks/useAxios'
import { SUBMIT_TEST } from '../../api/client-test'

function unique(arr) {
  return Array.from(new Set(arr)) //
}

export default function TemplateClientTest({ infoTest, questions }) {
  const navigate = useNavigate()
  const [extraInfo, setExtraInfo] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [answerUser, setAnswerUser] = React.useState([])
  const [openNotification, setOpenNotification] = React.useState(true)

  const { loading: loadingSubmit, fetchData: submitTest } = useAxios(SUBMIT_TEST(), false)

  const handleChangeInfoExtra = (key) => (e) => {
    setErrors({ ...errors, [key]: false })
    setExtraInfo({ ...extraInfo, [key]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      await validateData('extraInfoTestSchema', extraInfo, async (data) => {
        const dataReq = { fullName: extraInfo.fullName, studentId: extraInfo.studentId, testKitId: infoTest.id, recorded: answerUser }
        const code = await submitTest(dataReq)
        if (code === 0) {
          toast.success('Nộp bài thành công')
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
      })
    } catch (errs) {
      setErrors(errs)
    }
  }

  React.useEffect(() => {
    if (questions) {
      let answerRaw = []
      questions.forEach((element) => {
        answerRaw = [...answerRaw, { questionId: element.id, answer: [] }]
      })
      setAnswerUser(answerRaw)
    }
  }, [questions])

  const handleChangeAnswer = (type, key, i) => (e) => {
    const tempAnswer = answerUser.find((ele) => ele.questionId === key)
    const tempArr = answerUser.filter((item) => item.questionId !== key)
    if (type === TYPE_QUESTION.SINGLE) {
      tempAnswer.answer = [i]
      setAnswerUser([...tempArr, tempAnswer])
    } else {
      e.target.checked
        ? (tempAnswer.answer = unique([...tempAnswer.answer, i]))
        : (tempAnswer.answer = tempAnswer.answer.filter((item) => item !== i))
      setAnswerUser([...tempArr, tempAnswer])
    }
  }

  return (
    <Card>
      {openNotification && (
        <DialogNotification
          open={openNotification}
          title="Hướng dẫn"
          content="Bạn phải chọn nộp bài trước khi đồng hồ đếm về 0. Nếu không nộp, bài thi sẽ không còn được khả dụng và bài làm của bạn sẽ không được ghi lại."
          action={<Button onClick={() => setOpenNotification(false)}>Đã hiểu</Button>}
        />
      )}
      <Container fixed>
        <Box sx={{ flexGrow: 2 }}>
          <Stack justifyContent="space-between" spacing={2} sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h2">{infoTest?.subject}</Typography>
              <LoadingButton variant="contained" startIcon={<Icon icon={navigation2Fill} />} loading={loadingSubmit} onClick={handleSubmit}>
                Nộp bài
              </LoadingButton>
            </Stack>
            <Typography variant="h6">{infoTest.description}</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" spacing={1} sx={{ mt: 3, mb: 3 }}>
            <TextField
              fullWidth
              variant="filled"
              label="Full name"
              onChange={handleChangeInfoExtra('fullName')}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Student ID"
              onChange={handleChangeInfoExtra('studentId')}
              error={Boolean(errors.studentId)}
              helperText={errors.studentId}
            />
          </Stack>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              {(questions || []).map((questionItem, index) => (
                <div key={questionItem.id}>
                  <Grid item xs={12} style={{ marginTop: 20 }}>
                    <Stack spacing={1} direction="row" alignItems="center">
                      <ShowPoint>{questionItem.score} point</ShowPoint>
                      <Typography variant="h5">{questionItem.title}</Typography>
                    </Stack>
                  </Grid>
                  {(questionItem?.choices || []).map((answerItem, index2) => (
                    <Stack key={index2} direction="row" alignItems="center">
                      {questionItem.type === TYPE_QUESTION.SINGLE ? (
                        <Radio
                          checked={
                            get(
                              answerUser.find((ele) => ele.questionId === questionItem.id),
                              'answer[0]'
                            ) === index2
                          }
                          onChange={handleChangeAnswer(questionItem.type, questionItem.id, index2)}
                        />
                      ) : (
                        <Checkbox onChange={handleChangeAnswer(questionItem.type, questionItem.id, index2)} />
                      )}
                      <Typography variant="subtitle1">{answerItem.answer}</Typography>
                    </Stack>
                  ))}
                  <Divider />
                </div>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Card>
  )
}
