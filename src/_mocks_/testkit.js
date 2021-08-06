import faker from 'faker';

// ----------------------------------------------------------------------

const testkits = [...Array(24)].map((_, index) => ({
  id: String(faker.datatype.uuid()).substr(0, 6) + '...',
  user_id_create: String(faker.datatype.uuid()).substr(0, 6),
  description: faker.commerce.productDescription(),
  subject_id: String(faker.datatype.uuid()).substr(0, 6),
  courses_id: String(faker.datatype.uuid()).substr(0, 6),
}));

export default testkits;
