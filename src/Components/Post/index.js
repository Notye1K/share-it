import { Box, Button, Link, Paper, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import React, { useContext, useEffect, useState } from 'react'
import {
    deletePublication,
    getLike,
    postLike,
} from '../../services/publicationsService'
import LoadingContext from '../../Contexts/LoadingContext'
import AlertContext from '../../Contexts/AlertContext'
import { Link as RouterLink } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Post({ post, setRefresh, refresh }) {
    const { setOpen, setMessage } = useContext(AlertContext)
    const { stopLoading, startLoading } = useContext(LoadingContext)

    const [like, setLike] = useState(null)

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        startLoading()
        getLike(post.id)
            .then((response) => setLike(response.data))
            .catch(() => {
                setMessage('Houve um problema tente novamente mais tarde')
                setOpen(true)
            })
            .finally(stopLoading)
        // eslint-disable-next-line
    }, [refresh])

    function handleLike(thumb) {
        if ((thumb === 'up' && like) || (thumb === 'down' && like === false)) {
            startLoading()
            postLike(post.id)
                .then(() => {
                    setRefresh(!refresh)
                })
                .catch(() => {
                    setMessage('Houve um problema tente novamente mais tarde')
                    setOpen(true)
                })
                .finally(stopLoading)
        } else if (thumb === 'up') {
            startLoading()
            postLike(post.id, true)
                .then(() => {
                    setRefresh(!refresh)
                })
                .catch(() => {
                    setMessage('Houve um problema tente novamente mais tarde')
                    setOpen(true)
                })
                .finally(stopLoading)
        } else if (thumb === 'down') {
            startLoading()
            postLike(post.id, false)
                .then(() => {
                    setRefresh(!refresh)
                })
                .catch(() => {
                    setMessage('Houve um problema tente novamente mais tarde')
                    setOpen(true)
                })
                .finally(stopLoading)
        }
    }

    function handleDelete() {
        startLoading()
        deletePublication(post.id)
            .then(() => {
                setRefresh(!refresh)
            })
            .catch((err) => {
                if (err.response.status === 500) {
                    setMessage('Houve um problema tente novamente mais tarde')
                    setOpen(true)
                } else {
                    setMessage(err.response.data)
                    setOpen(true)
                }
            })
            .finally(stopLoading)
    }

    return (
        <Paper elevation={2} sx={{ padding: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                    {post.title}
                </Typography>
                {+userId === post.userId && (
                    <Button onClick={handleDelete}>
                        <DeleteIcon />
                    </Button>
                )}
            </Box>
            <Box sx={{ marginBottom: 1, fontSize: '14px' }}>
                {post.categoriesPublications.map(
                    (categoryPublication, index) => (
                        <React.Fragment key={categoryPublication.id}>
                            {index !== 0 ? ' - ' : ''}
                            <Link
                                underline="hover"
                                component={RouterLink}
                                sx={{
                                    fontFamily:
                                        'Roboto, Helvetica, Arial, sans-serif',
                                }}
                                to={`/categories/${categoryPublication.category.title}`}
                            >
                                {categoryPublication.category.title.toUpperCase()}
                            </Link>
                        </React.Fragment>
                    )
                )}
            </Box>
            <Typography
                variant="subtitle2"
                sx={{
                    color: 'text.secondary',
                    marginBottom: 2,
                    overflowWrap: 'anywhere',
                }}
            >
                {post.text}
            </Typography>
            {post.link && (
                <Link
                    href={post.link}
                    underline="hover"
                    target="_blank"
                    rel="noreferrer"
                >
                    LINK
                </Link>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => handleLike('up')}>
                    {like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                </Button>
                <Typography>{post.likes}</Typography>
                <Button onClick={() => handleLike('down')}>
                    {like === false ? (
                        <ThumbDownIcon />
                    ) : (
                        <ThumbDownOffAltOutlinedIcon />
                    )}
                </Button>
            </Box>
        </Paper>
    )
}
