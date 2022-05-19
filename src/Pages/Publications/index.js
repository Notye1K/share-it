import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Modal,
    OutlinedInput,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import AlertContext from '../../Contexts/AlertContext'
import LoadingContext from '../../Contexts/LoadingContext'
import { getCategories, postCategory } from '../../services/categoryService'

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.default',
    color: 'text.primary',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

let selected = ''
export default function Publications() {
    const { setOpen, setMessage } = useContext(AlertContext)
    const { stopLoading, startLoading } = useContext(LoadingContext)

    const [categories, setCategories] = useState([])
    const [categoriesSelected, setCategoriesSelected] = useState([])

    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)
    const [createCategoryInput, setCreateCategoryInput] = useState('')

    const [form, setForm] = useState({
        title: '',
        link: '',
        description: '',
    })

    useEffect(() => {
        startLoading()
        getCategories()
            .then((response) => {
                setCategories(
                    response.data.sort((a, b) => {
                        if (a.title > b.title) {
                            return 1
                        }
                        if (a.title < b.title) {
                            return -1
                        }
                        return 0
                    })
                )
            })
            .catch(() => {
                setMessage('Houve um problema tente novamente mais tarde')
                setOpen(true)
            })
            .finally(stopLoading)
        // eslint-disable-next-line
    }, [])

    const handleChangeForm = (prop) => (event) => {
        setForm({ ...form, [prop]: event.target.value })
    }

    function createCategoryChange(event) {
        setCreateCategoryInput(event.target.value)
    }

    function createCategoryButtonClick() {
        startLoading()
        postCategory(createCategoryInput)
            .then(() => {
                handleCloseModal()
                setCreateCategoryInput('')
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

    const handleChange = (event) => {
        const {
            target: { value },
        } = event
        if (
            categoriesSelected.length >= 3 &&
            categoriesSelected
                .map((category) => category.title)
                .every((name) => name !== selected)
        ) {
            setMessage('No máximo 3 categorias')
            setOpen(true)
            return
        }
        setCategoriesSelected(
            typeof value === 'string' ? value.split(',') : value
        )
    }
    function handleSubmit(event) {
        event.preventDefault()
        // TODO:
    }
    return (
        <>
            <Header />

            <Box>
                <Container component="form" onSubmit={handleSubmit}>
                    <Paper elevation={3} sx={{ padding: 1 }}>
                        <Box
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
                                value={form.title}
                                onChange={handleChangeForm('title')}
                                required
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel id="demo-multiple-checkbox-label">
                                        Categorias
                                    </InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={categoriesSelected}
                                        onChange={handleChange}
                                        input={
                                            <OutlinedInput label="Categorias" />
                                        }
                                        renderValue={(selected) =>
                                            selected
                                                .map((value) => value.title)
                                                .join(', ')
                                        }
                                        MenuProps={MenuProps}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem
                                                key={category.title}
                                                value={category}
                                                onClick={() => {
                                                    selected = category.title
                                                }}
                                            >
                                                <Checkbox
                                                    checked={
                                                        categoriesSelected
                                                            .map(
                                                                (category) =>
                                                                    category.title
                                                            )
                                                            .indexOf(
                                                                category.title
                                                            ) > -1
                                                    }
                                                />
                                                <ListItemText
                                                    primary={category.title}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button onClick={handleOpenModal}>+</Button>
                            </Box>
                            <TextField
                                id="outlined-basic"
                                label="link"
                                variant="outlined"
                                type="url"
                                value={form.link}
                                onChange={handleChangeForm('link')}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="descrição"
                                variant="outlined"
                                multiline
                                rows={3}
                                inputProps={{ maxLength: 300 }}
                                helperText={`caracteres restantes ${
                                    300 - form.description.length
                                }`}
                                value={form.description}
                                onChange={handleChangeForm('description')}
                            />
                        </Box>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                            <Button type="submit">Publicar</Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Criar categoria
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        De preferencia para categorias já criadas se não houver
                        nenhuma que te satisfaça crie uma.
                    </Typography>
                    <Container sx={{ marginTop: 2 }}>
                        <TextField
                            id="outlined-basic"
                            label="categoria"
                            variant="outlined"
                            value={createCategoryInput}
                            onChange={createCategoryChange}
                        />
                        <Button onClick={createCategoryButtonClick}>
                            Criar
                        </Button>
                    </Container>
                </Box>
            </Modal>
        </>
    )
}
