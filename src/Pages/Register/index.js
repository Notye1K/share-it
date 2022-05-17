import { Visibility, VisibilityOff } from '@mui/icons-material'
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
import { useContext, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import ToggleTheme from '../../Components/ToggleTheme'
import AlertContext from '../../Contexts/AlertContext'
import LoadingContext from '../../Contexts/LoadingContext'
import { register } from '../../services/userService'

export default function Register() {
    const [values, setValues] = useState({
        email: '',
        nickName: '',
        confirmPassword: '',
        password: '',
        showPassword: false,
    })

    const { setOpen, setMessage } = useContext(AlertContext)
    const { stopLoading, startLoading } = useContext(LoadingContext)

    const navigate = useNavigate()

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
        const body = {
            email: values.email,
            nick: values.nickName,
            password: values.password,
        }
        register(body)
            .then(() => {
                navigate('/login')
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
                onSubmit={handleSubmit}
            >
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    required
                    value={values.email}
                    type="email"
                    onChange={handleChange('email')}
                />
                <TextField
                    id="outlined-basic"
                    label="NickName"
                    variant="outlined"
                    required
                    value={values.nickName}
                    onChange={handleChange('nickName')}
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
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        Confirmar Senha
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        required
                        onChange={handleChange('confirmPassword')}
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
                        label="Confirmar Senha"
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
