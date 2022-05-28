import './App.css'
import { useState } from 'react';
import React from 'react';
import Login from './componentes/Login';
import Inicio from './componentes/Inicio';
import Navbar from './componentes/Navbar';
import Tienda from './componentes/Tienda';
import Actividades from './componentes/Actividades';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

import { db, auth } from './firebase'

function App() {

  const [user, setUser] = React.useState(null)

  auth.onAuthStateChanged((usuario) => {
    if (usuario) {
      setUser(usuario)
      // console.log(usuario)
    } else {
      setUser(null)
    }
  });

  return (
    <>
      {
        user ?
          <Router>
            <Navbar></Navbar>
            <Routes>
              <Route path='/' exact element={<Inicio></Inicio>}></Route>
              <Route path='/gamificapp' exact element={<Inicio></Inicio>}></Route>
              <Route path='/tienda' exact element={<Tienda user={user}></Tienda>}></Route>
              <Route path='/actividades' exact element={<Actividades user={user}></Actividades>}></Route>
            </Routes>
          </Router>
          : <Login></Login>
      }

    </>
  );
}

export default App;
