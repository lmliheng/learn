import api from './axio_.js'

const datalazy_1 = () => {
    return api({
        url: 'data-lazy/01',
        method: 'get',
    })
}

const datalazy_2 = () => {
    return api({
        url: 'data-lazy/02',
        method: 'get',
    })
}


const datalazy_3 = () => {
    return api({
        url: 'data-lazy/03',
        method: 'get',
    })
}

const imgLazy = () => {
    return api({
        url: '/img-lazy',
        method: 'get',
    })
}

export {
    datalazy_1,
    datalazy_2,
    datalazy_3,
    imgLazy,
}