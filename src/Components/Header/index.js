import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
} from '@mui/material'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import ToggleTheme from '../ToggleTheme'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
    const navigate = useNavigate()
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
    return (
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
            <Link underline="hover" component={RouterLink} to="/">
                SHARE-IT
            </Link>
            <ToggleTheme />
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
    )
}
