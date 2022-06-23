import axios from 'axios'

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_NAME = "GET_NAME"
export const GET_DETAILS = "GET_DETAILS"
export const POST_POKEMONS = "POST_POKEMONS"
export const GET_TYPES = "GET_TYPES"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const RESET_DETAIL ="RESET_DETAIL"
export const ORDER_BY_ATACK = "ORDER_BY_ATACK"
export const ORDER_BY_ORIGIN = "ORDER_BY_ORIGIN"
export const ORDER_BY_TYPES = "ORDER_BY_TYPES"

export const getAllPokemons = () =>  async dispatch => {
  try {
    const rta = await fetch('http://localhost:3001/pokemons')
    const json = await rta.json()
    return dispatch({ type: GET_ALL_POKEMONS, payload: json })
  } catch (error) {
    console.log(error)
    return alert('No se han podido cargar los pokemones, intente mas tarde')
  }
}
    

export const getNamePokemon = (name) => async (dispatch) => {
  try {
    const rta = await fetch(`http://localhost:3001/pokemons?name=${name}`)
    const json = await rta.json()
    return dispatch({ type: GET_NAME, payload: json })  
  } catch (error) {
    console.log(error)
    return alert('No se ha encontrado el pokemon')
  }
}

export const getDetail = (id) => async (dispatch) => {
  try {
    const rta= await fetch(`http://localhost:3001/pokemons/${id}`)
    const json = await rta.json()
    return dispatch ({type: GET_DETAILS, payload: json})
  } catch(error){
    console.log(error)
  }
}

export const postPokemon = (payload) => async (dispatch) => {
  try {
    const rta = await axios.post('http://localhost:3001/pokemons/create',payload)
    return dispatch({type:POST_POKEMONS, payload: rta.data})
  } catch (error) {
    console.log(error)    
  }
}

export const getTypes = () => async(dispatch) => {
  try {
    const rta = await fetch('http://localhost:3001/types')
    const json = await rta.json()
    return dispatch({type:GET_TYPES, payload: json})
    
  } catch (error) {
    console.log(error)
  }
}


export const orderByName= (payload) =>(dispatch) => {
  return dispatch({type: ORDER_BY_NAME, payload})
}

export const orderByAtack = (payload) =>(dispatch) => {
  return dispatch({type: ORDER_BY_ATACK, payload})
}

export const orderByOrigin = (payload) => (dispatch) => {
  return dispatch({type: ORDER_BY_ORIGIN, payload})
}

export const orderByTypes = (payload) => (dispatch) => {
  return dispatch({type: ORDER_BY_TYPES, payload})
}


export const resetDetail= () => {
  return {
    type: RESET_DETAIL,
  };
}
