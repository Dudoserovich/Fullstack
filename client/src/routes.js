import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE, HISTORY,
    LOGIN_ROUTE,
    MOVIE_INFORMATION, NEW_FILMS,
    REGISTRATION_ROUTE,
    VISITOR_CHOICE,
    VISITOR_ROUTE
} from "./utils/consts";
import Films from "./pages/Films";
import AuthAdmin from "./pages/AuthAdmin";
import General from "./pages/General";
import AuthVisitor from "./pages/AuthVisitor";
import RegistrationVisitor from "./pages/RegistrationVisitor";
import Visitor from "./pages/Visitor";
import HistoryChoosen from "./pages/HistoryChoosen";
import NewFilms from "./pages/NewFilms";

export const authAdminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MOVIE_INFORMATION,
        Component: Films
    },
    {
        path: HISTORY,
        Component: HistoryChoosen
    },
    {
        path: NEW_FILMS,
        Component: NewFilms
    }
]

export const authVisitorRoutes = [
    {
        path: VISITOR_CHOICE,
        Component: Visitor
    },
    {
        path: MOVIE_INFORMATION,
        Component: Films
    },
    {
        path: HISTORY,
        Component: HistoryChoosen
    },
    {
        path: NEW_FILMS,
        Component: NewFilms
    }
]

export const publicRoutes = [
    {
        path: ADMIN_ROUTE + LOGIN_ROUTE,
        Component: AuthAdmin
    },
    {
        path: '/',
        Component: General
    },
    {
        path: VISITOR_ROUTE + LOGIN_ROUTE,
        Component: AuthVisitor
    },
    {
        path: VISITOR_ROUTE + REGISTRATION_ROUTE,
        Component: RegistrationVisitor
    }
]