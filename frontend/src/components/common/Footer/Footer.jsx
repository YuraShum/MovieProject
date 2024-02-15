import React from 'react'
import Conteiner from '../Conteiner/Conteiner'
import { Paper, Stack, Typography, useTheme } from '@mui/material'
import { Link } from 'react-scroll'



const Footer = () => {

    const theme = useTheme()
    return (
        <Conteiner >
            <Paper
                square={true}
                elevation={5}
                sx={{
                    padding: '1.5rem'
                }}>
                <Stack
                    alignItems='center'
                    justifyContent='space-between'
                    direction='row'
                    sx={{
                        height: 'max-content'
                    }}

                >

                    <Typography>© 2024 Yurri Shumelchuk</Typography>
                    <Link
                        style={{cursor: 'pointer'}}
                        to='header'
                        smooth={true}
                        spy={true}
                        duration={500}>
                        <Typography variant='h4'><span style={{color: theme.palette.primary.main, fontWeight: 700}}>Mo</span>vie</Typography>
                    </Link>
                </Stack>
            </Paper>
        </Conteiner>
    )
}

export default Footer