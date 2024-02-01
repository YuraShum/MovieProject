import client from '../request/client.js'
import config from './config.js'

const movieDBApi = {
    list: async ({ type, category, page }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${category}`, { page })
    ),
    detail: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}`))
    ,
    videos: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}/videos`))
    ,
    genres: async ({ type }) => await client.formingRequest(() =>
        config.getUrlRequest(`genre/${type}/list`))
    ,
    informationAboutActors: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}/credits`))
    ,
    images: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}/images`))
    ,
    search: async ({ type, query, page }) => await client.formingRequest(() =>
        config.getUrlRequest(`search/${type}`, { query, page }))
    ,
    recommend: async ({ type, id }) => await client.formingRequest(() =>
        config.getUrlRequest(`${type}/${id}/recommendations`))
    ,
    personDetail: async ({ personId }) => await client.formingRequest(() =>
        config.getUrlRequest(`person/${personId}`))
    ,
    personMedias: async ({ personId }) => await client.formingRequest(() =>
        config.getUrlRequest(`person/${personId}/combined_credits`))
    
}
export default movieDBApi