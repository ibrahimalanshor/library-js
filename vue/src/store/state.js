import axios from 'axios'

export default {
  http: axios.create({
    baseURL: 'http://localhost:4000/api'
  })
}