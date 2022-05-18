import {
    Box,
    Checkbox,
    Container,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    TextField,
} from '@mui/material'
import { useContext, useState } from 'react'
import Header from '../../Components/Header'
import AlertContext from '../../Contexts/AlertContext'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
]

let selected = ''
export default function Publications() {
    const [personName, setPersonName] = useState([])
    const { setOpen, setMessage } = useContext(AlertContext)

    const handleChange = (event) => {
        const {
            target: { value },
        } = event
        if (
            personName.length >= 3 &&
            personName.every((name) => name !== selected)
        ) {
            setMessage('No máximo 3 categorias')
            setOpen(true)
            return
        }
        setPersonName(typeof value === 'string' ? value.split(',') : value)
    }
    return (
        <>
            <Header />

            <Box>
                <Container>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1em',
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="titulo"
                            variant="outlined"
                            required
                        />
                        <FormControl>
                            <InputLabel id="demo-multiple-checkbox-label">
                                Categorias
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Categorias" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        onClick={() => (selected = name)}
                                    >
                                        <Checkbox
                                            checked={
                                                personName.indexOf(name) > -1
                                            }
                                        />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-basic"
                            label="link"
                            variant="outlined"
                            type="url"
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="descrição"
                            variant="outlined"
                            multiline
                            rows={3}
                            inputProps={{ maxLength: 300 }}
                            helperText={`caracteres restantes 300`}
                        />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}
