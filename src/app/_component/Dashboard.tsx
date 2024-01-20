"use client"
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css"
import Image from "next/image";
import Logo from "@/asset/images/logo.svg"
import UnAccessLinkBar from "./unaccesslogin/linkBar";
import AccessLinkBar from "./accesslogin/linkBar"
import { AuthContext } from "./Provider/authProvider";
import { useRouter } from "next/navigation";

type props = {children:ReactNode}
export default function Dashboard({children}:props){
  const router=useRouter()
  const { isLogin, nickname, setIsLogin } = useContext(AuthContext);
  const menuRef = useRef<any>(null);
  const [menubar, setMenubar] = useState(false);
  const [logoimg, setLogo] = useState(true);
  const onHandleLogout=()=>{
    setIsLogin(false)
    router.push("/dashboard/home")
  }

  const onHandleMenubar = () => {
    setMenubar(!menubar);
    setLogo(!logoimg);
    if (menuRef.current) {
      menuRef.current.style.scrollBehavior = "smooth";
      menuRef.current.scrollTop = !menubar ? 3000 : 0;
    }
  };

      return(
          <div className={styles.container}>
              {/* 여기안에는 데이터 접근 가능 */}
              {menubar&&(
                <header className={styles.leftWrapper}>
                <section className={styles.leftSection}>
                {isLogin ? <AccessLinkBar /> : <UnAccessLinkBar />}
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
                        {isLogin && <b>{nickname}</b>}
                        {isLogin && <button onClick={onHandleLogout}>로그아웃</button>}
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