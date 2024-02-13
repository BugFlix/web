"use client"
import Link from "next/link";
import styles from "@/app/_component/dashboard.module.css"
import Image from "next/image";
import dashboardImg from "@/asset/images/dashboard.svg"
import userImg from "@/asset/images/user.svg"
import mypostImg from "@/asset/images/post.svg"
import treeImg from "@/asset/images/tree.svg"
import { useContext } from "react"
import { AuthContext } from "../Provider/authProvider"
import { useRouter } from "next/navigation"
export default function LinkBar(){
    const {nickname}=useContext(AuthContext)
    const router=useRouter();

    const handleHome=()=>{
        router.push(`/${nickname}/dashboard/home`)
    }
    const handleMyProfile=()=>{
        router.push(`/${nickname}/dashboard/myprofile`)
    }
    const handleMyPost=()=>{
        router.push(`/${nickname}/dashboard/mypost`)
    }
    return(
        <div className={styles.leftFixedSection}>
        <div onClick={handleHome}>
            <Image src={dashboardImg} alt="dashboardImg"></Image>
            홈</div>
        <div onClick={handleMyProfile}>
            <Image src={userImg} alt="userImg"></Image>
            마이페이지</div>
        <div onClick={handleMyPost}>
        <Image src={mypostImg}  alt="mypostImg"></Image>
            내 포스트</div>
        <div >
            <Image src={treeImg} alt="treeImg"></Image>
            지식 나무</div>
        
     </div>
    )
}