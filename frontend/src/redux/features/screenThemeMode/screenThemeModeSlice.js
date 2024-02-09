import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeMode: 'dark'
}

export const screenThemeModeSlice = createSlice({
    name: 'screenThemeMode',
    initialState,
    reducers: {
        setScreenThemeMode: (state, action) => {
            state.themeMode = action.payload
        }
    }
    
})

export const {setScreenThemeMode} = screenThemeModeSlice.actions

export default screenThemeModeSlice.reducer