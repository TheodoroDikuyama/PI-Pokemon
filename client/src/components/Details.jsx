import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../redux/actions'
import { useParams } from 'react-router-dom'
import loading from '../assets/loading.gif'
import styles from './Details.module.css'
import home from '../assets/home.png'
import { Link } from "react-router-dom"



export const Details = () => {


  const params = useParams()
  

  const dispatch = useDispatch()

  const pokeDetails = useSelector(state => state.details)
  


  useEffect(()=>{
    dispatch(getDetail(params.id))
  },[dispatch,params.id])

  
  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };
  
  const color = typeColor[pokeDetails?.types[0]]
  
  if(!pokeDetails){
    return(
      <div>
        <img src={loading} alt='loading'/>
      </div>
    )
  } else{
    return (
      <div  style ={{background:`${color}`}} className={styles.container1}>
        <Link  style={{textDecoration: 'inherit'}} to='/pokemons'>
          <span className={styles.span}>  <img  className={styles.img} src={home} alt='home'/></span>
        </Link>
        <div className={styles.container} >
          <div className={styles.containerCard} style ={{background: `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`}}>
            <p className={styles.hp}><span>HP </span>{pokeDetails.hp}</p>
            <img src={pokeDetails.image} alt='Detail'/>
            <h2 className={styles.name} type='number'>{pokeDetails.name[0].toUpperCase()+pokeDetails.name.substring(1)}</h2>
            <div className={styles.types}>
            {pokeDetails.types?.length === 2 ? (
               <span style={{background: `${color}`}} >
                {typeof pokeDetails.types[0] === 'string' ? pokeDetails.types[0] : pokeDetails.types[0]?.name}-    
                {typeof pokeDetails.types[1] === 'string' ? pokeDetails.types[1] : pokeDetails.types[1]?.name}
               </span>) 
              : (
                <span style={{background: `${color}`}}>
                  {typeof pokeDetails.types[0] === 'string' ? pokeDetails.types[0] : pokeDetails.types[0]?.name}
                </span>
              )}
            </div>

            <div className={styles.stats}>
              <div>
                <h3>{pokeDetails.atack}</h3>
                <p>Atack</p>
              </div>
              <div>
                <h3>{pokeDetails.defense}</h3>
                <p>Defense</p>
              </div>
              <div>
                <h3>{pokeDetails.weigth}</h3>
                <p>Weight</p>
              </div>
              <div>
                <h3>{pokeDetails.height}</h3>
                <p>Height</p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
  )}
 
}
