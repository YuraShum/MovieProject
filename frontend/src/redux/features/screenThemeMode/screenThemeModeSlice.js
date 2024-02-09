import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenThemeMode: 'dark'
}

export const screenThemeModeSlice = createSlice({
    name: 'screenThemeMode',
    initialState,
    reducers: {
        setScreenThemeMode: (state, action) => {
            state.screenThemeMode = action.payload
        }
    }
    
})

export const {setScreenThemeMode} = screenThemeModeSlice.actions

export default screenThemeModeSlice.reducer