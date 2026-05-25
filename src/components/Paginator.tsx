"use client"

import styles from "./Paginator.module.css"

type PaginatorStruct = {
    totalPages:number,
    currentPage:number,
    setPage: (page:number)=>void

}

export default function Paginator({totalPages,currentPage, setPage}:PaginatorStruct){

    const hasNext= currentPage<(totalPages-20)
    const hasPrevious= currentPage>20

    return (
        <div className={styles.paginator}>
            {hasPrevious && (
                <button className={styles.btn} onClick={() => setPage(currentPage - 20)}>← Anterior</button>
            )}
            {hasNext && (
                <button className={styles.btn} onClick={() => setPage(currentPage + 20)}>Siguiente →</button>
            )}
        </div>
    )
}