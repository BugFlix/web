"use client"

import { useState, useEffect } from "react"
export default function Debounce(value:string, delay:number){
    const [autoComplete, setAutoComplete]=useState(value)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setAutoComplete(value)
        },delay)
        return()=>{
            clearTimeout(timer)
        }
    },[value, delay])

    return autoComplete

}