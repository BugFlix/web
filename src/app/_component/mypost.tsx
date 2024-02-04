"use client"

import axios from "axios"
import Image from "next/image"
import styles from "./mypost.module.css"
import likesIcon from "@/asset/images/likestar.png"
import { useEffect,useState,useContext} from "react"
import { useQuery } from "@tanstack/react-query"
import { AuthContext } from "./Provider/authProvider";
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setPostId } from "../slices/postSlice"
import api from "@/app/config/apiConfig"
import Post from "./post"
interface Post {
    postId: number;
    nickname: string;
    title: string;
    tags: { createdDate: string; modifiedDate: string; tagContent: string }[];
    like_count: number;
    is_like: boolean;
    image_url: string;
    createdDate: string;
    modifiedDate: string;
  }

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate: string = new Date(dateString).toLocaleDateString(
      "ko-KR",
      options
    );
    return formattedDate;
  };
  
  const formatRelativeTime = (dateString: string): string => {
    const now: Date = new Date();
    const date: Date = new Date(dateString);
    const diff: number = now.getTime() - date.getTime();
  
    // 분, 시간, 일로 계산
    const minutes: number = Math.floor(diff / 60000);
    const hours: number = Math.floor(diff / 3600000);
    const days: number = Math.floor(diff / 86400000);
  
    if (minutes < 1) {
      return "방금 전";
    } else if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      return formatDate(dateString);
    }
  };
  
export default function MyPost(){
  const {nickname } = useContext(AuthContext);
  const dispatch = useDispatch()
  const url: string = window.location.href;
  const encodeUrl=encodeURIComponent(url)
  console.log(encodeUrl)
  const accessToken=localStorage.getItem("accestoken")
  async function onHandleMyPostPreview() {
    // try {
    //   const response = await api.get(`/api/v1/posts/mine?url=${encodeUrl}`, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
    //   console.log(response.data)
    //   return response.data;
    // } catch (error) {
    //   console.error(error);
    //   throw error;
    // }

    try{
      const response =await axios.get("http://localhost:3002/postPreview", {
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${accesstoken}`
      // }
    });
    console.log(response.data)
    return response.data;
    }catch(error){
      console.log(error)
}
  }
  
  const { data: datapost, isLoading, isError, isSuccess } = useQuery<Post[]>({
    queryKey: ["mypostpreview"],
    queryFn: onHandleMyPostPreview,
  });
    const router=useRouter()
    const onHandlePost = (postId: number) => {
      console.log(postId)
      router.push(`/${nickname}/dashboard/home/post`)
      dispatch(setPostId(postId))
    }
    if(isLoading){
      return(
        <ul className={styles.collection} >
          로딩중입니다.
        </ul>
      )
    }
   
    return(
        <div className={styles.moduleBackground} >
        <div className={styles.innerContents}>
        <div className={styles.postTabContainer}>
            </div>
            <div className={styles.collectionWrapper }>
            <ul className={styles.collection} >
            {datapost?.map((value: Post, index: number)=>(
                <div key={index} className={styles.wrapper} onClick={() => onHandlePost(value.postId)}>
                <li className={styles.previewBox}>
                    <div className={styles.front}>
                    <img  src={value.image_url} alt="image"></img>
                    <h3>{value.title}</h3>
                    <div><span>
                    {value.modifiedDate
                      ? `수정됨: ${formatRelativeTime(value.modifiedDate)}`
                      : `작성됨: ${formatRelativeTime(value.createdDate)}`}
                  </span></div>
                    <div className={styles.contentHeader}>
                    <div className={styles.profileCircle}>
                        <img src="https://velog.velcdn.com/images/hmmhmmhm/profile/352c0d2c-9f4d-4489-a5c5-64d789a66a4b/image.webp" alt=''></img>  
                    </div>
                    <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                    <div className={styles.postBy}> <span>post</span> {value.nickname}</div> 
                    <span className={styles.likesCount}>{value.like_count}</span>
                    </div>
                    </div>
                    <div className={styles.back}> <div className={styles.content}>
                    <p>신년카드 웹앱 이미지 새해인사 우체통 (Web) 서비스 링크: https://postbox.run 위 URL 에서 실제로 신년인사 카드를 작성해보실 수 있어요! 코육대 예시 항해 플러스 코육대에서 행사를 연다는 소식을 한참 뒤늦게 듣고 빠르게 도전해보기 위</p>
                    </div></div>  
                </li>
                </div>      
            ))}
                
            </ul>
            </div>
        </div>
    </div>
    )
}