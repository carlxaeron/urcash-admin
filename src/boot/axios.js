import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://api.markturtlehouse.dev/api/'
})
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }
