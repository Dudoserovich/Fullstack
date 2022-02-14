import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter, useLocation} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {checkVisitor} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {publicRoutes} from "./routes";

const App = observer(() => {
  const {user} = useContext(Context)

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

  return (
   /* <BrowserRouter>*/
      <AppRouter/>
    /*</BrowserRouter>*/
  );
})

export default App;
