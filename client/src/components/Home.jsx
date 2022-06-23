import React from 'react'
import AllPokemons from './AllPokemons'
import { NavBar } from './NavBar';
import styles from './Home.module.css'


export function Home () {
  return (
    <div className={styles.container}>
      <NavBar/> 
      <AllPokemons/>
    </div>
  )
}
