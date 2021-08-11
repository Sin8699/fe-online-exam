// import { useEffect, useState, useCallback } from 'react';
import * as React from 'react';
//icon
import { Icon } from '@iconify/react';
import clockFill from '@iconify/icons-eva/clock-fill';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
// material
import {
  Card,
  Stack,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';

// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function FindExamSubject() {

  return (
    <Page title="Find exam subject">
      {/* Show info subject */}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Search exam subject
          </Typography>
        </Stack>
        <Card>
          <div style={{ paddingTop: "20px" }}>
            <TextField label="Search" />
            <Accordion style={{ marginTop: "20px" }}>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ width: '50%' }}> <b>Tin học 1</b></Typography>
                <Typography align="right" sx={{ width: '50%', color: 'text.secondary' }}>20 Câu hỏi</Typography>
                <Typography align="right" sx={{ width: '20%', color: 'text.secondary' }}> <Icon icon={clockFill} /> 20 phút</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Đề thi 1
                </Typography>
                <Typography>
                  Đề thi 2
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography sx={{ width: '50%' }}> <b>Tin học 2</b></Typography>
                <Typography align="right" sx={{ width: '50%', color: 'text.secondary' }}>20 Câu hỏi</Typography>
                <Typography align="right" sx={{ width: '20%', color: 'text.secondary' }}> <Icon icon={clockFill} /> 20 phút</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Đề thi 1
                </Typography>
                <Typography>
                  Đề thi 2
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Card>
      </Container>
    </Page>
  );
}
