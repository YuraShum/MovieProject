import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    listFavorite: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload === null) {
                localStorage.removeItem("activationToken")
            } else {
                if (action.payload.token) {
                    localStorage.setItem("activationToken", action.payload.token)
                }
            }
            state.user = action.payload
        },
        setListFavorite: (state, action) => {
            state.listFavorite = action.payload
        },
        removeFromFavorite: (state, action) => {
            const {id} = action.payload
            state.listFavorite = [...state.listFavorite].filter(item => item.id.toString() !== id.toString())
        },
        addToFavorite: (state, action) => {
            state.listFavorite = [action.payload, ...state.listFavorite]
        }
    }
})

export const {setUser, setListFavorite, removeFromFavorite, addToFavorite} = userSlice.actions

export default userSlice.reducer