import { Box} from '@mui/material';
import React, { useState } from 'react';
import { BUILD_FULL_IMAGE_URL, BUILD_POSTER_IMAGE_URL } from '../../../const/constConfig';

const Gallery = ({ images }) => {
    const [mainImageIndex, setMainImageIndex] = useState(0);

    const handleClickOnImage = (index) => {
        setMainImageIndex(index);
    };

    return (
        <Box sx={{
            margin: '0 auto',
            marginTop: '2rem',
            marginBottom: '8rem',
            padding: '0 2rem',
            maxWidth: '1300px',
            
        }}>
            <Box >

                <img
                    src={`${BUILD_FULL_IMAGE_URL}/${images[mainImageIndex].file_path}`}
                    alt=""
                    style={{ maxWidth: '1300px' }}
                    height='100%'
                    width='100%'


                />
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Box sx={{
                        
                        
                        width: 'fit-content',
                        height: '100%',
                        overflowX: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        

                    }}>
                        {images.map((img, index) => (
                            <Box
                                key={index}

                                sx={{
                                    padding: '0.25rem',
                                    transition: 'all 0.5s ease-in-out',
                                    backgroundColor: mainImageIndex == index ? 'gray' : '',
                                    '&:hover': {
                                        backgroundColor: 'gray',
                                        cursor: 'pointer'
                                    },
                                }}
                                onClick={() => handleClickOnImage(index)}
                            >
                                <img
                                    src={`${BUILD_POSTER_IMAGE_URL}/${img.file_path}`}
                                    alt=""
                                    style={{ maxWidth: '100px', overflowX: 'hidden'}}
                                    height='100%'
                                    width='100px'
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Gallery;