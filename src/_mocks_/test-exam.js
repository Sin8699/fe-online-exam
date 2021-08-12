import faker from 'faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const test_exam = [...Array(24)].map((_) => ({
  id: faker.datatype.uuid(),
  name: faker.name.title(),
  subject: sample(['Maths', 'Physics', 'Chemistry', 'Biology', 'Geography', 'Information Technology', 'Fine Art', 'Literature', 'History', 'Music']),
  count_question: sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  time: sample([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]),
}));

export default test_exam;
