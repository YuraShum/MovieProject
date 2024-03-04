import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BUILD_POSTER_IMAGE_URL, TYPE } from '../../../const/constConfig'
import { Link } from 'react-router-dom'
import contentApi from '../../../api/requests/contentRequest'
import { Box } from '@mui/material'

const ItemContentSlide = ({ content, type }) => {
    const { listFavorite } = useSelector((state) => state.user)
    const [itemContent, setItemContent] = useState({
        title: '',
        posterPath: '',
        date: null,
        rate: null
    })

    useEffect(() => {
        // console.log('Content Item:', `${BUILD_POSTER_IMAGE_URL}${content.poster_path || content.backdrop_path || content.mediaPoster}`)
        setItemContent({
            title: content.title || content.name,
            posterPath: `${BUILD_POSTER_IMAGE_URL}${content.poster_path || content.backdrop_path || content.mediaPoster}`,
            date: `${type === TYPE.movie ? content.release_date: content.first_air_date}`,
            rate: content.vote_avarege || content.mediaRate
        })
    }, [content, type])
    return (
        <Link
            >
                <Box
                sx={{
                    backgroundImage: `url(${itemContent.posterPath})`,
                    paddingTop: '150%',
                    position: 'relative',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>

                </Box>
        </Link>
    )
}

export default ItemContentSlide