import React from 'react'
import { Grid, Button, Radio, Checkbox, Stack, Typography } from '@material-ui/core'
import { ModalHeader, ModalBody, ModalFooter } from '../../assets/styled/Modal'
import { ShowPoint } from '../../assets/styled/Question'
import Loader from '../Loader'
import { Icon } from '@iconify/react'
import closeFill from '@iconify/icons-eva/close-fill'
import { TYPE_QUESTION } from '../../constants/type-question'
import useAxios from '../../hooks/useAxios'
import { GET_DETAIL_CLIENT_TEST } from '../../api/client-test'

const TestModal = ({ onClose, selectedItem }) => {
  const { extraInfo } = selectedItem
  const { response: data, loading: loadingData } = useAxios(GET_DETAIL_CLIENT_TEST(selectedItem.id))

  return (
    <>
      <ModalHeader>
        {extraInfo.studentId + ' - ' + extraInfo.fullName}
        <Icon icon={closeFill} width={24} height={24} style={{ cursor: 'pointer', float: 'right', color: '#CACFD3' }} onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        {loadingData ? (
          <Loader />
        ) : (
          (data || []).map((item) => (
            <div key={item.id} style={{ marginTop: 10, borderRadius: 15, border: '1px solid' }}>
              <Grid container spacing={1} style={{ margin: 5 }}>
                <Grid item xs={12}>
                  <Stack spacing={1} direction="row" alignItems="center">
                    <ShowPoint>{item.Question.score} point</ShowPoint>
                    <Typography variant="h5">{item.Question.title}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  {(item.Question.choices || []).map((itemChoices, index) => {
                    const is_checked = item.answer.includes(index)
                    return (
                      <Stack key={index} direction="row" alignItems="center">
                        {item.Question.type === TYPE_QUESTION.SINGLE ? (
                          <Radio checked={is_checked} disabled />
                        ) : (
                          <Checkbox checked={is_checked} disabled />
                        )}
                        <Typography variant="subtitle1">{itemChoices.answer}</Typography>
                      </Stack>
                    )
                  })}
                </Grid>
              </Grid>
            </div>
          ))
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  )
}

export default React.memo(TestModal)
