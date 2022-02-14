import React, {useContext} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import Admin from "./Admin";
import AuthAdmin from "./AuthAdmin";
import {ADMIN_ROUTE, LOGIN_ROUTE, VISITOR_ROUTE} from "../utils/consts";
import {Context} from "../index";

const General = () => {

    return (
        <Container className="p-3 d-flex justify-content-center align-items-center"
                   style={{flexDirection: 'column', height: window.innerHeight}}>
            <h2>Войти как</h2>

            <div style={{display: 'flex', justifyContent: 'center', padding: '5px'}}>
                <Button variant="primary" style={{marginRight: '4px'}} href={ADMIN_ROUTE + LOGIN_ROUTE}>
                    Администратор
                </Button>

                <Button variant="success" href={VISITOR_ROUTE + LOGIN_ROUTE}>
                    Посетитель
                </Button>
            </div>
        </Container>
    );
};

export default General;