"use client"
import Loginmodal from "@/app/_component/LoginModal"
import { QueryClientProvider, QueryClient } from 'react-query'
export default function LoginModal(){
    const queryClient=new QueryClient()
    return(
       <Loginmodal />
    )
}