import { createContext, useState } from 'react'

const AlertContext = createContext()

export function AlertProvider({ children }) {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <AlertContext.Provider
            value={{
                open,
                setOpen,
                setMessage,
                message,
                handleClose,
            }}
        >
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContext
