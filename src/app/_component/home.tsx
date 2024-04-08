"use client"
import styles from "./home.module.css"
import { useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "./Provider/authProvider"
import LeftSection from "./homeModule/leftsection"
import RightSection from "./homeModule/rightsection"

export default  function Home(){
    const {isLogin,nickname}=useContext(AuthContext)
    const [datePostMenu, setDatePostMenu]=useState("주간")
    const router=useRouter()



  
    return(
        <div className={styles.moduleBackground} >
            <div className={styles.homeContainer}>
                <LeftSection/>
                <RightSection/>
            </div>
        </div>
    )
}