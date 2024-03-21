import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import commentApi from '../../../../api/requests/commentRequest'
import { toast } from 'react-toastify'
import { Box, Button, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { Avatar } from '@mui/material';

const CommentItem = ({ comment, onRemoved }) => {
    const { user } = useSelector((state) => state.user)
    const [onRequest, setOnRequest] = useState(false)

    const onRemoveComment = async () => {
        if (onRequest) {
            return setOnRequest(true)
        }

        const { response, err } = await commentApi.removeComment(
            { id: comment.id }
        )
        if (err) {
            return toast.error(err.message)
        }
        if (response) {
            onRemoved(comment.id)
        }

    }
    return (
        <Box
            sx={{
                padding: '2rem',
                borderRadius: '1rem',
                position: 'relative',
                opacity: onRequest ? 0.6 : 1,

            }}>
            <Box
                direction='row'
                spacing={2}>
                <Box spacing={2} flexGrow={1}>
                    <Avatar name ={comment.user.displayName}/>
                    <Box spacing={1}>
                        <Typography variant='h5'>
                            {comment.user.displayName}
                        </Typography>
                        <Typography>
                            {dayjs(comment.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                        </Typography>
                    </Box>
                    <Typography>
                        {comment.content}
                    </Typography>
                    {user && user.id === comment.user.id && (
                        <Button
                            variant='contained'
                            onClick={onRemoveComment}
                            sx={{
                                position: 'absolute',
                                right: '1rem'
                            }}
                        >
                            Remove
                        </Button>
                    )}
                </Box>

            </Box>
        </Box>
    )
}

export default CommentItem