import { useTheme } from "@emotion/react"
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import contentApi from "../../../api/requests/contentRequest"
import { toast } from 'react-toastify'
import { setIsLoading } from "../../../redux/features/selectIsLoading/selectIsLoadingSlice"
import genreApi from "../../../api/requests/genreRequest"

const TitleBanerSection = ({ type, category }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const getMedias = async () => {
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

        const getGenres = async () => {
            dispatch(setIsLoading(true))

            const { response, err } = await genreApi.getGenrelist({
                type
            })

            if (response) {
                setGenres(response.genres)
                getMedias()
            }
            if (err) {
                dispatch(setIsLoading(false))
                toast.error(err.message)
            }
        }
        getGenres()

    }, [type, category, dispatch])
    return (
        <div style={{ marginTop: 100, color: 'white' }}>TitleBanerSection</div>
    )
}

export default TitleBanerSection