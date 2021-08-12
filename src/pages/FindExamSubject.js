import * as React from 'react';

// material
import { Stack, Container, Typography, IconButton, Autocomplete, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

//icon
import { Icon } from '@iconify/react';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';

// components
import Page from '../components/Page';
import InfoTestExam from '../components/InfoTestExam';
import Loader from '../components/Loader';
import ComboBoxAutoComplete from '../components/AutoComplete';

//api
import useAxios from '../hooks/useAxios';
import { SUBJECT_LIST } from '../api/subject';
import { COURSE_LIST } from '../api/course';

//mock_data
import DATA_MOCK from '../_mocks_/test-exam';

const ButtonScrollToTop = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  right: 20,
  bottom: 10,
  zIndex: 1000,
  backgroundColor: theme.palette.success.dark,
  color: '#fff',
  '&:hover': { backgroundColor: theme.palette.success.dark },
  animation: 'fadeIn ease 1.5s',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));

const FindExamSubject = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [valueSubject, setValueSubject] = React.useState(null);
  const [valueCourse, setValueCourse] = React.useState(null);

  const { response: subjects, loading: loadingSubjectList } = useAxios(SUBJECT_LIST());
  const { response: courses, loading: loadingCourseList } = useAxios(COURSE_LIST());

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Page title="Test Exam">
      {isVisible && (
        <ButtonScrollToTop variant="contained" onClick={handleScrollToTop}>
          <Icon icon={arrowIosUpwardFill} />
        </ButtonScrollToTop>
      )}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tìm kiếm đề thi
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5}>
          {loadingSubjectList && loadingCourseList ? (
            <div style={{ width: '100%', height: 56 }}>
              <Loader />
            </div>
          ) : (
            <>
              <ComboBoxAutoComplete label="Subject" data={subjects?.data} option={valueSubject} onChangeOption={setValueSubject} />
              <ComboBoxAutoComplete label="Course" data={courses?.data} option={valueCourse} onChangeOption={setValueCourse} />
            </>
          )}
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
