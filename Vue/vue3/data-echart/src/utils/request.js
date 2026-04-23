import api from './axio_config.js'

export const getData = () => {
    return api({
        url: '/visualization',
        method: 'get'
    })
}
