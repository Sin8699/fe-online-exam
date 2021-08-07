import faker from 'faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const testkits = [...Array(24)].map((_, index) => ({
  id: String(faker.datatype.uuid()).substr(0, 6) + '...',
  user_id_create: String(faker.datatype.uuid()).substr(0, 6),
  description: faker.commerce.productDescription(),
  subject_id: String(faker.datatype.uuid()).substr(0, 6),
  courses_id: String(faker.datatype.uuid()).substr(0, 6),
  questions: [...Array(24)].map((_, index) => ({
    title: faker.name.title(),
    answer1: 'answer1',
    answer2: 'answer2',
    answer3: 'answer3',
    answer4: 'answer4',
    answer: sample([0, 1, 2, 3]),
  })),
}));

export default testkits;
