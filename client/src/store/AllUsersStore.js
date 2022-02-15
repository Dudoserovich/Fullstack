import {makeAutoObservable} from "mobx";

export default class AllUsersStore {
    constructor() {
        this._users = []

        makeAutoObservable(this)
    }

    setUsers(data) {
        this._users = data
    }

    get getUsers() {
        return this._users
    }
}