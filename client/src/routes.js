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
import Visitor from "./pages/Visitor";
import HistoryChoosen from "./pages/HistoryChoosen";
import NewFilms from "./pages/NewFilms";

export const authAdminRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    },
    {
        path: MOVIE_INFORMATION,
        element: <Films/>
    },
    {
        path: HISTORY,
        element: <HistoryChoosen/>
    },
    {
        path: NEW_FILMS,
        element: <NewFilms/>
    }
]

export const authVisitorRoutes = [
    {
        path: VISITOR_ROUTE,
        element: <Visitor/>
    },
    {
        path: VISITOR_CHOICE,
        element: <VISITOR_CHOICE/>
    },
    {
        path: MOVIE_INFORMATION,
        element: <Films/>
    },
    {
        path: HISTORY,
        element: <HistoryChoosen/>
    },
    {
        path: NEW_FILMS,
        element: <NewFilms/>
    }
]

export const publicRoutes = [
    {
        path: ADMIN_ROUTE + LOGIN_ROUTE,
        element: <AuthAdmin/>
    },
    {
        path: '/',
        element: <General/>
    },
    {
        path: VISITOR_ROUTE + LOGIN_ROUTE,
        element: <AuthVisitor/>
    },
    {
        path: VISITOR_ROUTE + REGISTRATION_ROUTE,
        element: <AuthVisitor/>
    }
]