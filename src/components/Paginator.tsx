"use client"

type PaginatorStruct = {
    totalPages:number,
    currentPage:number,
    setPage: (page:number)=>void

}

export default function Paginator({totalPages,currentPage, setPage}:PaginatorStruct){

    const hasNext= currentPage<(totalPages-20)
    const hasPrevious= currentPage>20

    return (
        <div>
            {hasNext&&(<ul>
                <button onClick={()=>setPage(currentPage+20)}>Siguiente</button>
            </ul>)}
            {hasPrevious&&(<ul>
                <button onClick={()=>setPage(currentPage-20)}>Anterior</button>
            </ul>)}
        </div>
    )
}