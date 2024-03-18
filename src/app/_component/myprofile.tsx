"use client"
import { useState } from "react"
import styles from "./myprofile.module.css"
import MyProfile from "./myprofile/myprofile"
import profileImg from "@/asset/images/main/kwang.jpg"
import alarmImg from "@/asset/images/main/notification.png"
import messageImg from "@/asset/images/main/message.png"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import settingImg from "@/asset/images/main/setting.png"
import calendarImg from "@/asset/images/main/calendar.png"
import api from "../config/apiConfig"
type profileType={
    nickname:string
    imageUrl: string
    email:string

}

export default function MyComponentProfile(){
    const accessToken=localStorage.getItem("accestoken")
    async function onHandleProfile(){
        try{
            const response= await api.get("api/v1/profiles/mine",{
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            console.log(response.data)
            return response.data;
        }
        catch(error){
            console.error(error)
        }
    }

    const {data:profileData, isLoading, isSuccess, isError}=useQuery<profileType>({
        queryKey:["profileKey"],
        queryFn:onHandleProfile,
    })

    return(
        <div className={styles.container}>
             <div className={styles.background}>
                <div className={styles.top}>
                    <div className={styles.myProfileContainer}>
                        <div className={styles.profiletop}>
                            <div className={styles.profileCircle}>
                                <Image src={profileImg} alt="profileImg"></Image>
                            </div>
                            <div className={styles.info}>
                                <b>{profileData?.nickname}</b>
                                <span>{profileData?.email}</span>
                            </div>
                        </div>
                        <div className={styles.profileBottom}>
                            <div className={styles.exp}>
                                <div></div>
                            </div>
                            <span>프로필 설정</span>
                        </div>
                    </div>
                    <div className={styles.alarmBox}>
                    <Image src={alarmImg} alt="alarmImg"></Image>
                    <span>알림</span>
                </div>
                <div className={styles.messageBox}>
                    <Image src={messageImg} alt="messageImg"></Image>
                    <span>메시지</span>
                </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.privacyContainer}>
                        <div className={styles.privacySettingBox}>
                            <span>비공개</span>
                            <div  className={styles.privacySetting}>
                                <div></div>
                            </div>
                        </div>
                        <div className={styles.privacyBottom}>
                            <span>계정공개 범위</span>
                        </div>
                    </div>
                    <div className={styles.setting}>
                        <Image src={settingImg} alt="settingIcon"/>
                        <span>설정</span>
                    </div>
                    <div className={styles.plannerSetting}>
                        <Image src={calendarImg} alt="calendarIcon"/>
                        <span>목표설정</span>
                    </div>
                </div>
             </div>
        </div>
    )
}