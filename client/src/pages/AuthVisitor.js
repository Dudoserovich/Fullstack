import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, NavLink, Spinner} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, VISITOR_ROUTE} from "../utils/consts";
import {useLocation, useNavigate} from "react-router-dom";
import {checkVisitor, loginVisitor, registrationVisitor} from "../http/userAPI";
import {click} from "@testing-library/user-event/dist/click";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {publicRoutes} from "../routes";

const AuthVisitor = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()

    //console.log(location)
    const isLogin = location.pathname === (VISITOR_ROUTE + LOGIN_ROUTE)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            checkVisitor().then(() => {
                /*console.log(window.location.href.substr(21))*/
                console.log(publicRoutes.some(elem => elem.path === window.location.href.substr(21)))
                if (publicRoutes.some(elem => elem.path === window.location.href.substr(21)) && localStorage.getItem('typeUser')) {
                    localStorage.clear()
                    console.log('Я тута')
                } else if (localStorage.getItem('typeUser')) {
                    user.setUser(true)
                    user.setIsAuth(true)
                    user.setIsAdmin(false)
                }
            }).finally(() => setLoading(false))
        } catch (e) {
            console.log(e.response.data.message)
        }
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await loginVisitor(login, password, 'visitor')
            } else {
                data = await registrationVisitor(login, password, false)
            }
            user.setUser(user)
            user.setIsAuth(true)
            user.setIsAdmin(false)
            navigate(VISITOR_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
        console.log("auth: " + user.IsAuth + ", admin: " + user.IsAdmin)
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    {isLogin ? 'Авторизуйся как посетитель' : 'Регистрация посетителя'}
                </h2>

                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите логин"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Col className="d-flex mt-3 pl-3 pr-3 justify-content-between">
                        {isLogin ?
                        <div className="d-flex align-items-center">
                            Нет аккаунта?
                            <NavLink href={VISITOR_ROUTE + REGISTRATION_ROUTE}>
                                Зарегистрируйся!
                            </NavLink>
                        </div>
                            :
                            <div className="d-flex align-items-center">
                                Есть аккаунт?
                                <NavLink href={VISITOR_ROUTE + LOGIN_ROUTE}>
                                    Войдите!
                                </NavLink>
                            </div>
                        }
                        <div>
                        <Button className="align-self-end"
                                variant={"outline-danger"}
                                style={{marginRight: '4px'}} href="/"
                        >
                            Назад
                        </Button>
                        <Button className="align-self-end"
                                variant={"outline-success"}
                                onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                        </div>
                    </Col>
                </Form>
            </Card>
        </Container>
    );
});

export default AuthVisitor;