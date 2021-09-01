import { useParams } from 'react-router-dom'
// material
import { Container, Typography, Card } from '@material-ui/core'
// components
import Page from '../components/Page'
import TemplateClientTest from '../components/templateExam'

// api
import useAxios from '../hooks/useAxios'
import { CLIENT_TEST } from '../api/client-test'

// ----------------------------------------------------------------------

export default function TestExam() {
  const { slug } = useParams()

  const { response: questions, loading: loadingData } = useAxios(CLIENT_TEST(slug))

  console.log('questions: ', questions)

  return (
    <Page title="Online Exam-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bài thi
        </Typography>
        <Card>
          <TemplateClientTest />
        </Card>
      </Container>
    </Page>
  )
}
