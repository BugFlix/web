import Link from "next/link";
import Logo from "@/asset/images/logo.svg"
import styles from "@/app/_component/dashboard.module.css"
import Image from "next/image";
export default function LinkBar(){
    return(
        <div className={styles.leftFixedSection}>
        <Link href="/dashboard/home"><Image className={styles.logo} src={Logo} alt='logo' /></Link>
        <div className={styles.moduleLine}></div>
        <a href="/dashboard/home">홈</a>
        <a href="/dashboard/namu">지식 나무</a>
     </div>
    )
}