import {$authHost, $host} from "./index";

export const createChoose = async (idMovie) => {
    const {data} = await $authHost.post(`api/visitorChoice`, {idFilm: idMovie})
    return data
}

export const getOneChoose = async () => {
    const {data} = await $authHost.get(`api/visitorChoice`)
    return data
}

export const getAllChoose = async () => {
    const {data} = await $authHost.get(`api/visitorChoice`)
    return data
}