"use client";
import { useContext, useEffect, useState } from "react"
import { GetSpriteWithURL } from "@/lib/api"
import { MiniPokemon } from "@/lib/types"
import Link from "next/link";
import { usePokemon } from "@/context/PokemonContext";
import styles from "./PokemonCard.module.css";

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
        <div className={styles.card}>
            <Link href={`/pokemon/${id}`} className={styles.cardLink}>
                {loading && <p className={styles.loading}>Cargando...</p>}
                {error && <p className={styles.error}>{error}</p>}
                {sprite && (
                    <>
                        <div className={styles.imageWrapper}>
                            <img src={sprite} alt={miniPokemon.name} />
                        </div>
                        <span className={styles.name}>{miniPokemon.name}</span>
                        <span className={styles.id}>#{id}</span>
                    </>
                )}
            </Link>

            <div className={styles.actions}>
                {!isFav
                    ? <button className={styles.btnAdd} onClick={() => FavoritesListPush(miniPokemon)}>+ Favoritos</button>
                    : <button className={styles.btnRemove} onClick={() => FavoritesListPop(miniPokemon)}>✕ Quitar</button>
                }
            </div>
        </div>
    )
}