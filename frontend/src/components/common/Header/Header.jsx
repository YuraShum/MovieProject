import React, { useEffect, useState } from 'react'
import Conteiner from '../Conteiner/Conteiner'
import { setAuthUserModal } from '../../../redux/features/authUserModal/authUserModalSlice'
import { AppBar, Box, IconButton, Stack, Toolbar, Typography, Button } from '@mui/material'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { themeState } from '../../../styles/theme';
import { setScreenThemeMode } from '../../../redux/features/screenThemeMode/screenThemeModeSlice';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom'
import UserSection from '../UserSection/UserSection';
import SideBar from '../SideBar/SideBar';



export const dataMenu = [
    {
        text: 'home',
        path: '/',
        state: 'home'
    },
    {
        text: 'movies',
        path: '/movie',
        state: 'movie'
    },
    {
        text: 'tv',
        path: '/tv',
        state: 'tv'
    },
    {
        text: 'search',
        path: '/search',
        state: 'search'
    },

]

const Header = () => {
    const themeUi = useTheme()
    // const themeUi = useTheme()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { appState } = useSelector((state) => state.appState)
    const { screenThemeMode } = useSelector((state) => state.screenThemeMode)

    const { authUserModal } = useSelector((state) => state.authUserModal)
    useEffect(() => {
        console.log(authUserModal)
    }, [authUserModal])

    const hendleSwithTheme = () => {
        const theme = screenThemeMode === themeState.dark ?
            themeState.light :
            themeState.dark

        dispatch(setScreenThemeMode(theme))

    }
    useEffect(() => {
        console.log(themeUi.palette);
    }, [screenThemeMode]);

    const handleToggleSidebar = () => {
        setSidebarOpen(prevValue => !prevValue)
    }



    return (
        <header id='header'>
            <SideBar open={sidebarOpen} toggleSidebar={handleToggleSidebar} />
            <AppBar
                elevation={3}
                sx={{
                    zIndex: 1111,
                }}>
                <Toolbar
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    {/** menu burder */}
                    <Stack
                        direction='row'
                        spacing={2}
                        alignItems='center'>
                        <IconButton
                            sx={{
                                mr: 2,
                                display: { md: 'none' }
                            }}
                            onClick={handleToggleSidebar}>
                            <GiHamburgerMenu />
                        </IconButton>
                        <Box>
                            <Typography variant='h4'>
                                <span
                                    style={{ fontWeight: 700, color: `${themeUi.palette.mode === themeState.light ? "#131313" : '#2196f3'}` }}
                                >Mo</span>vie
                            </Typography>
                        </Box>


                    </Stack>
                    {/** menu burder */}
                    {/** main menu */}
                    <Box flexGrow={1}
                        alignItems='center'
                        justifyContent='center'
                        display={{ xs: 'none', md: 'flex' }}>
                        <Box>
                            {dataMenu.map((item) => (
                                <Button
                                    key={item.text}
                                    sx={{
                                        color: appState.includes(item.state) ?
                                            screenThemeMode === themeState.light ?
                                                'secondary.main' : 'white' : "white",
                                        mr: 3,
                                        backgroundColor: appState.includes(item.state) ?
                                            screenThemeMode === themeState.light ?
                                                'white' : 'secondary.main' : ""
                                        ,

                                        "&:hover": screenThemeMode === themeState.light ?
                                            {
                                                color: 'primary.main',
                                                backgroundColor: 'white'
                                            } :
                                            {
                                                color: 'white',
                                                backgroundColor: 'secondary.main'
                                            }
                                    }}
                                    component={Link}
                                    to={item.path}

                                    variant={appState.includes(item.state) ? 'contained' : 'text'}
                                >
                                    {item.text}

                                </Button>
                            ))}
                        </Box>

                    </Box>
                    {/** main menu */}
                    <Box>
                        <IconButton
                            sx={{
                                color: 'white',
                                mr: 3
                            }}
                            onClick={hendleSwithTheme}>
                            {screenThemeMode === themeState.dark ?
                                <MdLightMode /> : <MdDarkMode />}
                        </IconButton>
                        {/** user navigation section */}
                        {!user && <Button
                            onClick={() => dispatch(setAuthUserModal(true))}
                            sx={{
                                color: 'white',
                                borderColor: 'white',
                                "&:hover": screenThemeMode === themeState.light ?
                                    {
                                        color: 'primary.main',
                                        backgroundColor: 'white'
                                    }
                                    :
                                    {
                                        borderColor: 'secondary.main',
                                        color: 'white',
                                        backgroundColor: 'secondary.main'
                                    }
                            }}
                            variant='outlined'>
                            <Typography
                            >
                                sign in
                            </Typography>
                        </Button>}
                        {user && <UserSection />}
                        {/** user navigation section */}
                    </Box>

                </Toolbar>

            </AppBar>
        </header>

    )
}

export default Header