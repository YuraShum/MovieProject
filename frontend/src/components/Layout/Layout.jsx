import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Loading from '../common/Loading/Loading'
import Footer from '../common/Footer/Footer'
import Header from '../common/Header/Header'
import ModalWindow from '../common/ModalWindow/ModalWindow'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import userApi from '../../api/requests/userRequest'
import { setUser } from '../../redux/features/user/userSlice'
import favoriteApi from '../../api/requests/favoriteRequest'
import { setListFavorite } from '../../redux/features/user/userSlice'
import { toast } from 'react-toastify'


const Layout = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)
    useEffect(() => {
        const authUser = async () => {
            const { response, err } = await userApi.getUserInformation();
            console.log('auth user Response: ', response)

            if (response) {
                dispatch(setUser(response))
            }
            if (err) {
                dispatch(setUser(null))
            }
        }
        authUser()

    }, [dispatch])

    useEffect(() => {
        const getFavorites = async() => {
            const {response, err} = await favoriteApi.getFavoritesOfUser()

            if(response){
                dispatch(setListFavorite(response))
            }
            if(err){
                toast.error(err.message)
            }
        } 
        if(user){
            getFavorites()
        }
        if(!user){
            dispatch(setListFavorite([]))
        }
    }, [dispatch, user])

    return (
        <>
            {/** loading section*/}
            <Loading />
            {/** loading section*/}

            {/** login  section*/}
            <ModalWindow />
            {/** login  section*/}

            {/** content section */}
            <Box

                minHeight="100vh"
                flexDirection='column'
            >

                {/** header section */}
                <Header />
                {/** header section */}

                {/** main section */}
                <Box
                    component='main'
                    overflow='hidden'
                    flexGrow={1}
                    minHeight="100vh"
                    sx={{
                        backgroundColor: 'background.default'
                    }}
                >
                    <Outlet />

                </Box>
                {/** main section */}

                {/** footer section */}
                <Footer />
                {/** footer section */}
            </Box>
            {/** content section */}
        </>
    )
}

export default Layout