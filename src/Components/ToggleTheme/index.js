import { ColorModeContext } from '../../Contexts/Theme'
import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Box } from '@mui/material'

export default function ToggleTheme() {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
    return (
        <Box>
            {theme.palette.mode} mode
            <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
            >
                {theme.palette.mode === 'dark' ? (
                    <Brightness7Icon />
                ) : (
                    <Brightness4Icon />
                )}
            </IconButton>
        </Box>
    )
}
