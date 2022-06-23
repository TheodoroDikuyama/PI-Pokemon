import React from 'react'
import { useState } from 'react'
import styles from './Pagination.module.css'
import next from '../assets/next.png'
import previous from '../assets/previous.png'

export const Pagination = ({page,setPage,max}) => {

  const [input,setInput] = useState(1)

  const nextPage = () => {
    setInput(parseInt(input) + 1)
    setPage(parseInt(page) + 1)
  }

  const previousPage = () => {
    setInput(parseInt(input) - 1)
    setPage(parseInt(page) - 1)
  }

  const onKeyDown = (e) => {
    if(e.keyCode === 13){
      setPage(parseInt(e.target.value))
      if(
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > max ||
        isNaN(parseInt(e.target.value))
      ){
        setPage(1)
        setInput(1)
      }else {
        setPage(parseInt(e.target.value))
      }
    }
  }

  const onChange = (e) => {
    setInput(e.target.value)
  }




  return (
    <div className={styles.container}>
      <button disabled={page === 1 || page< 1} onClick={previousPage}>
        <img src={previous} alt = 'previous'/>
      </button>
      <input
        onChange={e => onChange (e)}
        onKeyDown={e => onKeyDown (e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p> de {max} </p>
      <button
        disabled={page === max|| page > max}
        onClick={nextPage}
      >
        <img src={next} alt = 'next'/>

      </button>
    </div>
  )
}

export default Pagination