"use client"

import { usePokemon } from "@/context/PokemonContext"
import { MiniPokemon, PokemonDetail } from "@/lib/types"

type PokemonStruct = {
    PokemonDetail: PokemonDetail
}


export default function PokemonDetailCard({PokemonDetail}:PokemonStruct){

    const {FavoritesList,FavoritesListPush,FavoritesListPop}=usePokemon()
    const isFav= FavoritesList.some((e)=>e.name==PokemonDetail.name)

    const miniPokemon: MiniPokemon = {
        name: PokemonDetail.name,
        url: `https://pokeapi.co/api/v2/pokemon/${PokemonDetail.id}/`
    }

    return (
        <div>
            <h1>{PokemonDetail.name}</h1>
            <img src={PokemonDetail.sprites.back_default} alt={PokemonDetail.name} />
            <p>ID: {PokemonDetail.id}</p>
            <p>Peso: {PokemonDetail.weight}</p>
            <p>Experiencia base: {PokemonDetail.base_experience}</p>
            <div>
                {!isFav && (<button onClick={()=>FavoritesListPush(miniPokemon)}>Agregar a favorites</button>)}
                {isFav && (<button onClick={()=>FavoritesListPop(miniPokemon)}>Quitar de favorites</button>)}
            </div>
        </div>
    )
}