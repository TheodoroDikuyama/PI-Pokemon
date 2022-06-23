import React from 'react'
import DashLoading from '../assets/ash-now.gif'
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.container}> 
      <img src={DashLoading} alt='Cargando'/>
    </div>
  )
}

export default Loading