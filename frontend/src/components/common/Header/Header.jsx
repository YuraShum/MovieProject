import React, { useEffect, useState } from 'react'
import Conteiner from '../Conteiner/Conteiner'
import { AppBar, Box, IconButton, Stack, Toolbar, Typography, Button } from '@mui/material'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { themeState } from '../../../styles/theme';
import { setScreenThemeMode } from '../../../redux/features/screenThemeMode/screenThemeModeSlice';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom'
const dataMenu = [
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
    // const themeUi = useTheme()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { appState } = useSelector((state) => state.appState)
    const { screenThemeMode } = useSelector((state) => state.screenThemeMode)

    const hendleSwithTheme = () => {
        const theme = screenThemeMode === themeState.dark ?
            themeState.light :
            themeState.dark

        dispatch(setScreenThemeMode(theme))

    }
    // useEffect(() => {
    //     console.log(themeUi.palette);
    // }, [screenThemeMode]);



    return (
        <header id='header'>
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
                    <Stack
                        direction='row'
                        spacing={2}
                        alignItems='center'>
                        <IconButton
                            sx={{
                                mr: 2,
                                display: { md: 'none' }
                            }}>
                            <GiHamburgerMenu />
                        </IconButton>
                        <Box>
                            <Typography variant='h4'><span style={{ fontWeight: 700 }}>Mo</span>vie</Typography>
                        </Box>


                    </Stack>
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
                                            'primary.contrastText' :
                                            'inherit',
                                        mr: 3
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
                    <IconButton
                        sx={{
                            color: 'white',
                        }}
                        onClick={hendleSwithTheme}>
                        {screenThemeMode === themeState.dark ?
                            <MdLightMode /> : <MdDarkMode />}
                    </IconButton>
                </Toolbar>

            </AppBar>
        </header>

    )
}

export default Header