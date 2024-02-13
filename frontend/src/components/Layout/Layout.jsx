import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Loading from '../common/Loading/Loading'
import Footer from '../common/Footer/Footer'
import Header from '../common/Header/Header'

const Layout = () => {
    return (
        <>
            {/** loading section*/}
            <Loading/>
            {/** loading section*/}

            {/** login  section*/}
            {/** login  section*/}

            {/** content section */}
            <Box
                
                minHeight="100vh"
                flexDirection='column'
                >
                
                {/** header section */}
                <Header/>
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
                    <Outlet/>

                </Box>
                {/** main section */}

                {/** footer section */}
                <Footer/>
                {/** footer section */}
            </Box>
            {/** content section */}
        </>
    )
}

export default Layout