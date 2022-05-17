import * as React from 'react'
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
})

export default function ToggleColorMode({ children }) {
    const savedTheme = localStorage.getItem('theme') || 'light'
    const [mode, setMode] = React.useState(savedTheme)
    React.useEffect(() => {
        localStorage.setItem('theme', mode)
    }, [mode])
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            },
        }),
        []
    )

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    )

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        width: '100vw',
                        height: '100vh',
                        bgcolor: 'background.default',
                        color: 'text.primary',
                    }}
                >
                    {children}
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
