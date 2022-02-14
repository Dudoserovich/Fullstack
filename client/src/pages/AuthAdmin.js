import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Spinner} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, VISITOR_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useLocation, useNavigate} from "react-router-dom";
import {checkVisitor, loginVisitor, registrationVisitor} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {publicRoutes} from "../routes";

const AuthAdmin = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()

    //console.log(location)
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
                    user.setIsAdmin(localStorage.getItem('typeUser') === 'admin')
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
            let data = await loginVisitor(login, password, 'admin')
            user.setUser(user)
            user.setIsAuth(true)
            user.setIsAdmin(true)
            navigate(ADMIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
        console.log("auth: " + user.IsAuth + ", admin: " + user.IsAdmin)
    }

    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">
                        Авторизуйся как администратор
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
                        <div className="d-flex align-self-end">
                            <Button className="mt-3 align-self-end"
                                    variant={"outline-danger"}
                                    style={{marginRight: '4px'}} href="/"
                            >
                                Назад
                            </Button>
                            <Button className="mt-3 align-self-end"
                                    variant={"outline-success"}
                                    onClick={click}
                            >
                                Войти
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
});

export default AuthAdmin;