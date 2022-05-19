import axios from 'axios'

import { apiUrl } from './api'
import getConfig from './config'

export function postCategory(title) {
    return axios.post(apiUrl + `/categories`, { title }, getConfig())
}

export function getCategories() {
    return axios.get(apiUrl + `/categories`)
}
