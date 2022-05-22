import { Link, Paper } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import AlertContext from '../../Contexts/AlertContext'
import LoadingContext from '../../Contexts/LoadingContext'
import { getCategories } from '../../services/categoryService'
import { Link as RouterLink } from 'react-router-dom'

export default function Sidebar({ refresh }) {
    const [categories, setCategories] = useState([])

    const { setOpen, setMessage } = useContext(AlertContext)
    const { stopLoading, startLoading } = useContext(LoadingContext)

    useEffect(() => {
        startLoading()
        getCategories()
            .then((response) => {
                setCategories(
                    response.data.sort((a, b) => {
                        if (a.title > b.title) {
                            return 1
                        }
                        if (a.title < b.title) {
                            return -1
                        }
                        return 0
                    })
                )
            })
            .catch(() => {
                setMessage('Houve um problema tente novamente mais tarde')
                setOpen(true)
            })
            .finally(stopLoading)
        // eslint-disable-next-line
    }, [refresh])

    return (
        <Paper
            elevation={2}
            sx={{
                padding: 1, // eslint-disable-next-line
                ['@media (max-width:500px)']: { display: 'none' },
                maxHeight: '393px',
                position: 'sticky',
                top: '20px',
                minWidth: '15%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                overflowY: 'auto',
            }}
        >
            {categories.map((category) => (
                <Link
                    underline="hover"
                    component={RouterLink}
                    to={`/categories/${category.title}`}
                    key={category.id}
                >
                    {category.title.toUpperCase()}
                </Link>
            ))}
        </Paper>
    )
}
