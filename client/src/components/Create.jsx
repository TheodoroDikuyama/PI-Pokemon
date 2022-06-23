import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postPokemon,getAllPokemons,getTypes } from '../redux/actions'
import { Link, useNavigate } from "react-router-dom"
import styles from './Create.module.css'
import x from '../assets/delete.png'
import home from '../assets/home.png'


function validateForm (input){

    let regularExpresion = /^-?\d*(\.\d+)?$/
    let errors = {}
    let errorNumber = 'Numbers betwen 1 and 999'
    let errorN ='Only numbers are allowed'

    

    if(!input.name){
        errors.name = errorNumber
    } else if(!/^[a-zA-Zñáéíóúü]*$/.test(input.name)){
        errors.name = 'The name cannot contain special characters or numbers'
    }

    if(input.atack < 1|| input.atack > 999){
        errors.atack = errorNumber
    } else if (!regularExpresion.test(input.atack)) {
        errors.atack = errorN
    }

    if(input.defense< 1|| input.defense > 999){
        errors.defense = errorNumber
    } else if (!regularExpresion.test(input.defense)) {
        errors.defense = errorN
    }

    if(input.hp< 1|| input.hp > 999){
        errors.hp = errorNumber
    } else if (!regularExpresion.test(input.hp)) {
        errors.hp = errorN
    }

    
    if(input.speed< 1|| input.speed > 999){
        errors.speed = errorNumber
    } else if (!regularExpresion.test(input.speed)) {
        errors.speed = errorN
    }

    if(input.weight< 1|| input.weight > 999){
        errors.weight = errorNumber
    } else if (!regularExpresion.test(input.weight)) {
        errors.weight = errorN
    }

    if(input.height< 1|| input.height > 999){
        errors.height = errorNumber
    } else if (!regularExpresion.test(input.height)) {
        errors.height = errorN
    }

    if (!input.types) {
        errors.types = "You must select at least one type.";
      } else if (input.types.length > 2) {
        errors.types = "only maximum two types are allowed";
      }
    return errors  
}

