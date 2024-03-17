import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import ContentVideo from './ContentVideo/ContentVideo';

const VideosSection = ({ videos }) => {
    console.log("Videos:", videos)
    return (
        <>
            <Box sx={{
                '& . swiper-slide': {
                    width: '100%',
                    opacity: '0.6',

                },
                "& .swiper-slide-active": { opacity: 1 },
                "& .swiper-pagination-bullet": {
                    backgroundColor: 'text.primary'
                },
                "& .swiper": {
                    // padding: { xs: '1rem', md: '4rem' }
                },
                "& .swiper-button-next, & .swiper-button-prev": {
                    color: "text.primary",
                    "&::after": {
                        fontSize: { xs: "1rem", md: "2rem" }
                    }
                },
                
                margin: '0 auto'
            }}>
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    grabCursor={true}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    style={{
                        maxWidth: '1300px',
                        width: '100%',
                        height: 'max-content'
                    }}

                >
                    {videos.map((video, index) => (
                        <SwiperSlide
                            style={{ maxWidth: '100%' }}
                            key={index}
                        >
                            <ContentVideo video={video} />

                        </SwiperSlide>
                    ))}

                </Swiper>
            </Box>
        </>
    )
}

export default VideosSection