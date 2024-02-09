import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            {/** loading section*/}
            {/** loading section*/}

            {/** login  section*/}
            {/** login  section*/}

            {/** content section */}
            <Box
                display='flex'
                minHeight="100vh">
                {/** header section */}
                {/** header section */}

                {/** main section */}
                <Box
                    component='main'
                    overflow='hidden'
                    flexGrow={1}
                    minHeight='100vh'
                >
                    <Outlet/>

                </Box>
                {/** main section */}

                {/** footer section */}
                {/** footer section */}
            </Box>
            {/** content section */}
        </>
    )
}

export default Layout