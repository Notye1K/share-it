import { createContext, useState } from 'react'

const LoadingContext = createContext()

export function LoadingProvider({ children }) {
    const [openLoading, setOpenLoading] = useState(false)
    const stopLoading = () => {
        setOpenLoading(false)
    }
    const startLoading = () => {
        setOpenLoading(true)
    }

    return (
        <LoadingContext.Provider
            value={{
                openLoading,
                stopLoading,
                startLoading,
            }}
        >
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext
