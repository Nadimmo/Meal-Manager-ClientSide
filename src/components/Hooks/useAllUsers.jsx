import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useAllUsers = () => {
    const axiosPublic = useAxiosPublic()
    const {data: allUsers,  refetch} =  useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data
        }
    })

  return {allUsers, refetch}
}

export default useAllUsers