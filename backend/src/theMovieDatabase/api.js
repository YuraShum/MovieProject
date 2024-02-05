import client from '../request/client.js'
import config from './config.js'

const movieDBApi = {
    // приклад: --url 'https://api.themoviedb.org/3/movie/movie_id/lists?language=en-US&page=1'
    list: async ({ type, category, page }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${category}`, { page })
    ),
    // приклад: --url 'https://api.themoviedb.org/3/movie/movie_id?language=en-US' \
    detail: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}`))
    ,
    // приклад:  --url 'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US' \
    videos: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}/videos`))
    ,
    // приклад: --url 'https://api.themoviedb.org/3/genre/movie/list?language=en' \
    genres: async ({ type }) => await client.formingRequest(() =>
        config.getUrlRequest(`genre/${type}/list`))
    ,
    // приклад:  --url 'https://api.themoviedb.org/3/movie/movie_id/credits?language=en-US' \
    informationAboutActors: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}/credits`))
    ,
    // приклад: --url https://api.themoviedb.org/3/movie/movie_id/images \
    images: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}/images`))
    ,
    // приклад: --url 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1' \
    search: async ({ type, query, page }) => await client.formingRequest(() =>
        config.getUrlRequest(`search/${type}`, { query, page }))
    ,
    // приклад:  --url 'https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1' \
    recommend: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}/recommendations`))
    ,
    // приклад: --url 'https://api.themoviedb.org/3/person/person_id?language=en-US' \
    personDetail: async ({ personId }) => await client.formingRequest(() =>
        config.getUrlRequest(`person/${personId}`))
    ,
    // приклад: --url 'https://api.themoviedb.org/3/person/person_id/combined_credits?language=en-US' \
    personMedias: async ({ personId }) => await client.formingRequest(() =>
        config.getUrlRequest(`person/${personId}/combined_credits`))
    
}
export default movieDBApi