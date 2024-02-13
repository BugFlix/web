import styles from "./myprofile.module.css"
import Image from "next/image";
import profile from "@/asset/images/kwang.jpg"
import mypostImg from "@/asset/images/post.svg"
import likesIcon from "@/asset/images/likestar.png"
import { useContext } from "react"
import { AuthContext } from "../Provider/authProvider"  
export default function MyPage(){
    const {nickname}=useContext(AuthContext)
    return(
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.profileCircle}>
                        <Image src={profile} alt="kwang"/>
                   </div>
                   <div className={styles.authContainer}>
                        <b>{nickname}</b>
                        <div className={styles.followers}>
                            <span>포스트 수 3개</span>
                            <span>팔로워: 1500</span>
                            <span>팔로잉: 255</span>
                        </div>
                        <span>email: sgky0511@naver.com</span>
                        <a href="https://velog.io/@tkrhdrhkdduf">velog.io/@tkrhdrhkdduf</a>
                        <span className={styles.subTitle}>나는 멋있는 남자/ 자기계발 하는중 !<br/> 올해는 행복하길!</span>
                    </div>
                 
                   
                </div>
                <div className={styles.headerTab}>
                    <div className={styles.tabMenu}>
                        <div><Image src={mypostImg} alt="mypost"/><p>내 포스트</p></div>
                        <div><Image src={likesIcon} alt="likesIcon"/><p>라이크</p></div>  
                    </div>
                </div>
                <div className={styles.collectionContainer}>
                    <ul className={styles.collection}>
                        <div className={styles.wrapper}>
                            <li className={styles.previewBox}>
                                <div className={styles.front}>
                                    <img  src="https://velog.velcdn.com/images/hmmhmmhm/post/f6cb929e-4552-4955-83ee-5d861225bc45/image.gif" alt="image"></img>
                                    <h3>하루 만에 혼자 3D 로 신년카드 웹앱을?</h3>
                                    <div className={styles.contentHeader}>
                                    <div className={styles.profileCircle1}>
                                        <img src="https://velog.velcdn.com/images/hmmhmmhm/profile/352c0d2c-9f4d-4489-a5c5-64d789a66a4b/image.webp" alt=''></img>  
                                    </div>
                                    <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                                    <div className={styles.postBy}> <span>post</span> <b>하민</b></div> 
                                    <span className={styles.likesCount}>200</span>
                                    </div>
                                 </div>
                                 <div className={styles.back}> <div className={styles.content}>
                                    <p>신년카드 웹앱 이미지 새해인사 우체통 (Web) 서비스 링크: https://postbox.run 위 URL 에서 실제로 신년인사 카드를 작성해보실 수 있어요! 코육대 예시 항해 플러스 코육대에서 행사를 연다는 소식을 한참 뒤늦게 듣고 빠르게 도전해보기 위</p>
                                    </div></div>  
                            </li>
                        </div>

                        <div className={styles.wrapper}>
                            <li className={styles.previewBox}>
                                <div className={styles.front}>
                                    <img  src="https://velog.velcdn.com/images/hmmhmmhm/post/f6cb929e-4552-4955-83ee-5d861225bc45/image.gif" alt="image"></img>
                                    <h3>하루 만에 혼자 3D 로 신년카드 웹앱을?</h3>
                                    <div className={styles.contentHeader}>
                                    <div className={styles.profileCircle1}>
                                        <img src="https://velog.velcdn.com/images/hmmhmmhm/profile/352c0d2c-9f4d-4489-a5c5-64d789a66a4b/image.webp" alt=''></img>  
                                    </div>
                                    <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                                    <div className={styles.postBy}> <span>post</span> <b>하민</b></div> 
                                    <span className={styles.likesCount}>200</span>
                                    </div>
                                 </div>
                                 <div className={styles.back}> <div className={styles.content}>
                                    <p>신년카드 웹앱 이미지 새해인사 우체통 (Web) 서비스 링크: https://postbox.run 위 URL 에서 실제로 신년인사 카드를 작성해보실 수 있어요! 코육대 예시 항해 플러스 코육대에서 행사를 연다는 소식을 한참 뒤늦게 듣고 빠르게 도전해보기 위</p>
                                    </div></div>  
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <div className={styles.setting}>

            </div>
        </div>
    )
}