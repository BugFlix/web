import Link from "next/link";

import styles from "@/app/_component/dashboard.module.css"
import Image from "next/image";
import dashboardImg from "@/asset/images/dashboard.svg"
import userImg from "@/asset/images/user.svg"
import mypostImg from "@/asset/images/post.svg"
import treeImg from "@/asset/images/tree.svg"
export default function LinkBar(){
    return(
        <div className={styles.leftFixedSection}>
        <a href="/dashboard/home">
            <Image src={dashboardImg} alt="dashboardImg"></Image>
            홈</a>
        <a href="/dashboard/myprofile">
            <Image src={userImg} alt="userImg"></Image>
            내 정보</a>
        <Link href="/광열/dashboard/mypost">
        <Image src={mypostImg} alt="mypostImg"></Image>
            내 포스트</Link>
        <a href="/dashboard/namu">
            <Image src={treeImg} alt="treeImg"></Image>
            지식 나무</a>
        
     </div>
    )
}