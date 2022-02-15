import React, {useContext, useEffect} from 'react';
import Header from "../components/Header";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Container, Table} from "react-bootstrap";
import {deleteFilm, getAllFilms} from "../http/filmAPI";
import {getAllChoose} from "../http/chooseAPI";

const HistoryChoosen = observer (() => {
    const {film} = useContext(Context)
    const typeUser = localStorage.getItem('typeUser')

    if (typeUser !== 'admin') {
        useEffect(() => {
            getAllChoose().then(data => {
                film.setHistory(data)
                //console.log(film.getHistory.length)
                //console.log(film.getNewFilms)
            })
        }, [])
    }

    return (
        <>
            <Header/>
            <Container>
                <h2>{typeUser === 'admin' ?
                    'Выбор посетителей' : 'Ваш выбор'
                }
                </h2>
                {film.getHistory.length === 0 ?
                    'Вы пока ничего не выбирали!'
                    :
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Дата выбора</th>
                        <th>Название</th>
                        <th>Жанр</th>
                        <th>Год<br/>производства</th>
                        <th>Время</th>
                        <th>Возрастное<br/>ограничение</th>
                    </tr>
                    </thead>
                    <tbody>
                    {film.getHistory.map(movie =>
                            <tr key={movie.idMovie}>
                                <td>{"Дата: " + new Date(movie.dateVisit).toLocaleDateString() + ", Время: " +
                                new Date(movie.dateVisit).toLocaleTimeString()}</td>
                                <td>{movie.nameMovie}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.year}</td>
                                <td>{movie.time}</td>
                                <td>{movie.ageLimit}</td>
                            </tr>)}
                    </tbody>
                </Table>
                }
            </Container>
        </>
    );
});

export default HistoryChoosen;