import { Box, Typography } from "@mui/material"
import contentApi from "../../../api/requests/contentRequest"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ItemContentSlide from "../ItemContentSlide/ItemContentSlide"
import CustomTitle from "../CustomTitle/CustomTitle"
import genreApi from '../../../api/requests/genreRequest'

const ContentSlide = ({ type, category, title }) => {
    const [content, setContent] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const getContentList = async () => {
            const { response, err } = await contentApi.getContentList({
                type,
                category,
                page: 3
            })

            if (response) {
                setContent(response.results)
            }
            if (err) {
                toast.error(err.message)
            }
        }
        
        const getGenreList = async () => {
            const { response, err } = await genreApi.getGenrelist({
                type
            })

            if (response) {
                setGenres(response.genres)
                console.log("Genres", response.genres)
                getContentList()
            }
            if (err) {
                toast.error(err.message)
            }
        }
        getGenreList()

    }, [type, category])


    return (
        <> 
            <CustomTitle title={title} /> 
            <Box
                sx={{
                    "& .swiper-slide": {
                        width: {
                            xs: '50%',
                            sm: `${100/3}%`,
                            md: '25%',
                            lg: '20%'
                        },
                        padding:'30px 0 0 0'
                    }
                }}>
                <Swiper
                    grabCursor={true}
                    style={{
                        width: '100%',
                        height: 'max-content'
                    }}
                    slidesPerView="auto">
                    {content.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <ItemContentSlide content={item} type={type} genres ={genres}/>

                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Box>
        </>

    )
}

export default ContentSlide