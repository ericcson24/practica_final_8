export type Pokemon = {
    id:string,
    name:string,
    sprites: {
        back_default:string
    }

}

export type PokemonDetail = {
    id:string,
    name:string,
    stats : {
        base_stat:string
    }
    sprites: {
        back_default:string
    }
    base_experience:string
    weight:string
}

export type MiniPokemon={
    name:string,
    url:string
}

export type PokemonApiResponse = {
    count:number,
    next:string,
    previous:string,
    results:MiniPokemon[]
}

