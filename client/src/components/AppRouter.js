import React, {useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {authAdminRoutes, authVisitorRoutes, publicRoutes} from "../routes";
import {MOVIE_INFORMATION} from "../utils/consts";
import General from "../pages/General";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    console.log("auth: " + user.IsAuth + ", admin: " + user.IsAdmin)
    return (
        <Router>
            <Routes>
                {user.IsAuth && user.IsAdmin && authAdminRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element} exact />
                )}
                {user.IsAuth && !user.IsAdmin && authVisitorRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element} exact />
                )}
                {publicRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element} exact />
                )}
                <Route key="/" path="/" element={<General/>} />
                <Route key="*" path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Router>
    );
});

export default AppRouter;