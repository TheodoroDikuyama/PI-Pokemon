import { 
  GET_ALL_POKEMONS,
  GET_TYPES,
  GET_NAME,
  GET_DETAILS,
  POST_POKEMONS,
  ORDER_BY_NAME,
  RESET_DETAIL, 
  ORDER_BY_ATACK,
  ORDER_BY_ORIGIN,
  ORDER_BY_TYPES} from "../actions";


const initialState = {
    pokemons:[],
    loading:[],
    detail:{},
    types: [],
    backUp: []
  };
  
  export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_POKEMONS:
        return {
          ...state,
          pokemons: action.payload,
          loading: action.payload,
          backUp: action.payload
        };
      
      case GET_NAME: 
        return {
          ...state,
          pokemons: action.payload,
        }; 

      case GET_DETAILS: 
        return {
          ...state,
          details: action.payload
        }
      
      case POST_POKEMONS: 
        return {
          ...state, 
          pokemons: state.pokemons.concat(action.payload)
        }
      
      case GET_TYPES: 
        return { 
          ...state, 
          types: action.payload
        }
      
      case ORDER_BY_NAME:
        let alfabetic =
          action.payload === 'aToZ'? 
            state.pokemons.sort(function (a, b) {
                return (a.name > b.name) ? -1: 1
              })
            : state.pokemons.sort( (a, b) => {
                return (a.name > b.name) ? 1 : -1
              });
        return {
          ...state,
          pokemons: alfabetic,
        };

        case ORDER_BY_ATACK:
          let byAtack = 
            action.payload === 'minToMax' ?
              state.pokemons.sort((a,b)=>{
                return b.atack - a.atack
              })
              : state.pokemons.sort((a,b)=>{
                return a.atack - b.atack
              })
          return {
            ...state,
            pokemons: byAtack
          }
        
        case ORDER_BY_ORIGIN: 
        
          let byOrigin = 
            action.payload === 'api'?
              state.pokemons.filter(p => p.id < 1000)
              :action.payload === 'db'?
               state.pokemons.filter(p=> p.id > 100)
              : state.backUp
          return {
            ...state,
            pokemons: byOrigin
          }
        
        case ORDER_BY_TYPES:
          let byTypes = 
            action.payload === 'allTypes'?
            state.backUp
            : state.pokemons.filter((p) =>
              p.types.map(t => t)[0] === action.payload ||
              p.types.map(t => t)[1] === action.payload
            )
          return {
            ...state,
            pokemons: byTypes
          }

     
   
         
         

         case RESET_DETAIL:
          return {
            ...state,
            detail: {},
          };
    
        
          
          


        
      default:
        return state
  }
};
