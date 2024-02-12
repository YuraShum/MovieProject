import {Box, Typography, CircularProgress} from "@mui/material"

const CustomCircularProgress = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: 90,
                height: 90,
                textAlign: 'center',
            }}
        >
            <CircularProgress
                size={90}
            />
            <Typography
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1, 
                }}
            >
                Loading...
            </Typography>
        </Box>
    )
}

export default CustomCircularProgress