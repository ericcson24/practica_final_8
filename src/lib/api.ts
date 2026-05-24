import axios from "axios";
import { Pokemon, PokemonApiResponse, PokemonDetail } from "./types";

const api=axios.create({
    baseURL:"https://pokeapi.co/api/v2/pokemon/",
    timeout:10000
})

export async function GetSpriteWithURL(url:string) {
    try{
        const response = await axios.get<Pokemon>(url)
        return response.data.sprites.back_default
    }catch(error){
        console.error("Error con coger el sprite desde api")
        throw error
    }
}

export async function GetMiniPokemon(offset:number) {
    try{
        if (offset<20){
            const response = await api.get<PokemonApiResponse>(``)
            return response.data
        }
            const response = await api.get<PokemonApiResponse>(`?offset=${offset}&limit=20`)
            return response.data
    }catch(error){
        console.error("Error con coger el sprite desde api")
        throw error
    }
}


export async function SearchPokemons(query:string) {
    try{
        const response = await api.get<PokemonApiResponse>(`?limit=10000`)
        return response.data.results.filter((e)=>e.name.includes(query.toLowerCase()))
    }catch(error){
        console.error("Error con coger el sprite desde api")
        throw error
    }
}


export async function GetPokemonById(id:string){
    try{
        const response = await api.get<PokemonDetail>(`${id}/`)
        return response.data
    }catch(error){
        console.error("Error con coger el sprite desde api")
        throw error
    }
}