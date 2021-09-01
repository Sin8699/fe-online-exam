// material
import { Card, Typography, Button, ButtonGroup, Box, Divider, Stack, Radio, Checkbox } from '@material-ui/core'
import { Score } from '../../assets/styled/Question'
// icon
import { Icon } from '@iconify/react'
import edit2Fill from '@iconify/icons-eva/edit-2-fill'
import trash2Fill from '@iconify/icons-eva/trash-2-fill'
// constant
import { TYPE_QUESTION } from '../../constants/type-question'

const QuestionDetail = ({ question, onEdit, onDelete }) => {
  const { title, score, type, choices } = question
  return (
    <Card style={{ marginTop: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h4">{title}</Typography>
        <Score>{score} points</Score>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <div>
          {(choices || []).map((itemChoices, index) => {
            const { answer, is_correct } = itemChoices
            return (
              <Stack key={index} direction="row" alignItems="center" md={5}>
                {type === TYPE_QUESTION.SINGLE ? <Radio checked={is_correct} /> : <Checkbox checked={is_correct} />}
                <p>{answer}</p>
              </Stack>
            )
          })}
        </div>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button variant="contained" color="error" startIcon={<Icon icon={trash2Fill} />} onClick={onDelete}></Button>
          <Button variant="contained" color="secondary" endIcon={<Icon icon={edit2Fill} />} onClick={onEdit}>
            Edit
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  )
}

export default QuestionDetail
