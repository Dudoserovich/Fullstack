import React from 'react';
import Header from "../components/Header";
import {Container, ListGroup} from "react-bootstrap";
import {MOVIE_INFORMATION, NEW_FILMS} from "../utils/consts";

const Admin = () => {
    return (
        <>
            <Header/>
            <Container className="p-3">
                <h4>Добро пожаловать в Онлайн кинотеатр!</h4>
                <p>Как администратор вы можете:</p>
                <ListGroup>
                    <ListGroup.Item variant="warning" action href={MOVIE_INFORMATION}>
                        Добавлять/удалять/редактировать фильмы
                    </ListGroup.Item>
                    <ListGroup.Item variant="success" action href={NEW_FILMS}>
                        Посмотреть фильмы, выпущенные в текущем году
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" action href="#link">
                        Просмотреть выбор конкретного посетителя
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        </>
    );
};

export default Admin;