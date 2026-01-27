import axios from 'axios'
import { exp } from 'firebase/firestore/pipelines'
import React from 'react'
export const axiosPublic = axios.create({
  baseURL: 'https://meal-manager-server-side.vercel.app',
})
function useAxiosPublic() {
  return (
    axiosPublic
  )
}

export default useAxiosPublic