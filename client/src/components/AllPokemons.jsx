import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPokemons, getTypes} from '../redux/actions'
import Pagination from './Pagination'
import Pokemon from './Pokemon'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import triste from '../assets/triste.jpeg'
import styles from './AllPokemons.module.css'
import { Filter } from './Filter'


const AllPokemons = () => {

  const dispatch = useDispatch()

  const [order,setOrder] = useState()
  const [page,setPage] = useState(1)
  const [perPage]=useState(12)

  const lastPokemon = (page - 1) * perPage + perPage; //(1-1)*12+12=12
  const firstPoke = (page - 1) * perPage; // (1-1)*12 = 0

  // ? state.pokemons.slice(firstPoke,lastPokemon) :false
  const allPokemons = useSelector(state => state.pokemons? state.pokemons : false) 
  const loading = useSelector(state => state.loading)




  const max = Math.ceil(allPokemons.length / perPage)

  console.log(max)
    
  useEffect(() => {
    dispatch(getAllPokemons())
    dispatch(getTypes())
  },[dispatch])


  if(loading.length === 0){
    return (
      <Loading/>
    )
  } else{
    return (
      <div className={styles.c}> 
      <div className={styles.containerFilter}>
        <Filter order = {order} setOrder= {setOrder}/>

        <div className={styles.container}>
        {allPokemons.length === 0 ? ( 
          <div className={styles.containerError}>
            <p>¡POKEMON NOT FOUND!</p>
            <img src={triste} alt='NotFound'/>
          </div>
          
             ): allPokemons.slice(firstPoke,lastPokemon).map((p,index) => 
            <div key= {index} className={styles.containerCards} >
              <Link className={styles.link} key={index} to = {`/pokemons/${p.id}`}>
                <Pokemon  image={p.image} name={p.name} index = {index} types = {p.types} id ={p.id}/>
              </Link>
            </div>
           )}
        </div>
        

        
       
          <div> 
           <Pagination page={page} max={max} setPage = {setPage} />
          </div>
           
        
      </div>
    </div>
     
    )
  }

  }
    
  

export default AllPokemons