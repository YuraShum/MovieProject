import publicUserInstance from "../user/publicUser";
import endpoints from "../endpoints/endpointsConfig";

const personApi = {
    personDetail: async ({ id }) => {
        try {
            const response = await publicUserInstance.get(
                endpoints.person.personDetail({ id })
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    personMedias: async ({ id }) => {
        try {
            const response = await publicUserInstance.get(
                endpoints.person.personMedias({ id })
            )
            return { response }
        } catch (err) {
            return { err }
        }
    }
}

export default personApi