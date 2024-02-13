import {createTheme} from '@mui/material/styles'
import {colors} from '@mui/material'


export const themeState = {
    light: 'light',
    dark: 'dark'
}

const themeStyles = {
    custom: ({mode}) => {
        const customStyle = mode === themeState.light ? {
            primary: {
                main: "#2196f3",
            },
            secondary: {
                main: "#1565c0"
            },
            background: {
                default: colors.grey["100"],
            }
        } : {
            primary: {
                main: "#2196f3",
                contrastText: '#ffffff'
            },
            secondary: {
                main: "#1565c0",
                contrastText: '#ffffff'
            },
            background: {
                default: '#000000',
                paper: '#131313'
            }
        }

        return createTheme({
            palette: {
                mode,
            ...customStyle
            }
        })
        
    }
}

export default themeStyles