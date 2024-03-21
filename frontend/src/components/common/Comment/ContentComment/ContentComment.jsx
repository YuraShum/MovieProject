import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import commentApi from '../../../../api/requests/commentRequest'
import { toast } from 'react-toastify'

import CommentItem from '../CommentItem/CommentItem'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import GenerationAvatar from '../GenerationAvatar/GenerationAvatar'


export const ContentComment = ({ comments, content, type }) => {

    const { user } = useSelector((state) => state.user)

    const toDisplayCountComment = 8
    const [commentsList, setCommentsList] = useState([])
    const [displayComments, setDisplayComments] = useState([])
    const [paginationPage, setPaginationPage] = useState(1)
    const [onRequest, setOnRequest] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [commentCount, setCommetCount] = useState(0)

    useEffect(() => {
        setCommentsList([...comments])
        setDisplayComments([...comments].splice(0, toDisplayCountComment))
        setCommetCount(comments.length)

    }, [comments])
    const showMore = () => {
        const newComment = commentsList
            .splice(toDisplayCountComment * paginationPage,
                toDisplayCountComment)

        setDisplayComments([...displayComments, ...newComment])
        setPaginationPage(paginationPage + 1)

    }

    const addComment = async () => {
        if (onRequest) {
            setOnRequest(true)
        }
        const body = {
            id: content.id,
            type,
            title: content.title || content.name,
            poster: content.poster_path,
            content: commentText

        }

        const { response, err } = await commentApi.addComment(body)

        setOnRequest(false)
        if (err) {
            toast.error(err.message)
        }
        if (response) {
            setDisplayComments([...displayComments, response])
            setCommetCount(commentCount + 1)
            setCommentText('')
        }

    }

    const onRemoved = async (id) => {
        if (commentsList.findIndex((comment) => comment.id === id) !== -1) {
            const newCommentsList = commentsList.filter((comment) => comment.id !== id)
            setCommentsList(newCommentsList)
            setDisplayComments([...newCommentsList]
                .splice(
                    0,
                    paginationPage * toDisplayCountComment))

        } else {
            setDisplayComments([...displayComments].filter(comment => comment.id !== id))
        }
        setCommetCount(commentCount - 1)
    }


    return (
        <>
            <Box
                sx={{
                    maxWidth: '1300px',
                    margin: '0 auto'
                }}>
                <Typography variant='h4'
                    sx={{
                        margin: '0 2rem',
                        marginBottom: '1rem'
                    }}>
                    {`Comments (${commentCount})`}
                </Typography>
                {/** add comment section*/}
                {user && (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                flexDirection: 'column',
                                margin: '0 2rem'
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center'
                                }}>
                                <GenerationAvatar name={user.displayName} />
                                <Typography>
                                    {user.displayName}
                                </Typography>
                            </Box>
                            <TextField

                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                variant='outlined'
                                rows={3}
                                multiline
                                placeholder='Write comment' />
                            {commentText.length > 0 && (
                                <Box
                                sx={{
                                    textAlign: 'end'
                                }}>
                                    <Button
                                        variant='contained'
                                        onClick={() => setCommentText('')}>
                                        Cancel
                                    </Button>
                                    <Button
                                    onClick={addComment}>
                                        Send
                                    </Button>
                                </Box>)}
                        </Box>
                    </>
                )}
                {/** add comment section*/}
                {/**  display comments section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem'
                    }}>
                    {displayComments.map((comment, index) => (
                        <Box
                            key={comment.id}>
                            <CommentItem comment={comment} onRemoved={onRemoved} />
                        </Box>
                    ))}
                    {displayComments.length < commentsList.length && (
                        <Button
                            onClick={showMore}
                            variant='contained'>
                            Show More

                        </Button>
                    )}
                </Box>
                {/**  display comments section */}
            </Box>
        </>
    )
}
