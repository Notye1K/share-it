import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../Components/Header'
import Post from '../../Components/Post'
import Sidebar from '../../Components/Sidebar'
import AlertContext from '../../Contexts/AlertContext'
import LoadingContext from '../../Contexts/LoadingContext'
import { getPublicationsByCategory } from '../../services/publicationsService'

export default function Categories() {
    const { setOpen, setMessage } = useContext(AlertContext)
    const { stopLoading, startLoading } = useContext(LoadingContext)

    const [publications, setPublications] = useState([])
    const [refresh, setRefresh] = useState(true)

    const { category } = useParams()

    useEffect(() => {
        startLoading()
        getPublicationsByCategory(category)
            .then((response) => {
                const posts = response.data.categoriesPublications.map(
                    (element) => element.publication
                )
                setPublications(posts)
            })
            .catch(() => {
                setMessage('Houve um problema tente novamente mais tarde')
                setOpen(true)
            })
            .finally(stopLoading)
        // eslint-disable-next-line
    }, [category, refresh])
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header />
            <Typography
                variant="h5"
                sx={{ marginLeft: '10%', marginBottom: 2 }}
            >
                {category.toUpperCase()}
            </Typography>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 2,
                }}
            >
                <Box
                    sx={{
                        minWidth: '60%',
                    }}
                >
                    <Container
                        sx={{
                            maxWidth: '70vw',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        {publications.length === 0 ? (
                            <Typography>Não ha nenhum post</Typography>
                        ) : (
                            publications.map((post) => (
                                <Post
                                    key={post.id}
                                    setRefresh={setRefresh}
                                    refresh={refresh}
                                    post={post}
                                />
                            ))
                        )}
                    </Container>
                </Box>
                <Sidebar />
            </Container>
        </Box>
    )
}
