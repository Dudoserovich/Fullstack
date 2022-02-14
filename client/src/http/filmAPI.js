import {$authHost, $host} from "./index";

export const createFilm = async (film) => {
    const {data} = await $authHost.post(`api/movieInformation`, film)
    return data
}

export const refreshFilm = async (film) => {
    const {data} = await $authHost.put(`api/movieInformation`, film)
    return data
}

export const deleteFilm = async (idMovie) => {
    const {data} = await $authHost.delete(`api/movieInformation${'?idMovie='+ idMovie}`)
    return data
}

export const getFilms = async (nameMovie, genre, year) => {
    const {data} = await $authHost.get(`api/movieInformation${'?nameMovie=' + nameMovie.toString() + '&genre=' + genre.toString() + '&year=' + year.toString()}`)
    return data
}

export const getAllFilms = async () => {
    const {data} = await $authHost.get(`api/movieInformation`)
    return data
}

export const getNewFilms = async () => {
    const {data} = await $authHost.get(`api/movieInformation/newFilms?year=${new Date().getFullYear()}`)
    return data
}