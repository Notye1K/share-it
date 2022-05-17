import { Button, Container, Link } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Link as RouterLink } from 'react-router-dom'
import ToggleTheme from '../../Components/ToggleTheme'

export default function Login() {
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
                    label="Email ou Nick"
                    variant="outlined"
                />

                <TextField
                    id="outlined-basic"
                    label="Senha"
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
                        Login
                    </Button>
                    <Link
                        underline="hover"
                        component={RouterLink}
                        to="/register"
                    >
                        {'Ainda não me cadastrei.'}
                    </Link>
                </Box>
            </Container>
        </Box>
    )
}
