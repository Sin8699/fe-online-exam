import React from 'react';
//material
import { DialogTitle, DialogContent, DialogActions, Grid, Button, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/styles';
//icon
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';

const useStyles = makeStyles(() => ({
  itemQuestion: { marginTop: 10, borderRadius: 15 },
  detailItemQuestion: { margin: 5 },
  answerCorrect: { color: '#16b55d' },
  answerWrong: { color: '#ff4842' },
}));
const ModalHeader = styled(DialogTitle)({ padding: 20, fontSize: 18, fontWeight: 600, borderBottom: '1px solid rgb(202, 207, 211)' });
const ModalBody = styled(DialogContent)({ padding: '0 20px 20px 20px' });
const ModalFooter = styled(DialogActions)({ borderTop: '1px solid rgb(202, 207, 211)', padding: '10px 20px' });

const TestModal = ({ onClose, selectedItem }) => {
  const classes = useStyles();
  return (
    <>
      <ModalHeader>
        {selectedItem.name + ' Test'}
        <Icon icon={closeFill} width={24} height={24} style={{ cursor: 'pointer', float: 'right', color: '#CACFD3' }} onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        {(selectedItem?.test_kit_question || []).map((itemSelect, index) => (
          <div
            key={index}
            className={classes.itemQuestion}
            style={{ border: `1px solid ${itemSelect.answerCorrect === itemSelect.answerUser ? '#16b55d' : '#ff4842'}` }}
          >
            <Grid container spacing={1} className={classes.detailItemQuestion}>
              <Grid item xs={12}>
                <b>{`Question ${index + 1} : `}</b>
                {`${itemSelect?.title}`}
              </Grid>
              {(itemSelect?.choices || []).map((choiceValue, index) => {
                const userAnswer = itemSelect?.answerUser;
                const correctAnswer = itemSelect?.answerCorrect;
                const isWrong = userAnswer === index && correctAnswer !== index;
                const isCorrect = correctAnswer === index;
                return (
                  <Grid key={index} item xs={6}>
                    <RadioGroup value={userAnswer}>
                      <FormControlLabel
                        value={index}
                        className={isWrong ? classes.answerWrong : isCorrect ? classes.answerCorrect : 'null'}
                        control={<Radio color={isWrong ? 'error' : 'success'} />}
                        label={choiceValue}
                      />
                    </RadioGroup>
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <b style={{ color: '#16b55d' }}>{`Question correct: `}</b>
                {`${itemSelect?.choices[itemSelect?.answerCorrect]}`}
              </Grid>
            </Grid>
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  );
};

export default React.memo(TestModal);
