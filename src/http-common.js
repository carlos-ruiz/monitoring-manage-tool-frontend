import axios from 'axios'

const axios_instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-type': 'application/json'
  }
})

export default axios_instance

// axios_instance.interceptors.response.use(
//   (response) => {
//     // intercept the global error
//     return response
//   },
//   function(error) {
//     if (error.response.status === 401) {
//       // if the error is 401 and hasent already been retried
//       Vue.$toast.error('Su sesión ha expirado')
//       console.log('Error unauthorized')
//       localStorage.removeItem('logged')
//       localStorage.removeItem('token')
//       setTimeout(() => {
//         window.location = '/'
//       }, 3000)
//       return
//     }
//     return Promise.reject(error)
//   }
// )
