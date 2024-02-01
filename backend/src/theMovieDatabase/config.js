// Функція для отримання повного URL запиту,
// також всі запити мають відправлятись з використанням api_key
const getUrlRequest = (path, params) => {
    const queryString = new URLSearchParams(params)
    return `${process.env.TMDB_URL}${path}?api_key=${process.env.TMDB_KEY}&${queryString}`
}
export default {getUrlRequest}