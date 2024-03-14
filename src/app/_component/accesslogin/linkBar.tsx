"use client"
import Link from "next/link";
import styles from "@/app/_component/dashboard.module.css"
import Image from "next/image";
import dashboardImg from "@/asset/images/main/dashboard.png"
import userImg from "@/asset/images/main/user.png"
import mypostImg from "@/asset/images/main/mypost.png"
import treeImg from "@/asset/images/main/tree.png"
import faqImg from "@/asset/images/main/faq.png"
import logoImg from "@/asset/images/logo.png"
import { useContext, useState } from "react"
import { AuthContext } from "../Provider/authProvider"
import { useRouter } from "next/navigation"
export default function LinkBar(){
    const {nickname}=useContext(AuthContext)
    //닉네임 컨텍스트를 활용해 로그인여부확인 리다이렉트
    const router=useRouter();
    const [btnPressed,setBtnPressed]=useState<String>("home")
    //링크 라우터 
    const handleHome=(prev:string)=>{
        router.push(`/${nickname}/dashboard/home`)
        setBtnPressed(prev)
    }
    const handleMyProfile=(prev:string)=>{
        router.push(`/${nickname}/dashboard/myprofile`)
        setBtnPressed(prev)
    }
    const handleMyPost=(prev:string)=>{
        router.push(`/${nickname}/dashboard/mypost`)
        setBtnPressed(prev)
    }
    const handleKnowledgeTree=(prev:string)=>{
        router.push(`/${nickname}/dashboard/knowledgetree`)
        setBtnPressed(prev)
    }
    //네비게이션 바 
    return(
        <div className={styles.leftFixedSection}>
            <div className={styles.logoContainer}>
                <div className={styles.ellipse}>
                    <Image src={logoImg} alt="profile"></Image>
                </div>
                <b>Scrabler</b>
            </div>
            <div className={styles.line}></div>
            <div className={styles.menuHeader}>
                <span>Menu</span>
            </div>
            <div className={styles.menuList}>
               <div onClick={()=>handleHome("home")}>
                    <Image src={dashboardImg} alt="dashboard"></Image>
                    <span>대시보드</span>
                    <b className={styles.menuCircleRed}>hot</b>
               </div>
               <div onClick={()=>handleMyProfile("myprofile")}>
                    <Image src={userImg} alt="userImg"></Image>
                    <span>마이페이지</span>
               </div>
               <div onClick={()=>handleMyPost("mypost")}> 
                    <Image src={mypostImg} alt="mypostImg"></Image>
                    <span>마이포스트</span>
                    <b className={styles.menuCircleGreen}>new</b>
               </div>
               <div onClick={()=>handleKnowledgeTree("knowledgetree")}>
                    <Image src={treeImg} alt="treeImg"></Image>
                    <span>지식 나무</span>
               </div>
               <div>
                    <Image src={faqImg} alt="userImg"></Image>
                    <span>FAQ</span>
               </div>
            </div>
        </div>
    )   
}