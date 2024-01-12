"use client"
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css"
import Image from "next/image";
import Logo from "@/asset/images/logo.svg"
import Link from "next/link";
type props = {children:ReactNode}
export default function MenuBar({children}:props){
  const tabRef=useRef<HTMLDivElement>(null)
  const [menubar , setMenubar]=useState(false)
  const [logoimg,setLogo]=useState(true)
  const onHandleMenubar = () => {
    setMenubar(!menubar);
    setLogo(!logoimg)
  };
    return(
        <div className={styles.container}>
            {menubar&&(
              <header className={styles.leftWrapper}>
              <section className={styles.leftSection}>
                <div className={styles.leftFixedSection}>
                   <Link href="/dashboard/home"><Image className={styles.logo} src={Logo} alt='logo' /></Link>
                   <div className={styles.moduleLine}></div>
                   <Link href="/dashboard/myprofile">내 정보</Link>
                   <Link href="/dashboard/namu">지식 나무</Link>
                </div>
              </section>
         
          </header>
            )}
            <div className={styles.mainWrapper} >
                <div className={styles.mainSectionInner}>
                <div className={styles.meuBarSection}>
                    <div className={styles.menuBarFixedSection}>
                     <span onClick={onHandleMenubar}>메뉴바</span>
                      {logoimg&& <Image className={styles.LogoImg} src={Logo} alt="Logo"></Image>}
                    </div>
                  </div>
                <main className={styles.main}>
                  {children}</main>
                </div>
            </div>
            </div>
    )

}