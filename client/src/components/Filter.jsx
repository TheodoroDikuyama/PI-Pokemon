import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { orderByName,orderByAtack, orderByOrigin, orderByTypes} from '../redux/actions'
import styles from './Filter.module.css'
import reload from '../assets/reload.png'


export const Filter = ({order,setOrder}) => {

  const dispatch = useDispatch()

  const [, setType] = useState()
  
  const totalTypes = useSelector(state => state.types)
  
  const handleFilterName = (e) => {
    e.preventDefault()
    setOrder(e.target.value)
    dispatch(orderByName(order))
  }

  const handleFilterAtack= (e) => {
    e.preventDefault()
    setOrder(e.target.value)
    dispatch(orderByAtack(order))
  }

  const handleFilterOrigin = (e) => {
    e.preventDefault()
    dispatch(orderByOrigin(e.target.value))
  }

  const handleFilterType = (e) => {
    e.preventDefault()
    dispatch(orderByTypes(e.target.value))
    setType(e.target.value)
  }

  function handleReset() {
    window.location.reload();
  }


  return (
    <div className={styles.container}>
      <select
       defaultValue={'name'}
       onChange={(e) => handleFilterName(e)}
       >
        <option value='name'disabled>Filter By Name</option>
        <option value='aToZ'>atoZ</option> 
        <option value='ztoA'>ztoA</option>
      </select>

      <select
        defaultValue='atack'
        onChange={(e)=>handleFilterAtack(e)}
      >
        <option value='atack' disabled>Filter By Atack</option>
        <option value='minToMax'>minToMax</option>
        <option value='maxToMin'>maxToMin</option>
      </select>

      <select
        defaultValue='origin'
        onChange={(e) => handleFilterOrigin(e)}
      >
        <option value='origin' disabled>Filter By Origin</option>
        <option value='allOrigin'>All Origin</option>
        <option value='api'>Poke Api</option>
        <option value='db'>Created</option>
      </select>

      <select
            defaultValue="Types"
            onChange={(e) => handleFilterType(e)}
            id="type-select"
          >
            <option value="Types" disabled>
              Filter By Types
            </option>
            <option value="allTypes">
              All Types
            </option>
            {totalTypes &&
              totalTypes
                .sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((t) => (
                  <option  value={t.name} key={t.name}>
                    {t.name}
                  </option>
                ))}
      </select>

      <button  onClick={(e) => handleReset(e)} >
        <img src={reload} alt='reload'/>
        
      </button>
        
    </div>
  )
}
