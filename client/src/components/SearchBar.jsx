import React, {useState} from 'react'
import { getNamePokemon } from '../redux/actions';
import {useDispatch} from 'react-redux'
import styles from './SearchBar.module.css'
import search from '../assets/search.png'



function SearchBar() {
    
    const [name, setName] = useState('')
    const dispatch = useDispatch()


    const handleInputChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
    
    }   

    const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(getNamePokemon(name.toLowerCase()))
    setName('')
    }   

    const onKeyDown = (e) => {
    if(e.keyCode === 13){
        dispatch(getNamePokemon(name.toLowerCase()))
        setName("")
    }
    }


    return (
        <div className={styles.container}>
           <div className={styles.containerInput}> 
              <input 
                value={name}
                type= 'text' 
                placeholder='Search Pokemon'
                onChange={(e) => handleInputChange(e)}
                onKeyDown={e => onKeyDown (e)}
                />

           </div>
             
                <div className={styles.containerButton}>
                  <button onClick={(e) => handleSubmit(e)} type='submit'><img src={search} alt='Search'/></button>
                </div>
                
   
    </div>
  )
}


export default SearchBar