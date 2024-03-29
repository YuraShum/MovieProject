import React from 'react'
import { Box } from '@mui/material'

const Conteiner = ({children}) => {
  return (
    <Box
    sx={{
        width: '100%',
        marginX: 'auto',
        color: 'text.primary',
        backgroundColor: 'primary.main'
    }}>
        {children}
    </Box>
  )
}

export default Conteiner