import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import { useContext } from 'react'
const axiosSecure = axios.create({
  baseURL: 'https://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate  = useNavigate()
    const {logOut} = useContext(AuthContext)
    // Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('access-token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
//   { synchronous: true, runWhen: () => /* This function returns true */}
);


// Add a response interceptor
axios.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = error.response?.status;
    if (status === 401 || status === 403) {
        // logout and redirect to login page
        logOut().then(() => {
            navigate('/login')
        })
    }
    // Do something with response error
    return Promise.reject(error);
  });

  return axiosSecure
}

export default useAxiosSecure