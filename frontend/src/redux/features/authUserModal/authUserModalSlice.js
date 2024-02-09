import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authModalOpen: false
}

export const authUserModalSlice = createSlice({
    name: 'authUserModal',
    initialState,
    reducers: {
        setAuthModalOpen: (state, action) => {
            state.authModalOpen = action.payload
        }
    }
})

export const { setAuthModalOpen } = authUserModalSlice.actions
export default authUserModalSlice.reducer