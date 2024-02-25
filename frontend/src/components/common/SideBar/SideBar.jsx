import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataMenu } from '../Header/Header'
import { Link } from 'react-router-dom'

import { TiHome } from "react-icons/ti";
import { BiMoviePlay } from "react-icons/bi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { MdOutlineManageSearch } from "react-icons/md";

const SideBar = ({ open, toggleSidebar }) => {
    const { appState } = useSelector((state) => state.appState)

    return (
        <Drawer
            open={open}
            onClose={() => toggleSidebar(false)}
            sx={{
                '& .MuiDrawer-Paper': {
                    boxSizing: 'border-box',
                    minWidth: '300px'
                }
            }}>
            <Typography
                textTransform='capitalize'
                sx={{
                    padding: '30px 20px 10px',
                    margin: 0,
                    fontSize: 24,
                    borderBottom: '2px solid #ccc',
                    marginBottom: '10px'

                }}>
                menu
            </Typography>
            <List
                sx={{
                    padding: '0px 30px'
                }}>
                {dataMenu.map(elem => (
                    <ListItemButton

                        key={elem.text}
                        sx={{
                            padding: '5px 15px',
                            marginBottom: '10px',
                            borderRadius: '10px',
                            backgroundColor: appState.includes(elem.state) ? 'primary.main' : 'unset',

                        }}
                        component={Link}
                        to={elem.path}
                        onClick={() => toggleSidebar(false)}>
                        <ListItemIcon
                            sx={{
                                marginRight: '-15px',
                                fontSize: '25px'
                            }}
                        >
                            {elem.text === 'home' && <TiHome />}
                            {elem.text === 'movies' && <BiMoviePlay />}
                            {elem.text === 'tv' && <BiSolidCameraMovie />}
                            {elem.text === 'search' && <MdOutlineManageSearch />}
                        </ListItemIcon>
                        <ListItemText
                            sx={{

                                marginLeft: '0px'
                            }} primary={
                                <Typography textTransform='capitalize'>{elem.text}</Typography>
                            } />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    )
}

export default SideBar