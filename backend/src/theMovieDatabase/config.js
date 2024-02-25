// Функція для отримання повного URL запиту,
// також всі запити мають відправлятись з використанням api_key
const baseUrl =process.env.TMDB_URL
const key = process.env.TMDB_KEY
const getUrlRequest = (path, params) => {
    const queryString = new URLSearchParams(params)
    return `${baseUrl}${path}?api_key=${key}&${queryString}`
}
export default {getUrlRequest}