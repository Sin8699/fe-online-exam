import React from 'react'
import { useParams } from 'react-router-dom'
//material
import { Button, Checkbox, TextField, Radio, Grid, IconButton } from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import { ModalHeader, ModalBody, ModalFooter } from '../../assets/styled/Modal'
import { GridItemAnswer } from '../../assets/styled/Question'
//icon
import { Icon } from '@iconify/react'
import closeFill from '@iconify/icons-eva/close-fill'
import trash2Fill from '@iconify/icons-eva/trash-2-fill'
//constants
import { TYPE_MODAL } from '../../constants/modal'
import { TYPE_QUESTION } from '../../constants/type-question'
// api
import useAxios from '../../hooks/useAxios'
import { CREATE_QUESTIONS, UPDATE_QUESTIONS } from '../../api/question'

const ModalQuestion = ({ onClose, selectedItem, typeModal, typeQuestion, onSuccess }) => {
  const { slug } = useParams()

  const [formValue, setFormValue] = React.useState({})

  const { fetchData: createQuestion, loading: create_loading } = useAxios(CREATE_QUESTIONS(), false)
  const { fetchData: updateQuestion, loading: update_loading } = useAxios(UPDATE_QUESTIONS(selectedItem?.id), false)

  React.useEffect(() => {
    typeModal === TYPE_MODAL.Edit && setFormValue({ ...selectedItem })
  }, [selectedItem, typeModal])

  const handleAddAnswer = () => {
    const temp = formValue.choices || []
    setFormValue({ ...formValue, choices: [...temp, { is_correct: false, answer: '' }] })
  }
  const handleDeleteAnswer = (indexDelete) => {
    const new_choices = (formValue.choices || []).filter((item, index) => index !== indexDelete)
    setFormValue({ ...formValue, choices: new_choices })
  }

  const handleChangeValue = (key, i) => (e) => {
    switch (key) {
      case 'answer':
        const answerUpdate = formValue.choices.map((element, ind) =>
          ind === i ? { ...element, answer: e.target.value } : element
        )
        setFormValue({ ...formValue, choices: answerUpdate })
        break
      case 'checked':
        const correct = formValue.choices.map((element, ind) =>
          ind === i
            ? { ...element, is_correct: e.target.checked }
            : typeQuestion === TYPE_QUESTION.SINGLE
            ? { ...element, is_correct: false }
            : element
        )
        setFormValue({ ...formValue, choices: correct })
        break
      default:
        setFormValue({ ...formValue, [key]: e.target.value })
        break
    }
  }

  const handleSubmit = async () => {
    const payload = { ...formValue, type: typeQuestion, testKitId: +slug, score: +formValue.score }
    let code
    typeModal === TYPE_MODAL.Create ? (code = await createQuestion(payload)) : (code = await updateQuestion(payload))
    if (code === 0) onSuccess()
  }

  return (
    <>
      <ModalHeader>
        {typeModal === TYPE_MODAL.Edit && `Question code ${selectedItem.id}`}
        {typeModal === TYPE_MODAL.Create && 'New question'}
        <Icon
          icon={closeFill}
          width={24}
          height={24}
          style={{ cursor: 'pointer', float: 'right', color: '#CACFD3' }}
          onClick={onClose}
        />
      </ModalHeader>
      <ModalBody style={{ paddingTop: 17 }}>
        <Grid container style={{ padding: '10px 0' }}>
          <Grid item xs={12}>
            <TextField
              multiline
              maxRows={4}
              value={formValue.title}
              fullWidth
              label="Title"
              onChange={handleChangeValue('title')}
            />
          </Grid>
          {(formValue.choices || []).map((item, index) => (
            <GridItemAnswer item xs={12} key={index}>
              {typeQuestion === TYPE_QUESTION.SINGLE ? (
                <Radio checked={item.is_correct} onChange={handleChangeValue(`checked`, index)} />
              ) : (
                <Checkbox checked={item.is_correct} onChange={handleChangeValue(`checked`, index)} />
              )}
              <TextField value={item.answer} fullWidth margin="dense" onChange={handleChangeValue(`answer`, index)} />
              <IconButton onClick={() => handleDeleteAnswer(index)}>
                <Icon icon={trash2Fill} />
              </IconButton>
            </GridItemAnswer>
          ))}
          <Grid item xs={8} style={{ marginTop: 10 }}>
            <Button variant="contained" onClick={handleAddAnswer}>
              Add answer
            </Button>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              value={formValue.score || ''}
              label="Point"
              fullWidth
              margin="dense"
              onChange={handleChangeValue('score')}
            />
          </Grid>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <LoadingButton
          variant="contained"
          loading={typeModal === TYPE_MODAL.Create ? create_loading : update_loading}
          onClick={handleSubmit}
        >
          {typeModal === TYPE_MODAL.Create ? 'Create' : 'Update'}
        </LoadingButton>
      </ModalFooter>
    </>
  )
}

export default React.memo(ModalQuestion)
