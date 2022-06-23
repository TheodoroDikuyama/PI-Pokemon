import React from 'react'
import  styles from './Pokemon.module.css'

const Pokemon = ({image,name,types,index,id}) => {

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
  
  console.log(types)
  const color = typeColor[types[0]]

  // console.log(color)


  return (
    <div className={styles.container}>      
      <div className={styles.containerCard} style ={{background: `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`}} >

        {id.toString().length === 2 ? (<p className={styles.id}><span>N {id}</span></p>) : (<p className={styles.id}><span>N 0{id}</span></p>)}
        <img src={image} alt ='PokeImg'/> 
        <h2 className={styles.name} key = {index}>{name[0].toUpperCase()+name.substring(1)}</h2>
            
        <div className={styles.types}>
          {types.length === 2 ? (
            <span style={{background: `${color}`}} >
              {typeof types[0] === 'string' ? types[0] : types[0]?.name}-
              {typeof types[1] === 'string' ? types[1] : types[1]?.name}
            </span>) 
            : (
              <span style={{background: `${color}`}} >
                {typeof types[0] === 'string' ? types[0] : types[0]?.name}
              </span>
              )
            }
        </div>
          
            
            
          </div>
    </div>
  )
}

export default Pokemon