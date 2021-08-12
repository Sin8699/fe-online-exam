import { useState } from 'react';
import { remove } from 'lodash';
import { useParams } from 'react-router-dom';
// material
import { styled } from '@material-ui/styles';
import { Card, Stack, Container, Typography, Grid, TextField, Radio, Button, IconButton, MenuItem } from '@material-ui/core';
// icon
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import navigationOutline from '@iconify/icons-eva/navigation-outline';

// components
import Page from '../components/Page';
import Loader from '../components/Loader';

//helper
import useAxios from '../hooks/useAxios';
//api
import { SUBJECT_LIST } from '../api/subject';
import { COURSE_LIST } from '../api/course';

const GridItem = styled(Grid)({ display: 'flex', alignItems: 'center' });
const ButtonAddNew = styled(Button)({ margin: 10 });

//----------------------------------------------------------------

const EditTestKitForm = () => {
  const { slug } = useParams();
  console.log('slug: ', slug);

  const { response: subjects, loading: loadingSubjectList } = useAxios(SUBJECT_LIST());
  const { response: courses, loading: loadingCourseList } = useAxios(COURSE_LIST());
  const isLoading = loadingSubjectList && loadingCourseList;

  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState('');
  const [questions, setQuestions] = useState([]);
  const [description, setDescription] = useState('');

  const handleAddNew = () => {
    setQuestions([
      ...questions,
      {
        title: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer: 0,
      },
    ]);
  };

  const handleDeleteQuestion = (indexDelete) => {
    const evens = remove(questions, function (n, i) {
      return i !== indexDelete;
    });
    setQuestions(evens);
  };

  const handleChangeRadio = (indexQuestions) => (event) => {
    const questionsUpdate = [...questions];
    questionsUpdate[indexQuestions].answer = +event.target.value;
    setQuestions(questionsUpdate);
  };

  const handleChangeAnswer = (key, indexQuestions) => (event) => {
    const questionsUpdate = [...questions];
    questionsUpdate[indexQuestions][key] = event.target.value;
    setQuestions(questionsUpdate);
  };

  const handleSubmit = () => {};

  return (
    <Page title="New Test Kit">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Test Kit {slug}
          </Typography>
          <Button variant="contained" color="secondary" startIcon={<Icon icon={navigationOutline} />} onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
        {isLoading ? (
          <div style={{ width: '100%' }}>
            <Loader />
          </div>
        ) : (
          <Grid container spacing={2} style={{ padding: 10 }}>
            <GridItem item xs={12}>
              <TextField label="Description" multiline fullWidth maxRows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
            </GridItem>
            <GridItem item xs={6}>
              <TextField fullWidth label="Subject" onChange={(e) => setSubject(e.target.value)} value={subject} select>
                {(subjects?.data || []).map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </GridItem>
            <GridItem item xs={6}>
              <TextField fullWidth label="Course" onChange={(e) => setCourse(e.target.value)} value={course} select>
                {(courses?.data || []).map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </GridItem>
          </Grid>
        )}

        {questions.map((item, index) => (
          <Card key={index} style={{ marginTop: 10 }}>
            <Grid container spacing={2} style={{ padding: 10 }}>
              <GridItem item xs={12}>
                <TextField fullWidth label={`Question ${index + 1}`} onChange={handleChangeAnswer('title', index)} />
                <IconButton style={{ margin: '0 5px' }} onClick={() => handleDeleteQuestion(index)}>
                  <Icon icon={trash2Fill} />
                </IconButton>
              </GridItem>
              <GridItem item xs={6}>
                <Radio value={0} checked={item.answer === 0} onChange={handleChangeRadio(index)} />
                <TextField fullWidth label="Answer 1" onChange={handleChangeAnswer('answer1', index)} />
              </GridItem>
              <GridItem item xs={6}>
                <Radio value={1} checked={item.answer === 1} onChange={handleChangeRadio(index)} />
                <TextField fullWidth label="Answer 2" onChange={handleChangeAnswer('answer2', index)} />
              </GridItem>
              <GridItem item xs={6}>
                <Radio value={2} checked={item.answer === 2} onChange={handleChangeRadio(index)} />
                <TextField fullWidth label="Answer 3" onChange={handleChangeAnswer('answer3', index)} />
              </GridItem>
              <GridItem item xs={6}>
                <Radio value={3} checked={item.answer === 3} onChange={handleChangeRadio(index)} />
                <TextField fullWidth label="Answer 4" onChange={handleChangeAnswer('answer4', index)} />
              </GridItem>
            </Grid>
          </Card>
        ))}
        <div style={{ textAlign: 'right' }}>
          <ButtonAddNew variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleAddNew}>
            Add new question
          </ButtonAddNew>
        </div>
      </Container>
    </Page>
  );
};

export default EditTestKitForm;
