import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const tests = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  subject: sample(['Maths', 'Physics', 'Chemistry', 'Biology', 'Geography', 'Information Technology', 'Fine Art', 'Literature', 'History', 'Music']),
  course: sample(['HKI-2021', 'HKII-2021', 'HKIII-2021']),
  test_kit_id: String(faker.datatype.uuid()).substr(0, 6),
  score: sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  test_kit_question: [...Array(10)].map((_) => ({
    id: faker.datatype.uuid(),
    question_id: faker.datatype.uuid(),
    question_mark: 1,
    title: faker.name.title(),
    choices: ['answer 1', 'answer 2', 'answer 3', 'answer 4'],
    answerCorrect: sample([0, 1, 2, 3]),
    answerUser: sample([0, 1, 2, 3]),
  })),
}));

export default tests;
