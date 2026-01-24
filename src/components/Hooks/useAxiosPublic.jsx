import axios from 'axios'
import { exp } from 'firebase/firestore/pipelines'
import React from 'react'
export const axiosPublic = axios.create({
  baseURL: 'http://localhost:5000',
})
function useAxiosPublic() {
  return (
    axiosPublic
  )
}

export default useAxiosPublic