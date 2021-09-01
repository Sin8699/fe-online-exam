/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react'
import axios from '../api/config'
import { toast } from 'react-toastify'

const useAxios = ({ url, method, body = null }, autoCallApi = true) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  //code ===0 ==> success
  //code ===1 ==> failure
  const fetchData = useCallback(
    (newBody) => {
      setLoading(true)
      return axios[method](url, newBody)
        .then((res) => {
          const { status, data } = res
          const { message = '' } = data

          if (status === 200 || status === 201) {
            setResponse(res.data)
            return 0
          } else {
            throw new Error(message)
          }
        })
        .catch((err) => {
          setError(err)
          toast.error(err.message, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          })
          return 1
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [method, url]
  )

  useEffect(() => {
    // let controller = new AbortController()
    if (autoCallApi) fetchData(body)
    // return () => controller?.abort()
  }, [autoCallApi, fetchData])

  return { response, error, loading, fetchData }
}

export default useAxios
