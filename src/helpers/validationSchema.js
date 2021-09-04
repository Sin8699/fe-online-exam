import * as Yup from 'yup'
import { get, set, forEach } from 'lodash'
import dayjs from 'dayjs'

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

const timeValidDateStart = addMinutes(new Date(), 30)

const testkitSchema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  subject: Yup.string().max(50, 'Subject must be at most 50 characters').required('Subject is required'),
  course: Yup.string().max(50, 'Course must be at most 50 characters').required('Course is required'),
  startDate: Yup.date()
    .typeError('Invalid date. Ex: 24/12/2000 05:23 pm(am)')
    .nullable()
    .min(timeValidDateStart, `Start date must be later than ${dayjs(timeValidDateStart).format('DD-MM-YYYY hh:mm a')}`)
    .required('Start date is required'),
  duration: Yup.number()
    .min(10, 'Duration must be greater than or equal to 10')
    .max(180, 'Duration must be less than or equal to 180')
    .required('Duration is required')
})

const extraInfoTestSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  studentId: Yup.string().required('Student ID is required')
})

const schema = {
  testkitSchema,
  extraInfoTestSchema
}

const validateData = (validateChoose, formValue, callback) => {
  return new Promise((resolve, reject) => {
    schema[validateChoose]
      .validate(formValue, { abortEarly: false })
      .then(() => {
        callback && callback(formValue)
        resolve()
      })
      .catch((err) => {
        const listError = get(err, 'inner')
        let errors = {}
        forEach(listError, (error) => {
          set(errors, error.path, get(error, 'errors[0]'))
        })
        reject(errors)
      })
  })
}

export default validateData
