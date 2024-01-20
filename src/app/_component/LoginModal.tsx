"use client"
import { ChangeEventHandler, FormEventHandler, useState, useEffect,useContext } from "react"
import styles from "./login.module.css"
import { useRouter } from "next/navigation"
import api from "@/app/config/apiConfig"
import  { AuthContext } from "./Provider/authProvider"
interface authData{
    accessToken: string,
    refreshToken: string,
    userId:number,
    nickname: string,
    email:string
}
export default function LoginModal(){
    const { setIsLogin ,setNickname } = useContext(AuthContext);
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [message, setMessage]=useState()
    const router=useRouter()
    const requestData={
        email:email,
        password:password
    }
    
    const onCLose=()=>{
        router.back()
    }
    const handleChangeEmail:ChangeEventHandler<HTMLInputElement>=(e)=>{
        setEmail(e.target.value)
    }
    const handleChangePassword:ChangeEventHandler<HTMLInputElement>=(e)=>{
        setPassword(e.target.value)
    }
    const onSubmit:FormEventHandler= async(e)=>{
        e.preventDefault()
        // const nickname="광열"
        // setIsLogin(true);
        // setNickname(nickname)
        // router.push(`/${nickname}/dashboard/home`);

       
      try{
        const response = await api.post("/api/v1/auth/login",requestData,{
            headers:{
                "Content-Type":"application/json"
            }
      })
      const data:authData= response.data;
      console.log(data);
      if (data.accessToken && data.refreshToken) {
        localStorage.setItem("accestoken", data.accessToken);
        localStorage.setItem("refreshtoken", data.refreshToken);
        setIsLogin(true);
        setNickname(data.nickname)
        router.push(`/${data.nickname}/dashboard/home`)
      
        
      }
    }catch(error){
        console.log(error)
    }
    }
    
    return(
        <div className={styles.modalBackground}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <button className={styles.closeBtn} onClick={onCLose}>
                        
                    </button>
                    <div>로그인하세요.</div>
                </div>
                <form onSubmit={onSubmit}>
                <div className={styles.modalBody}>
                    <div className={styles.inputDiv}>
                        <label className={styles.inputLabel} htmlFor="email">이메일</label>
                        <input id="email" className={styles.input} value={email} onChange={handleChangeEmail} type="text" placeholder=""/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.inputLabel} htmlFor="password">비밀번호</label>
                        <input id="password" className={styles.input} value={password} onChange={handleChangePassword} type="password" placeholder=""/>
                    </div>
                </div>
                <div className={styles.message}>{message}</div>
                <div className={styles.modalFooter}>
                    <button className={styles.actionBtn} onClick={onSubmit}  disabled={!email && !password}>로그인하기</button>
                </div>
            </form>
            </div>
        </div>
    )
}