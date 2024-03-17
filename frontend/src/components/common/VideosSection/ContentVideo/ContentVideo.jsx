import { Box, Button } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { BUILD_YOUTUBE_VIDEO_URL } from '../../../../const/constConfig'
import { useTheme } from '@emotion/react'
import { themeState } from '../../../../styles/theme'

const ContentVideo = ({ video }) => {
    const iframeRef = useRef()
    const theme = useTheme()


    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
        iframeRef.current.setAttribute('height', height)

    }, [])
    const requestFullScreen = () => {
        if (iframeRef.current.requestFullscreen) {
            iframeRef.current.requestFullscreen();
        } else if (iframeRef.current.mozRequestFullScreen) {
            iframeRef.current.mozRequestFullScreen();
        } else if (iframeRef.current.webkitRequestFullscreen) {
            iframeRef.current.webkitRequestFullscreen();
        } else if (iframeRef.current.msRequestFullscreen) {
            iframeRef.current.msRequestFullscreen();
        }
    };

    return (

        <>
            <Box
                sx={{
                    height: 'max-content',
                    marginBottom: '2rem'
                }}>
                <iframe
                    key={video.key}
                    src={`${BUILD_YOUTUBE_VIDEO_URL}${video.key}?controls=0`}
                    ref={iframeRef}
                    width='100%'
                    title={video.id}
                    allowFullScreen

                >

                </iframe>
                <Box sx={{
                    textAlign: 'center',
                    marginTop: '2rem'
                }}>
                    <Button
                        sx={{
                            width: 'max-content',
                            backgroundColor: `${theme.palette.mode === themeState.light ? '' : '#225792'}`,
                            marginBottom: { xs: '1rem', md: '0' }

                        }}
                        onClick={requestFullScreen} variant='contained'>Open Fullscreen</Button>
                </Box>

            </Box>

        </>
    )
}

export default ContentVideo