import { useTheme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BUILD_FULL_IMAGE_URL, BUILD_POSTER_IMAGE_URL, TYPE } from '../../../const/constConfig'

import { Box, Button, Stack, Typography } from '@mui/material'
import { themeState } from '../../../styles/theme'
import { FaHeart } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import CircularRate from '../Form/CircularRate/CircularRate'
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { setIsLoading } from '../../../redux/features/selectIsLoading/selectIsLoadingSlice'

const RecommendSection = ({ content, type }) => {
    const dispatch = useDispatch()
    const [genres, setGenres] = useState([])
    const [isOpenRecommend, setIsOpenRecommend] = useState(false)
    const theme = useTheme()
    const { listFavorite } = useSelector((state) => state.user)
    const [itemContent, setItemContent] = useState({
        title: '',
        posterPath: '',
        date: null,
        rate: null,
        id: null
    })

    useEffect(() => {
        console.log('ganres', genres)
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
            rate: content.vote_average || content.mediaRate,
            id: content.id
        })
    }, [content, type])

    useEffect(() => {
        window.scrollTo(0,0)
        setIsOpenRecommend(false)
    }, [content])


    return (
        <Box sx={{
            margin: '0 auto',
            maxWidth: '1300px',
            marginBottom: { xs: '1rem', md: '2rem' },
        }}>
            <Box sx={{
                position: 'relative',
                borderRadius: '1rem',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    zIndex: 0,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)',
                    backgroundImage: `url(${BUILD_FULL_IMAGE_URL}${content.backdrop_path || content.mediaPoster})`,
                },
            }}>
                <Box sx={{
                    position: 'relative',
                    zIndex: 1,
                    color: 'primary.text',
                    padding: { xs: '1rem', md: '2rem' },
                    background: `linear-gradient(to top, rgba(${theme.palette.mode === themeState.light ? "256, 256, 256," : "0, 0, 0,"} 0.6), rgba(0, 0, 0, 0))`,
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                    borderRadius: '1rem',
                }}>
                    {!isOpenRecommend ? (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <RiArrowDropDownLine
                                style={{ cursor: 'pointer' }}
                                onClick={() => setIsOpenRecommend(true)}
                                size={28}
                            />
                            <Typography variant="h5" sx={{ fontWeight: 700, margin: '0 0.5rem' }}>{itemContent.title}</Typography>
                        </Box>
                    ) : (
                        <Box sx={{
                            display: 'flex',
                            gap: '2rem',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                        }}>
                            <img
                                src={itemContent.posterPath}
                                alt=""
                                style={{ maxWidth: '200px' }}
                                height="auto"
                                width="100%" />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'

                            }}>
                                <Typography
                                    variant="h4"
                                    sx={{ paddingTop: '20px', fontWeight: 700 }}>
                                    {itemContent.title}</Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>


                                </Box>
                                <Typography
                                    sx={{
                                        maxWidth: '700px',
                                        marginRight: '1rem'
                                    }}>
                                    {content.overview}</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2rem'
                                }}>
                                    <CircularRate value={itemContent.rate} />
                                    <FaHeart
                                        size={30}
                                        style={{ cursor: 'pointer' }} />
                                </Box>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: 'max-content',
                                        backgroundColor: theme.palette.mode === themeState.light ? '' : '#225792'
                                    }}
                                    component= {Link}
                                    to={`/${type}/${itemContent.id}`}>
                                    Watch Now</Button>
                            </Box>
                        </Box>
                    )}
                    {isOpenRecommend && (
                        <IoClose
                            style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                            onClick={() => setIsOpenRecommend(false)}
                            size={28}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default RecommendSection