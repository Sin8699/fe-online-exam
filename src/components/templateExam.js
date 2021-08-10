import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {
  Container,
  Box,
  Button,
  Typography
} from "@material-ui/core";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const listQuestion = [
  {
    id: "1",
    question: "Quản lý yêu cầu phần mềm là gì?",
    answer: ["CauA:..", "CauB: ..."],
  },
  {
    id: "2",
    question: "Quản lý yêu cầu phần mềm là gì?",
    answer: ["CauA:..", "CauB: ..."],
  },
  {
    id: "3",
    question: "Quản lý yêu cầu phần mềm là gì?",
    answer: ["CauA:..", "CauB: ..."],
  },
]

export default function BasicGrid() {

  return (
    <Container fixed>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item>
              <Typography variant="body2" align="left">
                <h2>Môn: Quản lý Yêu cầu phần mềm</h2>
                <h3>Đề thi cuối môn</h3>
              </Typography>
              <Grid item>
                <Typography
                  variant="h6"
                  align="right"
                >
                  Thời gian: <b>29:58</b>
                  <Button variant="contained" sx={{ ml: 2 }}>Nộp bài</Button>
                </Typography>
              </Grid>

              <Grid item align="left">
                <FormControl component="fieldset" align="left">
                  <FormLabel component="legend"><b>Câu 1: Quản lý yêu cầu phần mềm là gì?</b></FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item align="left" >
                <FormControl component="fieldset" align="left" xs={{ mt: 4 }}>
                  <FormLabel component="legend"><b>Câu 2: Quản lý yêu cầu phần mềm là gì?</b></FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item align="left" >
                <FormControl component="fieldset" align="left" xs={{ mt: 4 }}>
                  <FormLabel component="legend"><b>Câu 3: Quản lý yêu cầu phần mềm là gì?</b></FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item align="left" >
                <FormControl component="fieldset" align="left" xs={{ mt: 4 }}>
                  <FormLabel component="legend"><b>Câu 4: Quản lý yêu cầu phần mềm là gì?</b></FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item align="left" >
                <FormControl component="fieldset" align="left" xs={{ mt: 4 }}>
                  <FormLabel component="legend"><b>Câu 2: Quản lý yêu cầu phần mềm là gì?</b></FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item align="left" >
                <FormControl component="fieldset" align="left" xs={{ mt: 4 }}>
                  <FormLabel component="legend"><b>Câu 2: Quản lý yêu cầu phần mềm là gì?</b></FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item align="left" >
                <FormControl component="fieldset" align="left" xs={{ mt: 4 }}>
                  <FormLabel component="legend"><b>Câu 2: Quản lý yêu cầu phần mềm là gì?</b></FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
