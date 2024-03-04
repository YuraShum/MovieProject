const BASE_URL = 'http://localhost:5000/api/movie'
const BUILD_FULL_IMAGE_URL = 'https://image.tmdb.org/t/p/original'
const BUILD_POSTER_IMAGE_URL  = 'https://image.tmdb.org/t/p/w500'
const BUILD_YOUTUBE_VIDEO_URL = 'https://www.youtube.com/embed/'

const CATEGORY = {
    popular: 'popular',
    top_rated: 'top_rated'
}

const TYPE = {
    tv: 'tv',
    movie: 'movie'
}
const MODAL_AUTH = {
    signin: 'signin',
    signup: 'signup'
}

const FILTER_BUTTON =   [
    'all',
    'Popular movies',
    'Popular TV',
    'Top movies',
    'Top TV',
]
export {
    BASE_URL,
    BUILD_FULL_IMAGE_URL,
    BUILD_POSTER_IMAGE_URL ,
    BUILD_YOUTUBE_VIDEO_URL,
    CATEGORY,
    TYPE,
    MODAL_AUTH,
    FILTER_BUTTON
}