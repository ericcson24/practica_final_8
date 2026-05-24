"use client"

import PokemonDetailCard from "@/components/PokemonDetailCard"
import { GetPokemonById } from "@/lib/api"
import { PokemonDetail } from "@/lib/types"
import { useParams } from "next/navigation"
import { useEffect, useEffectEvent, useState } from "react"

export default function DetailPage(){

    const params=useParams<{id:string}>()
    const id=params?.id

    const [loading,setloading]=useState<boolean>(true)
    const [error,seterror]=useState<string>("")
    
    const [Pokemons,setPokemons]=useState<PokemonDetail|null>(null)
    
    const [page,setPage]=useState<number>(1)

    useEffect(()=>{
        const getPokemon=async()=>{
            setloading(true)
            try{
                const data = await GetPokemonById(id)
                setPokemons(data)
            }catch{
                seterror("Error al cargar el pokemon")
            }finally{
                setloading(false)
            }
        }
        getPokemon()
    }, [id])

    return(
        <div>
            <h1>Pokemon:</h1>
            {loading && <p>cargando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && Pokemons && (<ul>
                <PokemonDetailCard PokemonDetail={Pokemons}/>
            </ul>)}

        </div>
    )
}