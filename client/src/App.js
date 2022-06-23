import React from 'react'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import {Landing}  from './components/Landing';
import { Home } from './components/Home';
import {Details} from './components/Details'
import './App.css';
import { Create } from './components/Create';



function App() {
  return (
      <Router>
        
       <Routes>
          
          <Route exact path = {'/'} element = {<Landing/>} />
          <Route exact path={'/pokemons/create'} element = {<Create/>} />
          <Route exact path='/pokemons' element = {<Home/>}/>
          <Route exact path={'/pokemons/:id'} element = {<Details/>}/>
          </Routes>
      </Router>    
  );
}



export default App;
