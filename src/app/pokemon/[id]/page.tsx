"use client"

import PokemonDetailCard from "@/components/PokemonDetailCard"
import { GetPokemonById } from "@/lib/api"
import { PokemonDetail } from "@/lib/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "@/components/PokemonDetailCard.module.css"
import Link from "next/link"

export default function DetailPage(){

    const params=useParams<{id:string}>()
    const id=params?.id

    const [loading,setloading]=useState<boolean>(true)
    const [error,seterror]=useState<string>("")
    
    const [Pokemons,setPokemons]=useState<PokemonDetail|null>(null)

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
        <div className={styles.wrapper}>
            <Link href="/" className={styles.backLink}>← Volver</Link>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && Pokemons && (
                <PokemonDetailCard PokemonDetail={Pokemons}/>
            )}
        </div>
    )
}