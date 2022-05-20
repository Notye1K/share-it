import axios from 'axios'

import { apiUrl } from './api'
import getConfig from './config'

export function postPublication(body) {
    return axios.post(apiUrl + `/publications`, body, getConfig())
}

export function getPublications() {
    return axios.get(apiUrl + `/publications`)
}
