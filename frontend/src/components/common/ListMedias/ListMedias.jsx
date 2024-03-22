import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ItemContentSlide from '../ItemContentSlide/ItemContentSlide'
import genreApi from '../../../api/requests/genreRequest'
import { toast } from 'react-toastify'

const ListMedias = ({ contents, type }) => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const getGenreList = async () => {
            const { response, err } = await genreApi.getGenrelist({
                type
            })

            if (response) {
                setGenres(response.genres)
                // console.log(contents, type)
                //     console.log("Genres", response.genres)

            }
            if (err) {
                toast.error(err.message)
            }
        }

        getGenreList()
    }, [])
    return (
        <Grid
            container={true}
            spacing={2}
        >
            {contents.map((item, index) => (
                <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    key={index}>
                    <ItemContentSlide content={item} type={type} genres={genres} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ListMedias