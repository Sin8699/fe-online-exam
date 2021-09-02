import * as React from 'react'
// import { useNavigate } from 'react-router-dom'
//material
import { styled } from '@material-ui/core/styles'
import { LoadingButton } from '@material-ui/lab'
import {
  Box,
  Grid,
  Radio,
  Container,
  Typography,
  Stack,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel
} from '@material-ui/core'
//mock
import data from '../../_mocks_/client-test'

const LabelQuestion = styled(FormLabel)(({ theme }) => ({
  margin: theme.spacing(1),
  color: '#000',
  fontSize: 22,
  fontWeight: 'bold'
}))

export default function TemplateClientTest() {
  //let navigate = useNavigate()

  return (
    <React.Fragment>
      <Container fixed>
        <Box sx={{ flexGrow: 2 }}>
          <Typography variant="h3">Môn: Quản lý Yêu cầu phần mềm</Typography>
          <Typography variant="h5">Đề thi cuối môn</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" sx={{ py: 1 }}>
                  <Typography variant="h6" align="right">
                    Thời gian: 23:59
                  </Typography>
                  <LoadingButton variant="contained" sx={{ ml: 2 }}>
                    Nộp bài
                  </LoadingButton>
                </Stack>
              </Grid>
              {data.question.map((questionItem) => (
                <Grid item xs={12} key={questionItem.id} style={{ marginBottom: 20 }}>
                  <FormControl component="fieldset">
                    <LabelQuestion component="legend">{`${questionItem.title} (${questionItem.point} điểm)`}</LabelQuestion>
                    <RadioGroup aria-label="gender" name="radio-buttons-group">
                      {questionItem.answers.map((answerItem) => (
                        <FormControlLabel
                          key={answerItem.id}
                          value={answerItem.id}
                          control={<Radio />}
                          label={answerItem.content}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  )
}
