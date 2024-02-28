import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../../../../redux/features/user/userSlice'
import { themeState } from '../../../../styles/theme'
import { FaCommentAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoExit } from "react-icons/io5";

const dataMenue = [
    {
        text: 'comments',
        path: '/comments',
        state: 'comments',
        icon: <FaCommentAlt />
    },
    {
        text: 'favorites',
        path: '/favorites',
        state: 'favorite',
        icon: <MdFavorite />
    },
    {
        text: 'password update',
        path: '/password-update',
        state: 'password.update',
        icon: <GrUpdate />
    }

]

const UserMenu = ({ anchorEl, setAnchorEl }) => {

    const dispatch = useDispatch()
    const themeUi = useTheme()
    return (
        <Menu

            sx={{
                zIndex: '111111',
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
        >
            {dataMenue.map((item) => (
                <ListItemButton

                    component={Link}
                    to={item.path}
                    onClick={() => setAnchorEl(null)}
                    key={item.path}
                    sx={{
                        "&:hover": {
                            backgroundColor: `${themeUi.palette.mode === themeState.light ? "#2196f3" : 'secondary.main'}`,
                            color: "white"
                        }
                    }}
                >
                    <ListItemIcon sx={{
                        margin: 0,
                        marginRight: '-20px',
                        fontSize: 22
                    }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography textTransform='capitalize'>
                                {item.text}
                            </Typography>
                        }
                    />
                </ListItemButton>
            ))}
            <ListItemButton
                sx={{
                    "&:hover": {
                        backgroundColor: `${themeUi.palette.mode === themeState.light ? "#2196f3" : 'secondary.main'}`,
                        color: 'white'
                    }
                }}
                onClick={() => dispatch(setUser(null))}
            >
                <ListItemIcon
                    sx={{
                        margin: 0,
                        marginRight: '-20px',
                        fontSize: 22,
                        "&:hover": {
                            color: "white"
                        }
                    }}>
                    <IoExit />
                </ListItemIcon>
                <ListItemText
                    
                    primary={
                        <Typography textTransform='capitalize'>
                            exit
                        </Typography>
                    }
                />
            </ListItemButton>
        </Menu>
    );
}

export default UserMenu