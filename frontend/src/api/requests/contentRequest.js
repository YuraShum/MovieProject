import publicUserInstance from "../user/publicUser";
import privateUserInstance from "../user/privateUser";
import endpoints from "../endpoints/endpointsConfig";

const contentApi = {
    getContentList: async ({ type, category, page }) => {
        console.log({ type, category, page })
        try {
            const response = await publicUserInstance.get(
                endpoints.content.getContentList({ type, category, page })
            )
            console.log("response", response
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    getContentDetail: async ({ type, id }) => {
        try {
            console.log(`type: ${type}, id: ${id}`)
            const response = await privateUserInstance.get(
                endpoints.content.getContentDetail({ type, id })
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    search: async ({ type, query, page }) => {
        console.log({ type, query, page })
        try {
            const response = await publicUserInstance.get(
                endpoints.content.search({ type, query, page })
            )
            return {response}
        } catch (err) {
            return { err }
        }
    }
}
export default contentApi