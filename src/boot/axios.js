import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://api.g2g.com/api/'
})
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }
