import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUserModal: false
}

export const authUserModalSlice = createSlice({
    name: 'authUserModal',
    initialState,
    reducers: {
        setAuthUserModal: (state, action) => {
            state.authUserModal = action.payload
        }
    }
})

export const { setAuthUserModal } = authUserModalSlice.actions
export default authUserModalSlice.reducer