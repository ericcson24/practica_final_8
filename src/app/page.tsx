"use client"
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { MiniPokemon } from "@/lib/types";
import { GetMiniPokemon, SearchPokemons } from "@/lib/api";
import PokemonCard from "@/components/PokemonCard";

import Paginator from "@/components/Paginator";

export default function Home() {

  const [loading,setloading]=useState<boolean>(true)
  const [error,seterror]=useState<string>("")

  const [MiniPokemons,setMiniPokemons]=useState<MiniPokemon[]|null>(null)

  const [page,setPage]=useState<number>(1)
  const [totalpages,setTotalPage]=useState<number>(1)
  const [busqueda,setbusqueda]=useState<string>("")

  useEffect(()=>{
    const getpokemonsandSprites=async ()=>{
      setloading(true)
      try{
        if(!busqueda.trim()){
        const data= await GetMiniPokemon(page)
        setMiniPokemons(data.results)      
        setTotalPage(data.count)}
        else{
          const query = busqueda.trim().toLowerCase()
          const data = await SearchPokemons(query)
          setMiniPokemons(data)
        }
      }catch{
        seterror("Error al cargar pokemons")

      }finally{
        setloading(false)

      }
    }
    getpokemonsandSprites()
  },[page,busqueda])

  

  return (
    <div className={styles.page}>
      <div>
        <input placeholder="Buscar Pokemons" onChange={(e)=>setbusqueda(e.target.value)}/>
      </div>

      <h1>Pokemons:</h1>
      {loading && <p>cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && MiniPokemons && (<ul className={styles.grid}>
        
        {MiniPokemons.map((e)=><PokemonCard key={e.name} miniPokemon={e} />)}
      </ul>)}
      {page>0 &&!busqueda && (<ul>
        <Paginator totalPages={totalpages} currentPage={page} setPage={setPage}/>
      </ul>)}
    </div>
  );
}
