import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {HISTORY, LOGIN_ROUTE, MOVIE_INFORMATION, NEW_FILMS, VISITOR_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const Header = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        const userRoute = localStorage.getItem('typeUser')
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
        console.log(user)
        navigate('/' + userRoute + LOGIN_ROUTE)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href={'/' + localStorage.getItem('typeUser')}>
                    {localStorage.getItem('typeUser')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav className="me-0">
                        <Nav.Link
                            className=
                                {window.location.href.substr(21) !== '/' + localStorage.getItem('typeUser')
                                    ? '': 'nav-link active'}
                            href={'/' + localStorage.getItem('typeUser')}>
                            {localStorage.getItem('typeUser') + " панель"}</Nav.Link>
                        {localStorage.getItem('typeUser') === 'admin' ?
                            <>
                                <Nav.Link className=
                                              {window.location.href.substr(21) !== MOVIE_INFORMATION
                                                  ? '': 'nav-link active'}
                                          href={MOVIE_INFORMATION}>
                                    Работа с фильмами
                                </Nav.Link>
                                <Nav.Link className=
                                              {window.location.href.substr(21) !== NEW_FILMS
                                                  ? '': 'nav-link active'}
                                          href={NEW_FILMS}>
                                    Список новых фильмов
                                </Nav.Link>
                                <Nav.Link href="#link">Выбор посетителей</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link className=
                                              {window.location.href.substr(21) !== MOVIE_INFORMATION
                                                  ? '': 'nav-link active'}
                                          href={MOVIE_INFORMATION}>
                                    Поиск фильма
                                </Nav.Link>
                                <Nav.Link className=
                                              {window.location.href.substr(21) !== HISTORY
                                                  ? '': 'nav-link active'}
                                          href={HISTORY}>
                                    История выбора
                                </Nav.Link>
                                <Nav.Link
                                    className=
                                        {window.location.href.substr(21) !== NEW_FILMS
                                            ? '': 'nav-link active'}
                                    href={NEW_FILMS}>Список новых фильмов
                                </Nav.Link>
                            </>
                        }
                        <Button className="justify-content-end"
                                variant={"outline-danger"}
                                style={{marginRight: '4px'}}
                                onClick={logOut}
                        >
                            Выйти
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default Header;