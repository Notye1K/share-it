import { Button, Container, Link } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Link as RouterLink } from 'react-router-dom'
import ToggleTheme from '../../Components/ToggleTheme'

export default function Register() {
    return (
        <Box>
            <ToggleTheme />
            <Container
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                    gap: '0.5em',
                }}
            >
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="NickName"
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Senha"
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Confirmar Senha"
                    variant="outlined"
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        sx={{ width: '20%' }}
                        variant="outlined"
                        type="submit"
                    >
                        Registrar
                    </Button>
                    <Link underline="hover" component={RouterLink} to="/login">
                        {'Já sou registrado.'}
                    </Link>
                </Box>
            </Container>
        </Box>
    )
}
