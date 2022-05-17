import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ToggleColorMode from './Contexts/Theme'

import Login from './Pages/Login'
import Publications from './Pages/Publications'
import Register from './Pages/Register'
import { AlertProvider } from './Contexts/AlertContext'
import SnackbarAlert from './Components/Alert'
import { LoadingProvider } from './Contexts/LoadingContext'
import Loading from './Components/Loading'

export default function App() {
    return (
        <ToggleColorMode>
            <AlertProvider>
                <LoadingProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Publications />} />
                        </Routes>
                    </BrowserRouter>
                    <Loading />
                    <SnackbarAlert />
                </LoadingProvider>
            </AlertProvider>
        </ToggleColorMode>
    )
}
