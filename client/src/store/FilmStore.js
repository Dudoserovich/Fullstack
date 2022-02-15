import {makeAutoObservable} from "mobx";

export default class FilmStore {
    constructor() {
        this._films = []
        this._newFilms = []
        this._history = []

        makeAutoObservable(this)
    }

    setFilms(data) {
        this._films = data
    }

    get getFilms() {
        return this._films
    }

    setNewFilms(data) {
        this._newFilms = data
    }

    get getNewFilms() {
        return this._newFilms
    }

    setHistory(data) {
        this._history = data
    }

    get getHistory() {
        return this._history
    }
}