import * as React from 'react';

// material
import { Stack, Container, Typography } from '@material-ui/core';

// components
import Page from '../components/Page';
import InfoTestExam from '../components/InfoTestExam';

//mock_data
import DATA_MOCK from '../_mocks_/test-exam';

const FindExamSubject = () => {
  return (
    <Page title="Test Exam">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tìm kiếm đề thi
          </Typography>
        </Stack>
        {DATA_MOCK.map((item) => (
          <InfoTestExam key={item.id} name={item.name} subject={item.subject} countQuestion={item.count_question} time={item.time} />
        ))}
      </Container>
    </Page>
  );
};

export default FindExamSubject;

// ----------------------------------------------------------------------

// export default function FindExamSubject() {

//   return (
//     <Page title="Find exam subject">
//       {/* Show info subject */}
//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//           <Typography variant="h4" gutterBottom>
//             Search exam subject
//           </Typography>
//         </Stack>
//         <Card>
//           <div style={{ paddingTop: "20px" }}>
//             <TextField label="Search" />
//             <Accordion style={{ marginTop: "20px" }}>
//               <AccordionSummary
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//               >
//                 <Typography sx={{ width: '50%' }}> <b>Tin học 1</b></Typography>
//                 <Typography align="right" sx={{ width: '50%', color: 'text.secondary' }}>20 Câu hỏi</Typography>
//                 <Typography align="right" sx={{ width: '20%', color: 'text.secondary' }}> <Icon icon={clockFill} /> 20 phút</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   Đề thi 1
//                 </Typography>
//                 <Typography>
//                   Đề thi 2
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion>
//               <AccordionSummary
//                 aria-controls="panel2a-content"
//                 id="panel2a-header"
//               >
//                 <Typography sx={{ width: '50%' }}> <b>Tin học 2</b></Typography>
//                 <Typography align="right" sx={{ width: '50%', color: 'text.secondary' }}>20 Câu hỏi</Typography>
//                 <Typography align="right" sx={{ width: '20%', color: 'text.secondary' }}> <Icon icon={clockFill} /> 20 phút</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   Đề thi 1
//                 </Typography>
//                 <Typography>
//                   Đề thi 2
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           </div>
//         </Card>
//       </Container>
//     </Page>
//   );
// }
