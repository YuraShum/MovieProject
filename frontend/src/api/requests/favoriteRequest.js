import privateUserInstance from "../user/privateUser";
import endpoints from "../endpoints/endpointsConfig";


const favoriteApi = {
    removeFromFavorite: async ({id}) => {
        try{
            const response = await privateUserInstance.delete(endpoints.favorite.removeFromFavorite({id}))
            return {response}
        }catch(err){
            return {err}
        }
    },
    addToFavorite: async ({id, type, title, poster, rate}) => {
        try{
            const response = await privateUserInstance.post(
                endpoints.favorite.addToFavorite,
                {id, type, title, poster, rate}
            )
            console.log(response)
            return { response }
        }catch (err){
            return {err}
        }
    },
    getFavoritesOfUser: async () => {
        try{
            const response = await privateUserInstance.get(endpoints.favorite.getFavoritesOfUser)
            return {response}
        }catch (err){
            return {err}
        }
    }
}

export default favoriteApi