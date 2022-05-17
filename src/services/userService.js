import axios from 'axios'

import { apiUrl } from './api'

export function login(body) {
    return axios.post(apiUrl + `/login`, body)
}
