const endpoints = {
    user: {
        userSignIn: 'user/signin',
        userSignUp:'user/signup',
        getUserInformation: 'user/information',
        paswordUpdate: 'user/update-password'

    },
    person: {
        personDetail: ({id}) => `person/${id}`,
        personMedias: ({id}) => `person/${id}/medias`
    },
    content: {
        getContentList: ({type, category, page}) => `${type}/${category}?page=${page}`,
        getContentDetail: ({type, id}) => `${type}/detail/${id}`,
        search: ({ type, query, page }) => `${type}/search?query=${query}&page=${page}`
    },
    favorite:{
        removeFromFavorite: ({id}) => `user/favorites/${id}`,
        addToFavorite: 'user/favorites',
        getFavoritesOfUser: 'user/favorites'
    },
    genre:{
        list: ({type}) => `${type}/genres`
    }

}

export default endpoints