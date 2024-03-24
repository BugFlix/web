"use client"
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css"
import Image from "next/image";
import UnAccessLinkBar from "./unaccesslogin/linkBar";
import AccessLinkBar from "./accesslogin/linkBar"
import { AuthContext } from "./Provider/authProvider";
import { useRouter } from "next/navigation";
import Search from "./search";
import arrowImg from "@/asset/images/main/right.png"

type props = {children:ReactNode}
export default function Dashboard({children}:props){
  const router=useRouter()
  const { isLogin, nickname, setIsLogin } = useContext(AuthContext);
  const mainWrapperRef=useRef<HTMLDivElement>(null!)
  const [menubar, setMenubar] = useState(false);
  const [showSearch, setShowSearch]=useState(false)
  //메뉴 버튼 눌렀을때 기능
  const handleMenubar=()=>{
    setMenubar(!menubar)
  }
      return(
          <div className={styles.container}>
              {/* 여기안에는 데이터 접근 가능 */}
                <header className={styles.leftWrapper} >
                <section className={styles.leftSection} style={{width:menubar?"0px":"200px"}} >
                {isLogin ? <AccessLinkBar /> : <UnAccessLinkBar />}
                </section>
                <div className={styles.menubarButton}  onClick={handleMenubar}>
                  <Image style={{rotate: menubar? "180deg":"0deg"}} src={arrowImg} alt="arrow"></Image>
                </div>
           
            </header>
              <div className={styles.mainWrapper} ref={mainWrapperRef} >
                  <div className={styles.mainSectionInner}>
                  <main className={styles.main}>
                    {children}
                  </main>
                  </div>
              </div>
              </div>
      )
  
  }