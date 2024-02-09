import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

export const selectIsLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {setIsLoading} = selectIsLoadingSlice.actions
export default selectIsLoadingSlice.reducer