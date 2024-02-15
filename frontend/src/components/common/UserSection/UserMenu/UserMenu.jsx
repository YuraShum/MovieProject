import { ListItemButton, ListItemText, Menu, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../../../../redux/features/user/userSlice'

const dataMenue = [
    {
        text: 'comments',
        path: '/comments',
        state: 'comments'
    },
    {
        text: 'favorites',
        path: '/favorites',
        state: 'favorite'
    },
    {
        text: 'password update',
        path: '/password-update',
        state: 'password.update'
    }

]

const UserMenu = ({ anchorEl, setAnchorEl }) => {
    const dispatch = useDispatch()

    return (
        <Menu
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}>
            {dataMenue.map((item) => (
                <ListItemButton
                    component={Link}
                    to={item.path}
                    key={item.path}
                >
                    <ListItemText primary={
                        <Typography
                            textTransform='capitalize'>
                            {item.text}
                        </Typography>
                    } />
                </ListItemButton>
            ))}
            <ListItemButton
                sx={{
                    borderRadius: '10px',

                }}
                onClick={() => dispatch(setUser(null))}>
                <ListItemText primary={
                    <Typography textTransform='capitalize'>
                        exit
                    </Typography>
                } />
            </ListItemButton>
        </Menu>
    )
}

export default UserMenu