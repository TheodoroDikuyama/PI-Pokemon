import React from 'react'
import styles from './Landing.module.css'
import {Link} from 'react-router-dom'


export function Landing() {
  return (
    <div class={styles.landing}>
      <Link to ='/pokemons'>
          <button className={styles.btn} >
            <span id='span1'></span>
            <span id='span2'></span>
            <span id='span3'></span>
            <span id='span4'></span>
            HOME
            </button>
      </Link>
    </div>
     
  )
}
