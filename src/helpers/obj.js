import dayjs from 'dayjs'
export const flattenResTestsByOwner = (tests) => {
  return tests.map((test) => {
    const { extraInfo, status, totalScore, createdAt, User } = test
    return {
      createdAt: dayjs(createdAt).format('DD-MM-YYYY HH:mm a'),
      studentId: extraInfo?.studentId,
      fullName: extraInfo?.fullName,
      email: User?.email,
      totalScore,
      status
    }
  })
}
