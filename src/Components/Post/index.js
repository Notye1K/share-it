import { Box, Button, Link, Paper, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { useContext, useEffect, useState } from 'react'
import { getLike, postLike } from '../../services/publicationsService'
import LoadingContext from '../../Contexts/LoadingContext'
import AlertContext from '../../Contexts/AlertContext'
import { Link as RouterLink } from 'react-router-dom'

export default function Post({ post, setRefresh, refresh }) {
    const { setOpen, setMessage } = useContext(AlertContext)
    const { stopLoading, startLoading } = useContext(LoadingContext)

    const [like, setLike] = useState(null)

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
                .then()
                .catch(() => {
                    setMessage('Houve um problema tente novamente mais tarde')
                    setOpen(true)
                })
                .finally(stopLoading)
            setRefresh(!refresh)
        } else if (thumb === 'up') {
            startLoading()
            postLike(post.id, true)
                .then()
                .catch(() => {
                    setMessage('Houve um problema tente novamente mais tarde')
                    setOpen(true)
                })
                .finally(stopLoading)
            setRefresh(!refresh)
        } else if (thumb === 'down') {
            startLoading()
            postLike(post.id, false)
                .then()
                .catch(() => {
                    setMessage('Houve um problema tente novamente mais tarde')
                    setOpen(true)
                })
                .finally(stopLoading)
            setRefresh(!refresh)
        }
    }

    return (
        <Paper elevation={2} sx={{ padding: 1 }}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
                {post.title}
            </Typography>
            <Box sx={{ marginBottom: 1 }}>
                {post.categoriesPublications.map(
                    (categoryPublication, index) => (
                        <>
                            {index !== 0 ? ' - ' : ''}
                            <Link
                                underline="hover"
                                component={RouterLink}
                                to={`/categories/${categoryPublication.category.title}`}
                                key={categoryPublication.id}
                            >
                                {categoryPublication.category.title.toUpperCase()}
                            </Link>
                        </>
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
