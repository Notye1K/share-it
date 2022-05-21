import axios from 'axios'

import { apiUrl } from './api'
import getConfig from './config'

export function postPublication(body) {
    return axios.post(apiUrl + `/publications`, body, getConfig())
}

export function getPublications() {
    return axios.get(apiUrl + `/publications`)
}

export function getLike(publicationId) {
    return axios.get(
        apiUrl + `/publications/${publicationId}/like`,
        getConfig()
    )
}

export function postLike(publicationId, like) {
    return axios.post(
        apiUrl + `/publications/${publicationId}/like`,
        like !== undefined && { like },
        getConfig()
    )
}
