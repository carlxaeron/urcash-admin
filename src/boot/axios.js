import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: process.env.DEV ? process.env.API_URL_DEV : process.env.API_URL
})
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }
