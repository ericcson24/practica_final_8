"use client"
import { MiniPokemon } from "@/lib/types"
import { useContext , createContext, ReactNode, useState} from "react"


type ContextStruct = {
    FavoritesList: MiniPokemon[],
    FavoritesListPush: (pokemon:MiniPokemon)=>void
    FavoritesListPop: (pokemon:MiniPokemon)=>void
}
const PokemonContext=createContext<ContextStruct|null>(null)

export const ContextProvider= ({children}:{children:ReactNode})=>{
    const [FavoritesList,setFavoritesList]=useState<MiniPokemon[]>([])

    const FavoritesListPush = (item:MiniPokemon)=>{
        if (!FavoritesList.some((e)=>e.name==item.name)){
            setFavoritesList([...FavoritesList,item])
        }
    }

    const FavoritesListPop = (item:MiniPokemon)=>{
        if (FavoritesList.some((e)=>e.name==item.name)){
            setFavoritesList(FavoritesList.filter((e)=>e.name!==item.name))
        }
    }

    return(
        <PokemonContext.Provider value={{FavoritesList,FavoritesListPush,FavoritesListPop}}>{children}</PokemonContext.Provider>
    )
}

export const usePokemon = ()=>{
    const context = useContext(PokemonContext)
    if(!context){throw new Error("No hay contexto")}
    return context
}