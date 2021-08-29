import { useState, useEffect } from 'react'
import { GET_INFO_PROFILE_USER } from '../api/auth'
import useAxios from '../hooks/useAxios'
import { useSelector } from 'react-redux'

const useProfile = () => {
  const { profile: data } = useSelector((state) => state.profileState)
  console.log('data', data)
  const [userInfo, setUserInfo] = useState({})

  const { response: profile, fetchData: getProfileUser } = useAxios(GET_INFO_PROFILE_USER(), false)

  useEffect(() => {
    ;(async function () {
      getProfileUser()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setUserInfo(profile?.data || {})
  }, [profile])

  return [userInfo, setUserInfo]
}

export default useProfile
