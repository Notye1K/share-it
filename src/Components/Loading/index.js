import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useContext } from 'react'

import LoadingContext from '../../Contexts/LoadingContext'

export default function Loading() {
    const { openLoading } = useContext(LoadingContext)

    return (
        <div>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
