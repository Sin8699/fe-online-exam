import dayjs from 'dayjs'
export const flattenResTestsByOwner = (tests) => {
  return tests.map((test) => {
    const { extraInfo, status, totalScore, createdAt, User } = test
    const { studentId, fullName } = extraInfo
    const { email } = User
    return {
      createdAt: dayjs(createdAt).format('DD-MM-YYYY HH:mm a'),
      studentId,
      fullName,
      email,
      totalScore,
      status
    }
  })
}
