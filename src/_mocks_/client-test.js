import faker from 'faker';

const questionsTest = ['1 + 1 = ?', '2 + 2 = ?', '4 + 1 = ?', '5 + 5 = ?', `10 / 2 = ?`, '1 + 1 = ?', '2 + 2 = ?', '4 + 1 = ?', '5 + 5 = ?', '10 / 2 = ?'];

// ----------------------------------------------------------------------

const data = {
  id: faker.datatype.uuid(),
  time: 60 * 60,
  question: [...Array(10)].map((_, index) => ({
    id: faker.datatype.uuid(),
    title: 'Câu ' + (index + 1) + ': ' + questionsTest[index],
    point: 1,
    answers: [...Array(4)].map((_, index) => ({
      id: faker.datatype.uuid(),
      content: 'Câu trả lời ' + (index + 1),
    })),
  })),
};

export default data;
