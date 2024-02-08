import endpoints from "../endpoints/endpointsConfig";
import privateUserInstance from '../user/privateUser'
import publicUserInstance from '../user/publicUser'

const userApi = {
    userSignIn: async ({ userName, password }) => {
        try {
            console.log("send request");
            const response = await publicUserInstance.post(
                endpoints.user.userSignIn,
                { userName, password })

            return { response }
        } catch (err) {
            console.log("err")
            return { err }
        }
    },
    userSignUp: async ({ userName, password, confirmPaassword, displayName }) => {
        try {
            const response = await publicUserInstance.post(
                endpoints.user.userSignUp,
                { userName, password, confirmPaassword, displayName }
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    getUserInformation: async () => {
        try {
            const response = await privateUserInstance.get(endpoints.user.getUserInformation)
            return { response }
        } catch (err) {
            return { err }
        }
    },
    passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
        try {
            const response = await privateUserInstance.put(
                endpoints.user.passwordUpdate,
                { password, newPassword, confirmNewPassword }
            )
            return { response }
        } catch (err) {
            return { err }
        }
    }
}

export default userApi