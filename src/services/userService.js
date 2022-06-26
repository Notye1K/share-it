import axios from 'axios'

import { apiUrl } from './api'
import getConfig from './config'

export function login(body) {
    return axios.post(apiUrl + `/login`, body)
}

export function register(body) {
    return axios.post(apiUrl + `/register`, body)
}

export function checkToken() {
    return axios.get(apiUrl + `/users/user/check`, getConfig())
}
