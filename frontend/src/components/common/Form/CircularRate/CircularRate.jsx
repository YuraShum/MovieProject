import { useTheme } from '@emotion/react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { themeState } from '../../../../styles/theme'

const CircularRate = ({ value }) => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-block',
                width: 'max-content'
            }}>
            <CircularProgress
                thickness={4}
                variant='determinate'
                value={value * 10}

                sx={{
                    fontWeight: 700,
                    borderRadius: '50%',
                    backgroundColor:  `${theme.palette.mode === themeState.light ? 'primary.main': 'secondary.main'}`,
                    color: `${theme.palette.mode === themeState.light ? 'white': 'primary.main'}`
                }}
                size={50}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Typography fontWeight='700' sx={{color: 'white'}}>{Math.floor(value * 10) / 10}</Typography>
            </Box>
        </Box>
    )
}

export default CircularRate