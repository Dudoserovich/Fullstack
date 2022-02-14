import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAdmin = false
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
    }

    setUser(user) {
        this._user = user
    }

    get IsAuth() {
        return this._isAuth
    }

    get IsAdmin() {
        return this._isAdmin
    }

    get user() {
        return this._user
    }
}