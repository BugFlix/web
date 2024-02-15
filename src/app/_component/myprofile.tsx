"use client"
import { useState } from "react"
import styles from "./myprofile.module.css"
import MyProfile from "./myprofile/myprofile"
export default function MyComponentProfile(){
    const [datePostMenu, setDatePostMenu]=useState("프로필")
    const handlePostTab= (tab:any)=>{
        setDatePostMenu(tab)
    }
    const styleComponent = (tab:any) => {
        return {
            borderBottom: datePostMenu === tab ? "1px solid #7e7e80" : "none",
        };
      };
    return(
        <div className={styles.container}>
              <div className={styles.headerMenu}>
                    <div style={styleComponent("프로필")} onClick={()=>handlePostTab("프로필")}>프로필</div>
                    <div style={styleComponent("계정 공개 범위")} onClick={()=>handlePostTab("계정 공개 범위")}>계정 공개 범위</div>
                    <div style={styleComponent("알림")} onClick={()=>handlePostTab("알림")}>알림</div>
                    <div style={styleComponent("설정")} onClick={()=>handlePostTab("설정")}>설정</div>
                    <div style={styleComponent("도움말")} onClick={()=>handlePostTab("도움말")}>도움말</div>
             </div>
             <div className={styles.background}>
                <MyProfile/>
             </div>
        </div>
    )
}