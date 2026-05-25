"use client"

import { usePokemon } from "@/context/PokemonContext"
import { MiniPokemon, PokemonDetail } from "@/lib/types"
import styles from "./PokemonDetailCard.module.css"

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
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.imageWrapper}>
                    <img src={PokemonDetail.sprites.back_default} alt={PokemonDetail.name} />
                </div>
                <h1 className={styles.name}>{PokemonDetail.name}</h1>
                <span className={styles.badge}>#{PokemonDetail.id}</span>
            </div>
            <div className={styles.cardBody}>
                <ul className={styles.statList}>
                    <li className={styles.statItem}>
                        <span className={styles.statLabel}>Peso</span>
                        <span className={styles.statValue}>{PokemonDetail.weight} kg</span>
                    </li>
                    <li className={styles.statItem}>
                        <span className={styles.statLabel}>Exp. base</span>
                        <span className={styles.statValue}>{PokemonDetail.base_experience} XP</span>
                    </li>
                </ul>
                {!isFav
                    ? <button className={styles.btnAdd} onClick={() => FavoritesListPush(miniPokemon)}>+ Agregar a favoritos</button>
                    : <button className={styles.btnRemove} onClick={() => FavoritesListPop(miniPokemon)}>✕ Quitar de favoritos</button>
                }
            </div>
        </div>
    )
}