export const Create = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const allPokemons = useSelector(state => state.pokemons)
    const Stypes = useSelector(state => state.types)

    const [errors,setErrors] = useState({})

    const [input, setInput] = useState({
        name:'',
        atack: '',
        defense:'',
        hp:'',
        speed:'',
        weight: '',
        height: '',
        types: []
    })

    useEffect(()=>{
        dispatch(getAllPokemons())
        dispatch(getTypes())
    },[dispatch])

   

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : [e.target.value]
        }) 
        setErrors(validateForm({
            ...input,
            [e.target.name] : [e.target.value]
        })    
        )
    }


    const handleSubmit = (e) => {
        e.preventDefault()


        let onePokemon = allPokemons?.filter( p => p.name.toLowerCase() === input.name.toString().toLowerCase())
        
        

        if(onePokemon.length !== 0){
            return alert ('Name already exists!')
        }else if (Object.keys(errors).length !==0 ) {
            return alert(Object.values(errors))
        }else if (Object.values(input)[0] === ''){
            return alert('Enter all the values')
        } else  {
            const newPokemon = {
                name: input.name,
                atack: input.atack,
                defense: input.defense,
                hp: input.hp,
                weight: input.weight,
                height: input.height,
                types: input.types
            }
            console.log(newPokemon)
            dispatch(postPokemon(newPokemon))
        }
    
        setInput({
            name:'',
            atack: '',
            defense:'',
            hp:'',
            speed: '',
            weight: '',
            height: '',
            types: []
        })

        return(alert ('Pokemon created successfully!'),navigate('/pokemons'))    
    }


    const handleTypesChange = (e) => {
        setInput({ 
            ...input, 
            types: [...input.types, e.target.value] 
          });
        
        console.log(input.types? input.types : 'vacio')
    }

    const handleDeleteType = (el) => {
        setInput({
            ...input,
            types: input.types.filter(t => t !== el),
          });
          return (alert('Borrado con exito'))
    }

  
  return (
    <div style={{background:'#f0f0f0'}}>
        
        <Link  style={{textDecoration: 'inherit'}} to='/pokemons'>
          <span className={styles.span}>  <img src={home} alt='home'/></span>
          
        </Link>

        <div className={styles.container}>
           
            <p>¡Create Your Pokemon!</p>

            <div className={styles.containerForm}> 
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            placeholder='Enter the name of your pokemon...'
                            onChange={(e) => handleInputChange(e)}
                            value= {input.name}
                            type = 'text'
                            name = 'name'
                        />
                        {
                            errors.name && (<span>{errors.name}</span>)
                        }
                    </div>
            
                    <div>
                        <label>Atack</label>
                        <input
                            placeholder='Enter the attack of your pokemon...'
                            onChange={(e) => handleInputChange(e)}
                            value={input.atack}
                            type = 'text'
                            name = 'atack'
                            />
                            {
                                errors.atack &&(<span>{errors.atack}</span>)
                            }
                    </div>

                    <div>
                        <label>Defense</label>
                        <input
                            placeholder='Enter the defense of your pokemon...'
                            onChange={(e) => handleInputChange(e)}
                            value={input.defense}
                            type = 'text'
                            name = 'defense'
                        />
                        {
                            errors.defense &&(<span>{errors.defense}</span>)
                         }
                    </div>

                    <div>
                        <label>Hp</label>
                        <input
                            placeholder='Enter the hp of your pokemon...'
                            onChange={(e) => handleInputChange(e)}
                            value={input.hp}
                            type = 'text'
                            name = 'hp'
                        />
                        {
                            errors.hp &&(<span>{errors.hp}</span>)
                        }
                    </div>

                    <div>
                        <label>Speed</label>
                        <input
                            placeholder='Enter the speed of your pokemon...'
                            onChange={(e) => handleInputChange(e)}
                            value={input.speed}
                            type = 'text'
                            name = 'speed'
                        />
                        {
                            errors.speed &&(<span>{errors.speed}</span>)
                        }
                    </div>

            
                    <div>
                        <label>Weight</label>
                        <input
                            placeholder='Enter the weight of your pokemon...'
                            onChange={(e) => handleInputChange(e)}
                            value={input.weight}
                            type = 'text'
                                name = 'weight'
                        />
                        {
                            errors.weight &&(<span>{errors.weight}</span>)
                         }
                    </div>

                    <div>
                        <label>Height</label>
                        <input
                            placeholder='Enter the height of your pokemon...'
                            onChange={(e) => handleInputChange(e)}
                            value={input.height}
                            type = 'text'
                            name = 'height'
                        />
                        {
                            errors.height &&(<span>{errors.height}</span>)
                        }
                    </div>

       
                    <div>
                        {input.types?.length === 0 ? (
                            <p>Select up to two types! </p>
                            ) : input.types.length > 2 ? (
                                <p>Maximum types: 2</p>
                            ) : null} 
                
                        <select 
                            name="types"
                            onChange={handleTypesChange}
                            multiple={false}
                            defaultValue='Select type'
                        >
                            <option value='Select type'disabled>Select Type</option>
                            {Stypes?.map((e) => (
                                <option key={e.id} value={e.name}>{e.name}</option>
                            ))}
                        </select>
                
                        <h5>
                        {input.types?.map((el,index) => (
                            <div className ={styles.containerButtonX}key={index}> 
                            <p>{el}
                                <button type='button' onClick={(e) => handleDeleteType(el)}>    
                                    <img src={x} alt='delete'/>
                                </button>
                            </p>      
                            </div>
                        ))}
                        </h5>
                    </div>

                    <div className={styles.containerButtonCreate}>
                        <button type='submit'>CREATE</button>
                    </div>   
                </form>       
            </div>

        </div>

        <span >.</span>
        

       
      
    </div>
)}


