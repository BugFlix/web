"use client"
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css"
import Image from "next/image";
import Logo from "@/asset/images/logo.svg"
import Link from "next/link";
type props = {children:ReactNode}
export default function MenuBar({children}:props){
  const menuRef=useRef<any>(null)
  const [menubar , setMenubar]=useState(false)
  const [logoimg,setLogo]=useState(true)
  const onHandleMenubar = () => {
    setMenubar(!menubar);
    setLogo(!logoimg)
    if (menuRef.current) {
      menuRef.current.style.scrollBehavior = "smooth";
      menuRef.current.scrollTop = !menubar ? 3000 : 0;
    }
  };
    return(
        <div className={styles.container}>
            {menubar&&(
              <header className={styles.leftWrapper}>
              <section className={styles.leftSection}>
                <div className={styles.leftFixedSection}>
                   <a href="/dashboard/home"><Image className={styles.logo} src={Logo} alt='logo' /></a>
                   <div className={styles.moduleLine}></div>
                   <a href="/dashboard/home">홈</a>
                   <a href="/dashboard/myprofile">내 정보</a>
                   <a href="/dashboard/namu">지식 나무</a>
                </div>
              </section>
         
          </header>
            )}
            <div className={styles.mainWrapper} >
                <div className={styles.mainSectionInner}>
                <div className={styles.meuBarSection}>
                    <div className={styles.menuBarFixedSection}>
                      <button className={styles.menuBtn}  onClick={onHandleMenubar}>
                        <div ref={menuRef}> <span>메뉴</span>
                      <span>닫기</span></div>
                      </button>
                     
                      {logoimg&& <Image className={styles.LogoImg} src={Logo} alt="Logo"></Image>}
                    </div>
                  </div>
                <main className={styles.main}>
                  {children}
                </main>
                </div>
            </div>
            </div>
    )

}