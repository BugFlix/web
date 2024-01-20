"use client"
import styles from "@/app/(unaccesslogin)/@modal/(.)dashboard/home/post/post.module.css"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export default function Post(){
    const postRef=useRef<HTMLDivElement>(null)
    const router=useRouter()
    const onHandleClose = ()=>{
        if(postRef.current){
            postRef.current.style.width="0px"
            postRef.current.style.transition="0.4s"
            const transitionEndHandler = () => {
                router.back();
            };

            postRef.current.addEventListener('transitionend', transitionEndHandler);
        }
        
    }
    useEffect(()=>{
        if(postRef.current){
            postRef.current.style.width="900px"
            postRef.current.style.transition="0.4s"
        }
    },[])

    return(
        <div className={styles.background} ref={postRef}>
        <button onClick={onHandleClose}>닫기</button></div>
    )
}