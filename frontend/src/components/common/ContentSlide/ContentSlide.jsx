import { Box, Typography } from "@mui/material"
import contentApi from "../../../api/requests/contentRequest"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ItemContentSlide from "../ItemContentSlide/ItemContentSlide"
import CustomTitle from "../CustomTitle/CustomTitle"

const ContentSlide = ({ type, category, title }) => {
    const [content, setContent] = useState([])

    useEffect(() => {
        const getContentList = async () => {
            const { response, err } = await contentApi.getContentList({
                type,
                category,
                page: 2
            })

            if (response) {
                setContent(response.results)
            }
            if (err) {
                toast.error(err.message)
            }
        }
        getContentList()

    }, [type, category])


    return (
        <> 
            <CustomTitle title={title} /> 
            <Box
                sx={{
                    "& .swiper-slide": {
                        width: {
                            xs: '50%',
                            sm: '33%',
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
                                <ItemContentSlide content={item} type={type} />

                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Box>
        </>

    )
}

export default ContentSlide