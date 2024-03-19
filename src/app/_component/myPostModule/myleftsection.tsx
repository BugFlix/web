import Image from "next/image"
import styles from "./myleftsection.module.css"
import likesIcon from "@/asset/images/likestar.png"
import profileImg from "@/asset/images/main/kwang.jpg"
import { useEffect,useState,useContext} from "react"
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { AuthContext } from "@/app/_component/Provider/authProvider";
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setPostId } from "@/app/slices/postSlice"
import { setDataPost } from '@/app/slices/datapost';
import api from "@/app/config/apiConfig"
import Post from "../post"
import axios from "axios"
import { useInView } from "react-intersection-observer"

interface Post {
    postId: number;
    nickname: string;
    title: string;
    tags: string [];
    likeCount: number;
    imageUrl: string;
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
export default function MyLeftSection (){

    const {nickname } = useContext(AuthContext);
    const dispatch = useDispatch()
    const url: string = window.location.href;
    const encodeUrl=encodeURIComponent(url)
    console.log(encodeUrl)
    const router=useRouter()
  
    const accessToken=localStorage.getItem("accestoken")
    async function onHandleMyPostPreview({ pageParam }: { pageParam?: number }) {
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
        const response =await api.get("/api/v1/posts/mine", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data)
      return response.data;
      }catch(error){
        console.log(error)
  }
    }
    
    //리액트쿼리를 이용한 데이터 헨들 무한스크롤
    const {data:dataPost, isLoading, isError, isSuccess, fetchNextPage, hasNextPage, isFetching  }=useInfiniteQuery<Post[],object,InfiniteData<Post[]>,[_1: string],number>({
        queryKey:["dataPostPreview"],
        queryFn: onHandleMyPostPreview,
        initialPageParam:0,
        getNextPageParam: (lastpage)=>lastpage.at(1)?.postId,
    })
    //스클롤 감지 하단으로 가면 다음 요청 보내기
    const {ref,inView}=useInView({
        threshold:0,
        delay:1000,

    });
    useEffect(()=>{
        if (inView && !isFetching && hasNextPage) {
            fetchNextPage();
          }

    },[inView,isFetching,hasNextPage,fetchNextPage])

    const onHandlePost = (postId: number) => {
        console.log(postId)
        router.push(`/${nickname}/dashboard/home/post`)
        dispatch(setPostId(postId))
      }
    return(
        <div className={styles.innerView}>
            <div className={styles.myProfile}>
                <div className={styles.header}>
                    <Image src={profileImg} alt=""/>
                    <div className={styles.profile}>
                        <span>{nickname}</span>
                        <span>sgky0511@naver.com</span>
                    </div>
                    <div className={styles.followers}>
                        <div>
                            <span>999</span>
                            <span>포스트</span>
                        </div>
                        <div>
                            <span>1300</span>
                            <span>팔로워</span>
                        </div>
                        <div>
                            <span>10</span>
                            <span>팔로잉</span>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.exp}>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className={styles.postContainer}>
                <div className={styles.wrapperContainer}>
                {dataPost?.pages.map((group,index)=>(
                        group.map((value)=>(
                    <div key={index}className={styles.wrapper} onClick={()=>onHandlePost(value.postId)}>
                               <div className={styles.previewHeader}>
                                    <div className={styles.profileCircle}>
                                        <Image src={profileImg} alt="profileImg"></Image>
                                    </div>
                                    <div className={styles.postBy}> <span>post</span> <b>{value.nickname}</b></div> 
                                    <span className={styles.likesCount}>{value.likeCount}</span>
                                    <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                            </div>
                            <div  className={styles.previewBox}>
                                <img src={value.imageUrl} alt="previewImg"></img>
                            </div>
                            <div className={styles.card}>
                                <h3>{value.title}</h3>
                                <div className={styles.tags}>
                                   {value.tags.map((value,index)=>(
                                       <span key={index}>{value}</span>
                                   ))}
                                    
                                 </div>
                            </div>
                            <div ref={ref} style={{height: 50}}></div>
                    </div>
                    
                    ))
                    ))}
                   
                </div>
          
               
            </div>
        </div>
    )
}