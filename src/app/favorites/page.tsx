"use client"

import PokemonCard from "@/components/PokemonCard"
import { usePokemon } from "@/context/PokemonContext"

export default function FavoritesPage(){
    const {FavoritesList,FavoritesListPush,FavoritesListPop}=usePokemon()
    
    return(
        <div>
            <h1>Favoritos:</h1>
            {FavoritesList && (<ul>
                {FavoritesList.map((e)=><PokemonCard key={e.name} miniPokemon={e}/>)}
            </ul>)}

        </div>
    )
}