"use client"
import Image from 'next/image'
import styles from "@/app/_component/main.module.css"
import Link from 'next/link'
import Logo from "@/asset/images/logo.png"
export default function Main() {


  return (
    <>
      <div className={styles.left}>
        <Image className={styles.logo} src={Logo} alt='logo' />
      </div>
      <div className={styles.right}>
        <h1>지금 궁금한게 있으신가요?</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/account/signup" className={styles.signup}>회원가입</Link>
        <h4>이미 Weblog에 가입 하셨나요?</h4>
        <Link href="/account/login" className={styles.login}>로그인</Link>
      </div>
    </>
  )
}
