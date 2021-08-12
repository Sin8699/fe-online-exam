import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Box, Stack, Paper, Divider, Button } from '@material-ui/core';
//icon
import { Icon } from '@iconify/react';
import clockFill from '@iconify/icons-eva/clock-fill';
import questionMarkCircleFill from '@iconify/icons-eva/question-mark-circle-fill';

import { styled } from '@material-ui/core/styles';

const Item = styled(Paper)(({ theme }) => ({ ...theme.typography.body2, textAlign: 'center', color: theme.palette.text.secondary }));

const InfoTestExam = ({ name, subject, countQuestion, time }) => {
  return (
    <Card style={{ margin: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <p>{subject}</p>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Item>
            <Stack direction="row" alignItems="center">
              <Icon icon={questionMarkCircleFill} style={{ marginRight: 10 }} />
              <span>{countQuestion} questions</span>
            </Stack>
          </Item>
          <Item>
            <Stack direction="row" alignItems="center">
              <Icon icon={clockFill} style={{ marginRight: 10 }} />
              <span>{time} minutes</span>
            </Stack>
          </Item>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <p>{name}</p>
        <Button variant="outlined" component={RouterLink} to="/dashboard/test-exam">
          Start test
        </Button>
      </Box>
    </Card>
  );
};

export default InfoTestExam;
