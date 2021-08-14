// material
import { Container, Typography, Card } from '@material-ui/core';
// components
import Page from '../components/Page';
import TemplateClientTest from '../components/templateExam';
import DisplayTimer from '../components/TimerDisplay';

// ----------------------------------------------------------------------

export default function TestExam() {
  return (
    <Page title="Online Exam-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Online Exam-UI | Làm bài thi
        </Typography>
        <DisplayTimer time={60 * 60} />
        <Card>
          <TemplateClientTest />
        </Card>
      </Container>
    </Page>
  );
}
