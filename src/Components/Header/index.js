import {
    Autocomplete,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
    TextField,
} from '@mui/material'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import ToggleTheme from '../ToggleTheme'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import LoadingContext from '../../Contexts/LoadingContext'
import AlertContext from '../../Contexts/AlertContext'
import { getCategories } from '../../services/categoryService'
import { checkToken } from '../../services/userService'

export default function Header() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/login')
        else {
            checkToken().catch(() => {
                localStorage.removeItem('token')
                navigate('/login')
            })
        }
        // eslint-disable-next-line
    }, [])

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    function handleLogout() {
        handleClose()
        localStorage.removeItem('token')
        navigate('/login')
    }

    const screenWidth = window.screen.width
    return (
        <>
            <Box
                sx={{
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '1em',
                }}
            >
                <Link
                    underline="hover"
                    sx={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}
                    component={RouterLink}
                    to="/"
                >
                    SHARE-IT
                </Link>
                <ToggleTheme />
                {screenWidth > 650 && <SearchBar />}
                <Button onClick={handleClickOpen}>
                    <LogoutTwoToneIcon />
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Fazer logout?'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tem certeza que deseja sair?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Não</Button>
                        <Button onClick={handleLogout} autoFocus>
                            Sim
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            {screenWidth <= 650 && (
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '1em',
                    }}
                >
                    <SearchBar />
                </Container>
            )}
        </>
    )
}

function SearchBar() {
    const [categories, setCategories] = useState([])

    const { setOpen, setMessage } = useContext(AlertContext)
    const { stopLoading, startLoading } = useContext(LoadingContext)

    useEffect(() => {
        startLoading()
        getCategories()
            .then((response) => {
                setCategories(
                    response.data.map((category) => category.title).sort()
                )
            })
            .catch(() => {
                setMessage('Houve um problema tente novamente mais tarde')
                setOpen(true)
            })
            .finally(stopLoading)
        // eslint-disable-next-line
    }, [])

    const [value, setValue] = useState(null)
    const [inputValue, setInputValue] = useState('')

    const navigate = useNavigate()

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
                if (newValue) {
                    navigate(`/categories/${newValue}`)
                }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
            }}
            id="controllable-states-demo"
            options={categories}
            sx={{
                width: 300,
            }}
            renderInput={(params) => (
                <TextField
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            navigate(`/categories/${inputValue}`)
                        }
                    }}
                    {...params}
                    label="Pesquisar por Categorias"
                />
            )}
        />
    )
}
