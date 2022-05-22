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
import Post from '../../Components/Post'
import Sidebar from '../../Components/Sidebar'
import AlertContext from '../../Contexts/AlertContext'
import LoadingContext from '../../Contexts/LoadingContext'
import { getCategories, postCategory } from '../../services/categoryService'
import {
    getPublications,
    postPublication,
} from '../../services/publicationsService'

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

const emptyForm = {
    title: '',
    link: '',
    description: '',
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

    const [publications, setPublications] = useState([])

    const [refresh, setRefresh] = useState(true)

    const [form, setForm] = useState({
        ...emptyForm,
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

        startLoading()
        getPublications()
            .then((response) => {
                setPublications(response.data)
            })
            .catch(() => {
                setMessage('Houve um problema tente novamente mais tarde')
                setOpen(true)
            })
            .finally(stopLoading)
        // eslint-disable-next-line
    }, [refresh])

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
            .finally(() => {
                stopLoading()
                setRefresh(!refresh)
            })
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
        if (!form.link && !form.description) {
            setMessage('Favor preencher um colocar um link ou uma descrição')
            setOpen(true)
            return
        }
        const body = {
            ...form,
            text: form.description,
            categoryIds: categoriesSelected.map((category) => category.id),
        }
        delete body.description

        startLoading()
        postPublication(body)
            .then(() => {
                setForm({ ...emptyForm })
                setCategoriesSelected([])
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
            .finally(() => {
                stopLoading()
                setRefresh(!refresh)
            })
    }
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header />

            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 2,
                }}
            >
                <Box sx={{ minWidth: '60%' }}>
                    <Container component="form" onSubmit={handleSubmit}>
                        <Paper
                            elevation={1}
                            sx={{ padding: 1, maxWidth: '70vw' }}
                        >
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
                                                        selected =
                                                            category.title
                                                    }}
                                                >
                                                    <Checkbox
                                                        checked={
                                                            categoriesSelected
                                                                .map(
                                                                    (
                                                                        category
                                                                    ) =>
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
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Button type="submit">Publicar</Button>
                            </Box>
                        </Paper>
                    </Container>
                    <Container sx={{ marginTop: 5 }}>
                        <Box
                            sx={{
                                maxWidth: '70vw',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                            }}
                        >
                            {publications.map((post) => (
                                <Post
                                    key={post.id}
                                    setRefresh={setRefresh}
                                    refresh={refresh}
                                    post={post}
                                />
                            ))}
                        </Box>
                    </Container>
                </Box>
                <Sidebar refresh={refresh} />
            </Container>
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
        </Box>
    )
}
