
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
//material
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { Box, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Container, Typography, Stack } from '@material-ui/core';
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

//mock
import data from '../_mocks_/client-test';

const LabelQuestion = styled(FormLabel)(({ theme }) => ({ margin: theme.spacing(1), color: '#000', fontSize: 22, fontWeight: 'bold' }));


export default function TemplateClientTest() {
  let navigate = useNavigate();

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [test, setTest] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setSubmitLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [submitLoading]);
  const handleSubmitExam = () => {
    setSubmitLoading(true);
    setTimeout(() => navigate('/dashboard/find-exam-subject'), 3000);
  };
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
                  <LoadingButton variant="contained" sx={{ ml: 2 }} loading={submitLoading} onClick={handleSubmitExam}>
                    Nộp bài
                  </LoadingButton>
                  <LoadingButton onClick={() => setTest(!test)}>test</LoadingButton>
                </Stack>
              </Grid>
              {data.question.map((questionItem) => (
                <Grid item xs={12} key={questionItem.id} style={{ marginBottom: 20 }}>
                  <FormControl component="fieldset">
                    <LabelQuestion component="legend">{`${questionItem.title} (${questionItem.point} điểm)`}</LabelQuestion>
                    <RadioGroup aria-label="gender" name="radio-buttons-group">
                      {questionItem.answers.map((answerItem) => (
                        <FormControlLabel key={answerItem.id} value={answerItem.id} control={<Radio />} label={answerItem.content} />
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
  );
}
