// приватний клєнт потребує авторизації тому виконуємо перехоплення та додавання token
import axios from 'axios'
import constConfig from '../../const/constConfig.js'
import { BASE_URL } from '../../const/constConfig.js'
import queryString from 'query-string'

// https://axios-http.com/docs/req_config
const privateUserInstance = axios.create({
    baseURL: BASE_URL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    },

})

// https://axios-http.com/docs/interceptors
privateUserInstance.interceptors.request.use(async function (config) {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('activationToken')}`
        }
    }
}, async function (err) {
    throw err
})

privateUserInstance.interceptors.response.use(function (response) {
    if (response && response.data) {
        return response.data
    }
    return response
}, function (err) {
    throw err.response.data
})

export default privateUserInstance