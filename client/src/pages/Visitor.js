import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, ListGroup} from "react-bootstrap";
import {HISTORY, LOGIN_ROUTE, MOVIE_INFORMATION, NEW_FILMS, REGISTRATION_ROUTE, VISITOR_ROUTE} from "../utils/consts";
import {useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {authVisitorRoutes} from "../routes";
import Header from "../components/Header";

const Visitor = observer (() => {
    const {user} = useContext(Context)

    console.log(authVisitorRoutes)

    return (
        <>
            <Header/>
            <Container className="p-3">
                <h4>Добро пожаловать в Онлайн кинотеатр!</h4>
                <p>Как посетитель вы можете:</p>
                <ListGroup>
                    <ListGroup.Item variant="warning" action href={MOVIE_INFORMATION}>
                        Найти фильм
                    </ListGroup.Item>
                    <ListGroup.Item variant="success" action href={HISTORY}>
                        Посмотреть свою историю выбора
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" action href={NEW_FILMS}>
                        Просмотреть список новых фильмов
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        </>
    );
});

export default Visitor;