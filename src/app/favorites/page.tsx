"use client"

import PokemonCard from "@/components/PokemonCard"
import { usePokemon } from "@/context/PokemonContext"
import styles from "./page.module.css"
import Link from "next/link"

export default function FavoritesPage(){
    const {FavoritesList}=usePokemon()
    
    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <Link href="/" className={styles.backLink}>← Volver</Link>
                <h1 className={styles.title}>Mis <span>Favoritos</span></h1>
            </div>
            {FavoritesList.length === 0
                ? <p className={styles.empty}>No tienes pokémon favoritos todavía.</p>
                : (
                    <ul className={styles.grid}>
                        {FavoritesList.map((e) => <PokemonCard key={e.name} miniPokemon={e} />)}
                    </ul>
                )
            }
        </div>
    )
}