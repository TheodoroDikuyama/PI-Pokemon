const { Router } = require('express');
const axios = require ('axios')
const {Pokemon, Type} = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');




const router = Router();
const URL = "https://pokeapi.co/api/v2/pokemon/"
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req,res,next) => {

    const apiPokemon = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
   
    const subRequest = await apiPokemon.data.results.map( p => axios.get(p.url))

    const allPokemonsApi = await Promise.all(subRequest)
    // console.log(allPokemonsApi)

    const infoPokeApi = allPokemonsApi.map(p => {
        let pokemonApi = {
            id: p.data.id,
            name: p.data.name,
            hp: p.data.stats[0].base_stat,
            atack: p.data.stats[1].base_stat,
            defense:p.data.stats[2].base_stat,
            height: p.data.height,
            weight: p.data.weight,
            types: p.data.types.map(p => p.type.name),
            image: p.data.sprites.other['official-artwork'].front_default
        }
        return pokemonApi
    })
    // console.log(infoPokeApi)

    const dbPokemon = await Pokemon.findAll({include: Type})

    const infoPokeDB = dbPokemon.map(p => {
        
        let pokemonDB = {
            id: p.dataValues.id,
            name: p.dataValues.name,
            hp: p.dataValues.hp,
            atack: p.dataValues.atack,
            defense:p.dataValues.defense,
            height: p.dataValues.height,
            weighh: p.dataValues.weight,
            types: p.dataValues.types.map(p => p.name),
            image: p.dataValues.image
        }
        return pokemonDB
    })

    const totalPokemon = infoPokeApi.concat(infoPokeDB)
    // console.log(totalPokemon)
    try {
        const name = req.query.name
        // console.log(name)

        if(name){
            let namePokemon = totalPokemon.filter(p => p.name.toLowerCase()=== name.toLowerCase())
            // console.log(namePokemon)
            namePokemon
                ? res.status(200).send(namePokemon)
                : res.status(404).json('El pokemon ingresado no existe')
        } else{
             res.status(200).send(totalPokemon)
        }   
    } catch (error) {
        next(error)
    }  
})

let idDB = 1000

router.post('/pokemons/create', async (req,res,next) => {

    try {
        let {name,atack,defense,hp,weight,height,types} = req.body

        console.log(name)

        const findOnePokemon = await Pokemon.findOne({where: {name: name.toString().toLowerCase()}})


        if(findOnePokemon){
        return res.send('El pokemon ya existe. Elige otro nombre')
        }

    const newPokemon = await Pokemon.create({
        id: idDB++,
        name: name.toString(),
        hp,
        atack,
        defense,
        weight,
        height,
        types,
    })

    if(!name){
        return res.send('Es obligatorio enviar un nombre')
    }
    if(Array.isArray(types) && types.length){ //Consulto si lo que me llega en types es un arreglo y si tiene algo adentro.
        let dbTypes = await Promise.all( //Armo una variable que dentro tendra una resolucion de promesas
          types.map((e) => { // Agarro la data de types y le hago un map para verificar que cada elemento exista en nuestra tabla de types
            return Type.findOne({where:{ name: e}}) 
          })
        )
       await newPokemon.setTypes(dbTypes) 
    }

    return res.send('Pokemon creado exitosamente')
        
    } catch (error) {
        next(error)
        
    }    
})



router.get('/pokemons/:id', async (req, res,next) => {
    const { id } = req.params; 
    // console.log(id)
    try {
        if(id >=  1000) {
    
            let pokeDbID = await Pokemon.findByPk(id,{
                include : [{
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes:[]
                    },
                },
            ],
            through: {
                attributes: []
            }
            })

            return res.send(pokeDbID)
            
         } else {
            let pokeApiID = await axios.get(`${URL}${id}`)
            // Traigo toda la info del pokemon con ese id en especifico 
     
            let onePokemon = {
                 id: pokeApiID.data.id,
                 name: pokeApiID.data.name,
                 hp: pokeApiID.data.stats[0].base_stat,
                 atack: pokeApiID.data.stats[1].base_stat,
                 defense:pokeApiID.data.stats[2].base_stat,
                 height: pokeApiID.data.height,
                 weigth: pokeApiID.data.weight,
                 types: pokeApiID.data.types.map(p => p.type.name),
                 image: pokeApiID.data.sprites.other['official-artwork'].front_default
            }
     
            return res.send(onePokemon)          

         }
    } catch (error) {
        res.status(404).send(`No se encontro un Pokemon con el id: ${id}`)
    }
})




router.get('/types', async (req, res,next) =>{
    const tDataBase = await Type.findAll();

    if(tDataBase.length === 0) {
        try {
            const types = await axios.get('https://pokeapi.co/api/v2/type')
            for(let i=0; i<types.data.results.length; i++){
                await Type.create({name: types.data.results[i].name});
            }
         } catch(error) {
           return res.status(404).send('Se produjo un Error')
         }
        } else {
            return res.status(200).json(tDataBase);
        }
})




module.exports = router;
