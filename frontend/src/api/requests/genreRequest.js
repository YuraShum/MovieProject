import publicUserInstance from "../user/publicUser";
import endpoints from "../endpoints/endpointsConfig";

const genreApi = {
    getGenrelist: async ({type}) => {
        try{
            const response = await publicUserInstance.get(
                endpoints.genre.list({type})
            )
            return {response}
        }catch (err){
            return {err}
        }
    }
}
export default genreApi