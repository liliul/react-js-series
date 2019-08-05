import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import Header from './Header'
import Generos from './Generos'
import Novogenero from './Novogenero'
import Editargenero from './Editargenero'
import Series from './Series'
import Novaserie from './Novaserie'
import Infoserie from './Infoserie'

import {
  BrowserRouter as Router,
  Route,
  Switch
}from 'react-router-dom'

//Router
const Home = () => {
  return <h1>Home</h1>
}




function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Generos} />
          <Route path='/generos/novo' exact component={Novogenero} />
          <Route path='/generos/:id' exact component={Editargenero} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/novo' exact component={Novaserie} />
          <Route path='/series/:id' exact component={Infoserie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
