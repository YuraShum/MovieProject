import { CircularProgress, LinearProgress, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material'
import CustomCircularProgress from './CustomCircularProgress';

const Loading = () => {
    const isLoading = useSelector((state) => state.isLoading)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        isLoading ?
            setLoading(true) :
            setTimeout(() => {
                setLoading(false)
            }, 1500)

    }, [isLoading])
    return (
        <Paper
            sx={{
                transition: "all 0.3s ease",
                pointerEvents: 'none',
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                zIndex: 111,
                opacity: loading ? 1 : 0

            }}
        >

            <Box
                sx={{
                    position: "absolute",
                    top: '50%',
                    left: '50%',
                    transform: "translate(-50%, -50%)",
                    textAlign: "center"
                }}>
                <CustomCircularProgress/>
            </Box>

        </Paper>
    )
}

export default Loading