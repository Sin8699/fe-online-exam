/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
// material
import { Stack, Container, Typography, Button, ButtonGroup, Dialog } from '@material-ui/core'
// icon
import { Icon } from '@iconify/react'
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill'
import radioButtonOnFill from '@iconify/icons-eva/radio-button-on-fill'
import checkmarkSquare2Fill from '@iconify/icons-eva/checkmark-square-2-fill'
// components
import Page from '../components/Page'
import Loader from '../components/Loader'
import QuestionDetail from '../components/Question'
import ModalQuestion from '../components/Modal/question'
//api
import axiosInstance from '../api/config'
import useAxios from '../hooks/useAxios'
import { GET_QUESTIONS_BY_TEST_KIT } from '../api/question'
// constants
import { TYPE_MODAL } from '../constants/modal'
import { TYPE_QUESTION } from '../constants/type-question'

//----------------------------------------------------------------

const EditTestKitForm = () => {
  const { slug } = useParams()

  const [data, setData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState()
  const [typeQuestion, setTypeQuestion] = useState()
  const [itemSelected, setItemSelected] = useState({})

  const {
    response: resDataQuestion,
    loading: loadingData,
    fetchData: getQuestions
  } = useAxios(GET_QUESTIONS_BY_TEST_KIT(slug))

  useEffect(() => {
    setData(resDataQuestion?.data || [])
  }, [resDataQuestion])

  useEffect(() => {
    getQuestions()
  }, [slug])

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const onSuccessAction = () => {
    getQuestions()
    setOpenModal(false)
  }

  const handleNewQuestionSingle = () => {
    setOpenModal(true)
    setTypeModal(TYPE_MODAL.Create)
    setTypeQuestion(TYPE_QUESTION.SINGLE)
  }

  const handleNewQuestionMultiple = () => {
    setOpenModal(true)
    setTypeModal(TYPE_MODAL.Create)
    setTypeQuestion(TYPE_QUESTION.MULTIPLE)
  }

  const handleEditQuestion = (item) => {
    setOpenModal(true)
    setTypeModal(TYPE_MODAL.Edit)
    setTypeQuestion(item.type)
    setItemSelected(item)
  }

  const handleDeleteQuestion = (item) => {
    const { id } = item
    axiosInstance
      .delete(`questions/${id}?testkitid=${slug}`)
      .then(() => getQuestions())
      .catch((err) => console.log(err))
  }

  return (
    <Page title="Edit Test Kit">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Icon icon={arrowIosBackFill} />}
            component={RouterLink}
            to="/dashboard/testkit"
          >
            Back
          </Button>
          <Typography variant="h4" gutterBottom>
            Test Kit Code {slug}
          </Typography>
        </Stack>
        {loadingData && data.length === 0 && <Loader />}
        {(data || []).map((item) => (
          <QuestionDetail
            key={item.id}
            question={item}
            onEdit={() => handleEditQuestion(item)}
            onDelete={() => handleDeleteQuestion(item)}
          />
        ))}
        <Stack justifyContent="flex-end" alignItems="center" style={{ margin: '20px 10px 20px 0' }}>
          <Typography variant="h4" style={{ marginRight: 5, color: '#00AB55' }}>
            New question
          </Typography>
          <ButtonGroup variant="outlined">
            <Button startIcon={<Icon icon={radioButtonOnFill} />} onClick={handleNewQuestionSingle}>
              single
            </Button>
            <Button endIcon={<Icon icon={checkmarkSquare2Fill} />} onClick={handleNewQuestionMultiple}>
              multiple
            </Button>
          </ButtonGroup>
        </Stack>
      </Container>
      <Dialog disableEnforceFocus maxWidth="sm" fullWidth open={openModal} onClose={handleCloseModal}>
        <ModalQuestion
          selectedItem={itemSelected}
          typeModal={typeModal}
          typeQuestion={typeQuestion}
          onClose={handleCloseModal}
          onSuccess={onSuccessAction}
        />
      </Dialog>
    </Page>
  )
}

export default EditTestKitForm
