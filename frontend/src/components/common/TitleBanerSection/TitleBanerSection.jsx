import { useTheme } from "@emotion/react"
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import contentApi from "../../../api/requests/contentRequest"
import { toast } from 'react-toastify'
import { setIsLoading } from "../../../redux/features/selectIsLoading/selectIsLoadingSlice"
import genreApi from "../../../api/requests/genreRequest"
import { Box, Button, Stack, Typography } from "@mui/material"
import { BUILD_FULL_IMAGE_URL } from "../../../const/constConfig"
import { Swiper, SwiperSlide } from 'swiper/react';
import CircularRate from '../Form/CircularRate/CircularRate'
import { themeState } from "../../../styles/theme"
import { Link } from "react-router-dom"



const TitleBanerSection = ({ type, category }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const getContent = async () => {
            const { response, err } = await contentApi.getContentList({
                type,
                category,
                page: 2
            })

            if (response) {
                setMovies(response.results)
            }
            if (err) {
                toast.error(err.message)
            }
            dispatch(setIsLoading(false))
        }

        const getGenreList = async () => {
            dispatch(setIsLoading(true))

            const { response, err } = await genreApi.getGenrelist({
                type
            })

            if (response) {
                setGenres(response.genres)
                console.log("Genres", response.genres)
                getContent()
            }
            if (err) {
                dispatch(setIsLoading(false))
                toast.error(err.message)
            }
        }
        getGenreList()


    }, [type, category, dispatch])


    const getBacgroundImagePath = (imgEndpoint) => {
        return `${BUILD_FULL_IMAGE_URL}${imgEndpoint}`
    }

    return (
        <Box
            sx={{
                position: "relative",
                color: "primary.text",
                "&::before": {
                    content: '""',
                    width: "100%",
                    height: "30%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    zIndex: 2,
                    pointerEvents: "none",
                }
            }}
        ><Swiper
            grabCursor={true}
            style={{
                width: '100%', height: 'max-content', display: 'flex',
                flexDirection: 'row'
            }}
            loop={true}
        >

                {movies.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Box
                                sx={{
                                    paddingTop: {
                                        xs: "160%",
                                        sm: "95%",
                                        md: "60%",
                                        lg: "45%"
                                    },
                                    backgroundPosition: 'top',
                                    backgroundSize: 'cover',
                                    backgroundImage: `url(${getBacgroundImagePath(item.backdrop_path || item.poster_path)})`,
                                    "&:after": {
                                        content: '""',
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        top: 0,
                                        left: 0,
                                        background: `linear-gradient(to right, rgba(${theme.palette.mode === themeState.light ? "256, 256, 256," : "0, 0, 0,"} 0.6), rgba(0, 0, 0, 0))`,
                                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                                    }
                                }} />
                            <Stack spacing={2}
                                sx={{
                                    position: 'absolute',
                                    top: '20%',
                                    zIndex: 3,
                                    left: '10%',


                                }}>
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "23px",
                                            sm: "40px",
                                            md: "50px",
                                            lg: "70px"
                                        },
                                    }}>
                                    {item.title ? item.title : item.original_title}
                                </Typography >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: {
                                        xs: 'column',
                                        sm: 'row'
                                    },
                                    alignItems: {
                                        xs: 'start',
                                        sm: "center"
                                    },
                                    gap: 3
                                }}>
                                    <Typography variant="h5">
                                        {item.release_date.split("-")[0]}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 2
                                        }}>
                                        {item.genre_ids.map(id => {
                                            return <Typography
                                            key={id}
                                                sx={{
                                                    backgroundColor: `${theme.palette.mode === themeState.light ? 'primary.main' : 'secondary.main'}`,
                                                    padding: '3px 8px',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    alignItems:'center',
                                                    textAlign: 'center',
                                                    height: 'max-content',
                                                }}>
                                                {genres.find((genre) => genre.id === id).name}
                                            </Typography>
                                        })}
                                    </Box>
                                </Box>
                                <Typography
                                    sx={{
                                        maxWidth: {
                                            xs: "300px",
                                            sm: "500px",
                                            md: "700px",
                                        },
                                        fontSize: {
                                            xs: "12px",
                                            sm: "14px",
                                            md: "16px",
                                        },
                                        width: '100%'
                                    }}>
                                    {item.overview}
                                </Typography>
                                <CircularRate value={item.vote_average} />
                                <Button variant="contained" sx={{
                                    width: 'max-content',
                                    backgroundColor: `${theme.palette.mode === themeState.light ? '' : '#225792'}`
                                }}
                                component={Link}
                                to={`/${type}/${item.id}`}>
                                    Watch Now
                                </Button>
                            </Stack>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    )
}

export default TitleBanerSection