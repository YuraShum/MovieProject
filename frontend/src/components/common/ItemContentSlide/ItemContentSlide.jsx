import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BUILD_POSTER_IMAGE_URL, TYPE } from '../../../const/constConfig'
import { Link } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'
import { themeState } from '../../../styles/theme'
import { useTheme } from '@emotion/react'
import { FaPlay } from "react-icons/fa";



const ItemContentSlide = ({ content, type, genres }) => {
    const theme = useTheme()
    const { listFavorite } = useSelector((state) => state.user)
    const [itemContent, setItemContent] = useState({
        title: '',
        posterPath: '',
        date: null,
        rate: null
    })

    useEffect(() => {
        console.log('content: ', content)
        // console.log('Content Item:', `${BUILD_POSTER_IMAGE_URL}${content.poster_path || content.backdrop_path || content.mediaPoster}`)
        setItemContent({
            title:
            content.title ? 
                content.title?.length > 20 ?
                    content.title?.slice(0, 20) + '...'
                    :
                    content.title
                        :
                        content.name?.length > 20 ?
                        content.name
                            ?.slice(0, 20) + '...'
                        :
                        content.name

            ,
            posterPath: `${BUILD_POSTER_IMAGE_URL}${content.poster_path || content.backdrop_path || content.mediaPoster}`,
            date: `${type === TYPE.movie ? content.release_date?.split('-')[0] : content.first_air_date?.split('-')[0]}`,
            rate: content.vote_avarege || content.mediaRate
        })
    }, [content, type])
    return (
        <Link
            to={`/${type}/${content.id}`}
        >
            <Box
                sx={{
                    backgroundImage: `url(${itemContent.posterPath})`,
                    paddingTop: '150%',
                    position: 'relative',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',



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
                        <Box
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center'
                            }}>
                            <FaPlay size={50} />
                            <Typography textTransform='capitalize'>
                                watch now
                            </Typography>
                        </Box>
                        <Box sx={{
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            padding: '1rem',
                        }}>
                            <Typography variant='h5'>
                                {itemContent.title
                                }
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',


                                }}>
                                <Typography >
                                    {itemContent.date}
                                </Typography>
                                <Typography
                                    sx={{
                                        backgroundColor: `${theme.palette.mode === themeState.light ? 'primary.main' : 'secondary.main'}`,
                                        padding: '3px 8px',
                                        borderRadius: '8px',
                                        color: 'white',

                                    }}>
                                    {genres.find((genre) => genre.id === content.genre_ids[0])?.name?.split(' ')[0]}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Link>
    )
}

export default ItemContentSlide