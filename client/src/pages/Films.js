import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import {Context} from "../index";
import {getAllFilms, getFilms} from "../http/filmAPI";
import {observer} from "mobx-react-lite";
import {Button, Container, Form, Table} from "react-bootstrap";
import {loginVisitor} from "../http/userAPI";
import {ADMIN_ROUTE} from "../utils/consts";

const Films = observer(() => {
    const {film} = useContext(Context)

    const genres = ['', 'Боевик', 'Вестерн', 'Гангстерский фильм', 'Детектив', 'Драма', 'Исторический фильм', 'Комедия', 'Мелодрама', 'Музыкальный фильм', 'Нуар', 'Приключенческий фильм', 'Трагедия', 'Трагигомедия', 'Триллер', 'Фэнтези', 'Фильм ужасов', 'Фильм-катастрофа', 'Криминал', 'Документальный']

    const [nameMovie, setNameMovie] = useState('')
    const [genre, setGenre] = useState('')
    const [year, setYear] = useState('')

    if (localStorage.getItem('typeUser') === 'admin') {
        useEffect(() => {
            getAllFilms().then(data => {
                film.setFilms(data)
                //console.log(film.getNewFilms)
            })
        }, [])
    }
    const search = async () => {
        try {
            let data = await getFilms(nameMovie, genre, year)
            film.setFilms(data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

/*    const select = async () => {
        try {
            await
        } catch (e) {
            alert(e.response.data.message)
        }
    }*/

    return (
        <>
            <Header/>
            <Container className="d-flex flex-column p-3">
                <h2>{localStorage.getItem('typeUser') === 'admin' ?
                    'Список всех фильмов' : 'Поиск фильма'
                }
                </h2>
                {localStorage.getItem('typeUser') !== 'admin' ?
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите Название"
                            value={nameMovie}
                            onChange={e => setNameMovie(e.target.value)}
                        />
                        <Form.Select
                            className="mt-3"
                            placeholder="Введите Жанр"
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        >
                            {genres.map(g =>
                                <option>{g}</option>
                            )}
                        </Form.Select>
{/*                        <Form.Control
                            className="mt-3"
                            placeholder="Введите Жанр"
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        />*/}
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите Год"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                        />
                        <p style={{color: '#C0C0C0', marginBottom: 0}}>
                            {`В систематическом каталоге собраны фильмы с 1980 по ${new Date().getFullYear()} год`}
                        </p>
                        <Button className="mt-1 mb-3 align-self-end"
                                variant={"outline-success"}
                                onClick={search}
                        >
                            Найти
                        </Button>
                    </Form>
                    :
                    <>
                    </>
                }
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Жанр</th>
                        <th>Год производства</th>
                        <th>Время</th>
                        <th>Возрастное ограничение</th>
                    </tr>
                    </thead>
                    <tbody>
                    {film.getFilms.map(movie =>
                        <tr key={movie.idMovie}>
                            <td /*{localStorage.getItem('typeUser') !== 'admin' ?
                                onclick() : ''}*/>{movie.nameMovie}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.year}</td>
                            <td>{movie.time}</td>
                            <td>{movie.ageLimit}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>
            {/*<p>Films</p>*/}
        </>
    );
});

export default Films;