export default favoriteUtils = {
    check: (listFavorites, id) => listFavorites && listFavorites.find(favorite =>
        favorite.id.toString() === id.toString()) !== undefined
}