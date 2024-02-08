import privateUserInstance from "../user/privateUser";
import endpoints from "../endpoints/endpointsConfig";

const commentApi = {
    getListComment: async () => {
        try {
            const response = await privateUserInstance.get(
                endpoints.comment.getListComment
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    addComment: async ({ id, type, title, poster, content }) => {
        try {
            const response = await privateUserInstance.post(
                endpoints.comment.addComment,
                { id, type, title, poster, content }
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    removeComment: async ({id}) => {
        try{
            const response = await privateUserInstance.delete(
                endpoints.comment.removeComment({id})
            )
            return {response}
        }catch (err){
            return {err}
        }
    }
}

export default commentApi