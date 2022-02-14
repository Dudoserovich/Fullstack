import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const registrationVisitor = async (login, password, isAdmin) => {
    if (!isAdmin) {
        const {data} = await $host.post(`api/visitor/registration`, {login, password})
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } else
        alert('Нельзя зарегистрировать новый аккаунт администратора!')
}

export const loginVisitor = async (login, password, typeUser) => {
    const {data} = await $host.post(`api/${typeUser}/login`, {login, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('typeUser', typeUser)
    return jwt_decode(data.token)
}

export const checkVisitor = async () => {
    if (localStorage.getItem('typeUser')) {
        const {data} = await $authHost.get(`api/${localStorage.getItem('typeUser')}/auth`)
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
}