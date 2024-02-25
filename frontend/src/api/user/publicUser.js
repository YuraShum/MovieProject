import axios from 'axios'
import { BASE_URL } from '../../const/constConfig'
import queryString from 'query-string'


const publicUserInstance = axios.create({
    baseURL: BASE_URL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
})

publicUserInstance.interceptors.request.use(async function (config) {
    console.log(config)
    return {
        ...config,
        headers: {
            "Content-Type": "application/json"
        }
    }
}, async function (err) {
    throw err
})

publicUserInstance.interceptors.response.use(function (response) {
    if (response && response.data) {
        return response.data
    }
    return response
}, function (err) {
    throw err.response.data
})

export default publicUserInstance