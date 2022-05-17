import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ToggleColorMode from './Contexts/Theme'

import Login from './Pages/Login'
import Publications from './Pages/Publications'
import Register from './Pages/Register'

export default function App() {
    return (
        <ToggleColorMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Publications />} />
                </Routes>
            </BrowserRouter>
        </ToggleColorMode>
    )
}
