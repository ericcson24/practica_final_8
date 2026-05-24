"use client";
import { useContext, useEffect, useState } from "react"
import { GetSpriteWithURL } from "@/lib/api"
import { MiniPokemon } from "@/lib/types"
import Link from "next/link";
import { usePokemon } from "@/context/PokemonContext";

type PokemonStruct = {
    miniPokemon: MiniPokemon
}

export default function PokemonCard ({miniPokemon}:PokemonStruct){
    
    const {FavoritesList,FavoritesListPush,FavoritesListPop}=usePokemon()
    const isFav= FavoritesList.some((e)=>e.name==miniPokemon.name)
    
    const [sprite,setSprite]=useState<string>("")

    
    const [loading,setloading]=useState<boolean>(true)
    const [error,seterror]=useState<string>("")
    //https://pokeapi.co/api/v2/pokemon/1/  => 
    const id=miniPokemon.url.split("/")[6]

    useEffect(()=>{
        const getimagen=async()=>{
            setloading(true)
            try{
                const data= await GetSpriteWithURL(miniPokemon.url)
                setSprite(data)
            }catch{
                seterror("error al cargar")
            }finally{
                setloading(false)
            }
            
        }
        getimagen()
    },[])

    return(
        <div>
            <Link href={`/pokemon/${id}`}>
            
            {loading&&<p>cargando...</p>}
            {error &&<p>{error}</p>}
            {sprite &&(<ul>
                <h3>{miniPokemon.name}</h3>

                <img src={sprite}></img>
            </ul>)}
            
            </Link>

            <div>
                {!isFav && (<ul><button onClick={(e)=>FavoritesListPush(miniPokemon)}>Agregar a favorites</button></ul>)}
                {isFav && (<ul><button onClick={(e)=>FavoritesListPop(miniPokemon)}>Quitar de favorites</button></ul>)}
                
            </div>

        </div>
    )
}