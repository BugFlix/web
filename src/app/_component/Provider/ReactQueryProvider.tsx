"use client";
import React, {useState} from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

type Props={
    children: React.ReactNode
}
// 리액트 쿼리에서 provider는 클라이언트를 먼저 만들어준다
function ReactQueryProvider({children}:Props){
    const [client]=useState(
        new QueryClient({
            defaultOptions:{
                queries:{
                    refetchOnWindowFocus:false,
                    retry:false
                }
            }
        })
    )
    return(
        <QueryClientProvider client={client}>
            {/* children 안에 있는 애들은 리액트쿼리 데이터 서로 공유 가능 */}
            {children}
            <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'} />
        </QueryClientProvider>
    )
}

export default ReactQueryProvider