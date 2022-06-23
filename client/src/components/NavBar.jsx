import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import styles from './NavBar.module.css'
import home from '../assets/home.png'
import create from '../assets/create.png'


export const NavBar = () => {
  return (

    <div className={styles.container} alt='PokemonHome'>
       <SearchBar/>
      <nav >
        <div className={styles.containerHome}>
          <Link  style={{textDecoration: 'inherit'}} to='/pokemons'>
          
            <span >  <img  className={styles.img} src={home} alt='home'/>HOME</span>
          </Link>
        </div>
        <div>
          <Link style={{textDecoration: 'inherit'}} to= '/pokemons/create'>
            <span  > <img className={styles.img} src={create} alt='home'/>CREATE</span></Link>
         </div>
      
        
      </nav>
       
    </div>
  )
}

export default NavBar

