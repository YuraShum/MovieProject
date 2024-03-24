import React, { useEffect, useState } from 'react'
import { BUILD_POSTER_IMAGE_URL } from '../../../../const/constConfig'
import { Link } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { themeState } from '../../../../styles/theme'

const PeopleItem = ({ content, type }) => {
    const theme = useTheme()
    const [peopleInfo, setPeopleInfo] = useState({
        name: '',
        imgPath: '',
        id: ''
    })
    useEffect(() => {
        setPeopleInfo({
            name: content.name || content.original_name,
            imgPath: `${BUILD_POSTER_IMAGE_URL}${content.profile_path}`,
            id: content.id
        })
    }, [content, type])
    return (

        <Link
        to={`/person/${content.id}`}
        >
            <Box
                sx={{
                    backgroundImage: `url(${peopleInfo.imgPath})`,
                    paddingTop: '150%',
                    position: 'relative',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden'



                }}>
                <Stack
                    spacing={1}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        color: 'primary.text',
                        width: "100%",
                        height: '100%',
                        justifyContent: 'flex-end',
                        '&:hover': {
                            background: `linear-gradient(to top, rgba(${theme.palette.mode === themeState.light ? "256, 256, 256," : "0, 0, 0,"} 0.6), rgba(0, 0, 0, 0))`,
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                        }
                    }}

                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '120%',
                            opacity: 0,
                            transition: 'all 1s ease',
                            transform: 'translateY(90px)',
                            "&:hover": {
                                opacity: 1,
                                transform: 'translateY(0px)',
                            }
                        }}>
                        <Box sx={{
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            padding: '1rem',
                        }}>
                            <Typography variant='h5'>
                                {peopleInfo.name
                                }
                            </Typography>
                            
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Link>
    )
}

export default PeopleItem