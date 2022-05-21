import {
    Button,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
} from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import ToggleTheme from '../../Components/ToggleTheme'
import { useContext, useState, useEffect } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { login } from '../../services/userService'
import AlertContext from '../../Contexts/AlertContext'
import LoadingContext from '../../Contexts/LoadingContext'

export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    const [values, setValues] = useState({
        emailOrNick: '',
        password: '',
        showPassword: false,
    })

    const { setOpen, setMessage } = useContext(AlertContext)
    const { stopLoading, startLoading } = useContext(LoadingContext)

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    function handleSubmit(event) {
        event.preventDefault()
        startLoading()
        const body = {}
        if (values.emailOrNick.search(/^(?=.*@)(?=.*.com).*$/) !== -1) {
            body.email = values.emailOrNick
        } else {
            body.nick = values.emailOrNick
        }
        body.password = values.password
        login(body)
            .then((response) => {
                localStorage.setItem('token', response.data)
                navigate('/')
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
        <Box sx={{ height: '100vh' }}>
            <ToggleTheme />
            <Container
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                    gap: '0.5em',
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    id="outlined-basic"
                    label="Email ou Nick"
                    variant="outlined"
                    value={values.emailOrNick}
                    onChange={handleChange('emailOrNick')}
                    required
                />

                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        Senha
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        required
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Senha"
                    />
                </FormControl>

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
