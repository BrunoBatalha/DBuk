import axios from 'axios'

const axiosClient = axios.create({
	baseURL: 'http://192.168.0.37:5000'
})

export { axiosClient }
