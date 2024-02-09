import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../features/user/userSlice'
import selectIsLoadingSlice from '../features/selectIsLoading/selectIsLoadingSlice'
import screenThemeModeSlice from '../features/screenThemeMode/screenThemeModeSlice'
import authUserModalSlice from '../features/authUserModal/authUserModalSlice'
import appStateSlice from '../features/appState/appStateSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        selectIsLoading: selectIsLoadingSlice,
        screenThemeMode: screenThemeModeSlice,
        authUserModal: authUserModalSlice,
        appState: appStateSlice
    },
})