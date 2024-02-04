"use client"
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css"
import Image from "next/image";
import Logo from "@/asset/images/logo.svg"
import UnAccessLinkBar from "./unaccesslogin/linkBar";
import AccessLinkBar from "./accesslogin/linkBar"
import { AuthContext } from "./Provider/authProvider";
import { useRouter } from "next/navigation";
import profile from "@/asset/images/kwang.jpg"
import Link from "next/link";
import Search from "./search";

type props = {children:ReactNode}
export default function Dashboard({children}:props){
  const router=useRouter()
  const { isLogin, nickname, setIsLogin } = useContext(AuthContext);
  const menuRef = useRef<any>(null);
  const [menubar, setMenubar] = useState(false);
  const [logoimg, setLogo] = useState(true);
  const [dropMenu,setDropMenu]=useState(false)
  const [showSearch, setShowSearch]=useState(false)
  const onHandleLogout=()=>{
    setIsLogin(false)
    router.push("/dashboard/home")
  }

  const onHandleMenubar = () => {
    setMenubar(!menubar);
    if (menuRef.current) {
      menuRef.current.style.scrollBehavior = "smooth";
      menuRef.current.scrollTop = !menubar ? 3000 : 0;
    }
  };
  const handleDropdownMenu = ()=>{
    setDropMenu((prev)=>!prev)
  }
  const handleSearchBar=()=>{
    setShowSearch(!showSearch)
  }

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
                        <div className={styles.profile_header}>
                          <div className={styles.searchBar} onClick={handleSearchBar}>
                            <span>검색</span>
                            <div className={styles.iconSearch}></div>
                          </div>
                        
                        {isLogin && <button className={styles.notification}></button>}
                        {isLogin && <b className={styles.nickname}>{nickname}</b>}
                        {isLogin && <div className={styles.profileCircle}>
                          <Image src={profile} alt="kwang"/>
                        </div>}
                        {isLogin&& <div className={styles.dropdown}>
                          <button className={styles.dropdownButton} onClick={handleDropdownMenu} style={{rotate:dropMenu?'180deg':'0deg'}}></button>
                          <div className={styles.dropMenu}  style={{height:dropMenu? '50px':'0px', transition: "0.5s"}}>
                             <Link href="">마이페이지</Link>
                            <button onClick={onHandleLogout}>로그아웃</button>
                          </div>
                          </div>}</div>
                        
                      </div>
                    </div>
                  <main className={styles.main}>
                    {children}
                  </main>
                  </div>
              </div>
             {showSearch&& <Search/>}
              </div>
      )
  
  }