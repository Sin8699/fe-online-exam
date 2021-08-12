// material
import { Container, Typography, Card } from '@material-ui/core';
// components
import Page from '../components/Page';
import TemplateExam from '../components/templateExam';

// ----------------------------------------------------------------------

export default function TestExam() {
  return (
    <Page title="Online Exam-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Online Exam-UI
        </Typography>
        <Card>
          <TemplateExam />
        </Card>
      </Container>
    </Page>
  );
}
