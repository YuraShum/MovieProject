import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { setIsLoading } from '../../../redux/features/selectIsLoading/selectIsLoadingSlice';
import contentApi from '../../../api/requests/contentRequest';
import { toast } from 'react-toastify';
import { Box, Button, Stack, Typography } from '@mui/material';
import { BUILD_FULL_IMAGE_URL, BUILD_POSTER_IMAGE_URL, TYPE } from '../../../const/constConfig';
import { useTheme } from '@emotion/react';
import { themeState } from '../../../styles/theme';
import CircularRate from '../../../components/common/Form/CircularRate/CircularRate';
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';

const ContentDetail = () => {
    const { type, id } = useParams()
    const { user, listFavorite } = useSelector((state) => state.user)
    const [content, setContent] = useState()
    const [isFavorite, setIsFavorite] = useState(false)
    const [onComment, setOnComment] = useState(false)
    const [genres, setGenres] = useState([])

    const dispatch = useDispatch()
    const videoRef = useRef(null)
    const theme = useTheme()
    useEffect(() => {
        console.log("Content variant", content)
    }, [content])

    useEffect(() => {
        const getContent = async () => {
            dispatch(setIsLoading(true))
            const { response, err } = await contentApi.getContentDetail({ type, id })
            dispatch(setIsLoading(false))

            if (response) {
                setContent(response)
                setIsFavorite(response.isFavorite)
                setGenres(response.genres)
            }
            if (err) toast.error(err.message)

        }
        getContent()
    }, [type, id, dispatch])
    return (
        content ? <>
            <Box
                sx={{
                    zIndex: 1,
                    backgroundImage: `url(${BUILD_FULL_IMAGE_URL}${content.backdrop_path || content.mediaPoster})`,
                    paddingBottom: "50px",
                    position: "relative",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",


                }}>
                <Box
                    sx={{
                        color: 'primary.text',
                        paddingTop: '80px',
                        maxWidth: '1300px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: {
                            lg: 'flex-start',
                            xs: 'center'
                        },
                        flexDirection: {
                            xs: 'column',
                            md: 'row'
                        }
                    }}>
                    <Box
                        sx={{
                            width: '40%',
                            maxWidth: '500px',
                            margin: {
                                xs: '0 auto',
                                md: '0 1rem  0 '

                            }
                        }}>
                        <Box sx={{
                            paddingTop: '140%',
                            backgroundImage: `url(${BUILD_POSTER_IMAGE_URL}${content.poster_path || content.backdrop_path || content.mediaPoster})`,
                            position: "relative",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: "darkgrey",
                        }}>

                        </Box>

                    </Box>
                    <Box
                        sx={{
                            height: '100%',
                            paddingLeft: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem'

                        }}>
                        <Typography variant='h4'
                            sx={{
                                paddingTop: '20px',
                                fontWeight: 700,
                            }}>{content.title ?
                                content.title
                                :
                                content.name} {`${type === TYPE.movie ? content.release_date?.split('-')[0] : content.first_air_date?.split('-')[0]}`}</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',


                            }}>
                            <Stack
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '1rem',
                                    flexWrap: 'wrap'
                                }}>
                                {genres?.splice(0, 3).map((elem) => (
                                    <Typography
                                        key={elem.id}
                                        sx={{
                                            backgroundColor: `${theme.palette.mode === themeState.light ? 'primary.main' : 'secondary.main'}`,
                                            padding: '3px 8px',
                                            borderRadius: '8px',
                                            color: 'white',

                                        }}>
                                        {elem.name}
                                    </Typography>
                                ))}
                            </Stack>

                        </Box>
                        <Typography
                            sx={{
                                maxWidth: '700px',
                                marginRight: '1rem'
                            }}>
                            {content.overview}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem'
                            }}>
                            <CircularRate value={content.vote_average} />
                            <FaHeart size={30} style={{ cursor: 'pointer' }} />
                        </Box>
                        <Button variant="contained" sx={{
                            width: 'max-content',
                            backgroundColor: `${theme.palette.mode === themeState.light ? '' : '#225792'}`
                        }}
                            component={Link}
                        >
                            Watch Now
                        </Button>
                        <Box
                            sx={{
                                '& .swiper-slide': {
                                    width: {
                                        xs: '33,3%',
                                        md: '25%',
                                        lg: '25%'

                                    }
                                },
                                marginRight: '1rem'
                            }}>
                            <Swiper
                                grabCursor={true}
                                slidesPerView={'auto'}

                                style={{
                                    width: '100%',
                                    height: 'max-content',
                                    maxWidth: '700px',
                                }}>
                                {content.credits.cast.map((item) => {
                                    return (
                                        <SwiperSlide
                                            key={item.id}>
                                            <Link
                                            style={{
                                                textDecoration: 'none'
                                            }}
                                                to={`/person/${item.id}}`}>
                                                <Box sx={{
                                                    color: 'primary.text',
                                                    paddingTop: '150px',
                                                    position: "relative",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundColor: "darkgrey",
                                                    backgroundImage: `url(${BUILD_FULL_IMAGE_URL}${item.profile_path})`,
                                                }} >
                                                    <Typography>
                                                        {item.name}
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>

                        </Box>
                    </Box>
                </Box>

            </Box >
        </>
            :
            null
    )
}

export default ContentDetail