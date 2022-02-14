import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import {Context} from "../index";
import {createFilm, deleteFilm, getAllFilms, getFilms} from "../http/filmAPI";
import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {loginVisitor} from "../http/userAPI";
import {ADMIN_ROUTE} from "../utils/consts";

const Films = observer(() => {
    const {film} = useContext(Context)

    const typeUser = localStorage.getItem('typeUser')

    const genres = ['', 'Боевик', 'Вестерн', 'Гангстерский фильм', 'Детектив', 'Драма', 'Исторический фильм', 'Комедия', 'Мелодрама', 'Музыкальный фильм', 'Нуар', 'Приключенческий фильм', 'Трагедия', 'Трагигомедия', 'Триллер', 'Фэнтези', 'Фильм ужасов', 'Фильм-катастрофа', 'Криминал', 'Документальный']

    const yearLimits = ['6+', '12+', '16+', '18+']

    const [nameMovie, setNameMovie] = useState('')
    let g = typeUser === 'visitor' ?
        '' : genres[1]
    let y = typeUser === 'visitor' ?
        '' : yearLimits[0]

    const [genre, setGenre] = useState(g)
    const [year, setYear] = useState('')

    const [time, setTime] = useState('')
    const [yearLimit, setYearLimit] = useState(y)

    if (typeUser === 'admin') {
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

    const addFilm = async () => {
        try {
            if (year < 1980 || year > new Date().getFullYear())
                alert(`Введённый год выходит за диапазон 1980..${new Date().getFullYear()}`)
            else if (time < 30 || time > 180)
                alert(`Введённое время выходит за диапазон 30..180`)
            else {
                //console.log(genre + ' ' + yearLimit)
                let movie = {nameMovie, genre, year, time, ageLimit: yearLimit}
                //console.log(movie)
                await createFilm(movie)
                getAllFilms().then(data => {
                    film.setFilms(data)
                    //console.log(film.getNewFilms)
                })
            }
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
                <h2>{typeUser === 'admin' ?
                    'Список всех фильмов' : 'Поиск фильма'
                }
                </h2>
                {typeUser !== 'admin' ?
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
                        <h4 className="m-0 pb-2">Создать</h4>
                        <Form className="d-flex flex-column">
                            <Row className="align-items-center">
                                <Col>
                                    <Form.Control
                                        placeholder="Введите Название"
                                        value={nameMovie}
                                        onChange={e => setNameMovie(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Select
                                        placeholder="Введите Жанр"
                                        value={genre}
                                        onChange={e => setGenre(e.target.value)}
                                    >
                                        {genres.slice(1).map(g =>
                                            <option>{g}</option>
                                        )}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Control
                                        placeholder="Введите Год"
                                        value={year}
                                        onChange={e => setYear(e.target.value)}
                                    />
                                    <p style={{color: '#C0C0C0', marginBottom: 0}}>
                                        {`Год должен быть в диапазоне 1980..${new Date().getFullYear()}`}
                                    </p>
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder="Введите время"
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                    />
                                    <p style={{color: '#C0C0C0', marginBottom: 0}}>
                                        {`Время должно быть в диапазоне 30..180`}
                                    </p>
                                </Col>
                                <Col>
                                    <Form.Select
                                        placeholder="Введите Возрастное ограничение"
                                        value={yearLimit}
                                        onChange={e => setYearLimit(e.target.value)}
                                    >
                                        {yearLimits.map(y =>
                                            <option>{y}</option>
                                        )}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Button className="mt-1 mb-0 align-self-end"
                                    variant={"outline-success"}
                                    onClick={addFilm}
                            >
                                Добавить
                            </Button>
                        </Form>
                        <h4 className="pt-2">Фильмы</h4>
                    </>
                }
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Жанр</th>
                        <th>Год<br/>производства</th>
                        <th>Время</th>
                        <th>Возрастное<br/>ограничение</th>
                        {/*{typeUser === 'admin' ?
                            <>
                                <th> </th>
                                <th> </th>
                            </>
                        :
                            <th> </th>
                        }*/}
                    </tr>
                    </thead>
                    <tbody>
                    {film.getFilms.map(movie =>
                        <tr key={movie.idMovie}>
                            <td>{movie.nameMovie}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.year}</td>
                            <td>{movie.time}</td>
                            <td>{movie.ageLimit}</td>
                            {typeUser === 'admin' ?
                                <>
                                    <td
                                        style={{verticalAlign: 'middle'}}
                                    ><Button
                                        variant="outline-warning"
                                        style={{margin: 5}}
                                    >
                                        Изменить
                                    </Button></td>
                                    <td
                                        style={{verticalAlign: 'middle'}}
                                    ><Button
                                        variant="outline-danger"
                                        style={{margin: 5}}
                                        onClick={async () => {
                                            try {
                                                await deleteFilm(movie.idMovie)
                                                getAllFilms().then(data => {
                                                    film.setFilms(data)
                                                    //console.log(film.getNewFilms)
                                                })
                                            } catch (e) {
                                                alert(e.response.data.message)
                                            }
                                        }}
                                    >
                                        Удалить
                                    </Button></td>
                                </>
                                :
                                <td
                                    style={{verticalAlign: 'middle'}}
                                ><Button
                                    variant="outline-warning"
                                    style={{margin: 5}}
                                >
                                    Выбрать
                                </Button></td>
                            }
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