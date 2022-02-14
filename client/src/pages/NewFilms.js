import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getNewFilms} from "../http/filmAPI";
import Header from "../components/Header";
import {Container, Table} from "react-bootstrap";

const NewFilms = observer(() => {
    const {film} = useContext(Context)

    useEffect(() => {
        getNewFilms().then(data => {
            film.setNewFilms(data)
            //console.log(film.getNewFilms)
        })
    }, [])

    return (
        <>
            <Header/>
            <Container className="d-flex flex-column p-3">
                <h2>Список новых фильмов</h2>
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
                    {film.getNewFilms.map(movie =>
                        <tr key={movie.idMovie}>
                            <td>{movie.nameMovie}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.year}</td>
                            <td>{movie.time}</td>
                            <td>{movie.ageLimit}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>
            {/*<p>NewFilms</p>*/}
        </>
    );
});

export default NewFilms;