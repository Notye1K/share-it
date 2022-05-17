import { Box, Button, Typography } from '@mui/material'
import ToggleTheme from '../ToggleTheme'

export default function Header() {
    return (
        <Box
            sx={{
                width: '90%',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1em',
            }}
        >
            <Typography>SHARE-IT</Typography>
            <ToggleTheme />
            <Button>Menu</Button>
        </Box>
    )
}
