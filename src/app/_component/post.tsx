"use client"
import styles from "@/app/_component/post.module.css"
import { useRouter } from "next/navigation"
import {useState, useEffect, useRef } from "react"
import tagImg from "@/asset/images/tags.png"
import postImg from "@/asset/images/post.png"
import Image from "next/image"
import unlikeImg from "@/asset/images/unlikestar.png"
import likeImg from "@/asset/images/likestar.png"
import Comment from "@/app/_component/comment"
import api from "@/app/config/apiConfig"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import axios from "axios"
import { RootState } from '../reducers/rootReducer';


interface Post {
    post_id: number;
    nickname: string;
    content:string;
    title: string;
    tags: { createdDate: string; modifiedDate: string; tagContent: string }[];
    like_count: number;
    is_like: boolean;
    image_url: string;
    memo:string;
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

export default function Post(){
  const postId = useSelector((state: RootState) => state.post.postId);
  console.log(postId)
    const accessToken=localStorage.getItem("accestoken")
    const [likeCount, setLikeCount] = useState(0);
  const [btnPressed, setBtnPressed] = useState(false);
  const [img, setImg] = useState(btnPressed ? likeImg : unlikeImg);
  const router = useRouter();

    async function onHandlePostDetail() {
      // try{
      //   const response = await api.get(`/api/v1/posts/${postId}`, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   });
      //           console.log(response.data)
      //           return response.data;
      //           }catch(error){
      //             console.log(error)
      //       }
      try{
        const response =await axios.get<Post>("http://localhost:3001/postDetail", {
          params: {
            post_id: 1// 'posId'를 'postId'로 수정
          },
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

    const {data:dataPostDetail, isLoading, isError, isSuccess}=useQuery<any>({ 
      queryKey:["postDetail"],
      queryFn: onHandlePostDetail
    })
    useEffect(() => {
      if(isLoading){

        <div className={styles.postContainer}>로딩중입니다...</div>
      }
      if (isSuccess && dataPostDetail) {
        setLikeCount(dataPostDetail.like_count ?? 0);
        setBtnPressed(dataPostDetail.is_like ?? false);
        setImg(dataPostDetail.is_like ? likeImg : unlikeImg);
      }
      
    }, [isSuccess, dataPostDetail, isLoading]);

    const postRef=useRef<HTMLDivElement>(null)
    const scrabRef=useRef<HTMLDivElement>(null)
    const memoRef=useRef<HTMLDivElement>(null)
   
   
    const onHandleLikeButton = async () => {
      setLikeCount((prev) => {
        if (!btnPressed) {
          setImg(likeImg);
          setBtnPressed(true);
          return prev + 1;
        } else {
          setImg(unlikeImg);
          setBtnPressed(false);
          return prev - 1;
        }
      });
      try {
        // 비동기 작업 수행 (필요한 경우)
      } catch (error) {
        console.log(error);
      }
    };


    const onHandleClose = ()=>{
        if(postRef.current){
            postRef.current.style.width="0px"
            postRef.current.style.transition="0.4s"
            const transitionEndHandler = () => {
                router.back();
            };

            postRef.current.addEventListener('transitionend', transitionEndHandler);
        }
        
    }
    const onHandleFullSize = ()=>{
      if(postRef.current&&scrabRef.current&&memoRef.current){
          postRef.current.style.width="100%"
          postRef.current.style.transition="0.4s"
          scrabRef.current.style.height="1000px"
          memoRef.current.style.marginTop="1220px"
      }

  }
  useEffect(() => {
    const hideButtonsInContent = () => {
      if (dataPostDetail) {
        const contentContainer = document.createElement("div");
        contentContainer.innerHTML = dataPostDetail.content;
        const buttons = contentContainer.querySelectorAll<HTMLButtonElement>(".but");
  
        buttons.forEach((button) => {
          button.style.visibility = "hidden";
        });
  
        dataPostDetail.content = contentContainer.innerHTML;
      }
    };
  
    hideButtonsInContent();
  }, [dataPostDetail]);
    
    useEffect(()=>{
        if(postRef.current){
            postRef.current.style.width="900px"
            postRef.current.style.transition="0.4s"
        }
    },[])

    return(
        <div className={styles.postBackground} ref={postRef}>
                <div className={styles.buttons}>
                  <button className={styles.closeBtn} onClick={onHandleClose}></button>
                  <button className={styles.fullScreenBtn} onClick={onHandleFullSize}></button>
                </div>
                  <div className={styles.postContainer}>
                  <div className={styles.title}><h1>{dataPostDetail?.title}</h1></div> 
                  <div className={styles.tagsContainer}>
                      <Image src={tagImg} alt="tag"></Image>
                      <span>태그:</span>
                      {dataPostDetail?.tags.map((value:any,index:any)=>(
                            <div key={index} className={styles.tagsIndex}>
                              <span className={styles.tagCircle}>{value.tagContent}</span>
                          </div>
                      ))}     
                  </div>
                  <button className={styles.likeBtn} onClick={onHandleLikeButton}>
                  <Image src={img} alt="img"></Image>
                  </button>
                   <span className={styles.likeValue}>{likeCount}</span>
                  <div className={styles.postBy}>
                      <Image src={postImg} alt="postBY"></Image>
                      <span>post:</span>
                      <b>{dataPostDetail?.nickname}</b>
                      <span>
                      {dataPostDetail?.modifiedDate
                        ? `수정됨: ${formatRelativeTime(dataPostDetail?.modifiedDate)}`
                        : `작성됨: ${formatRelativeTime(dataPostDetail?.createdDate)}`}
                    </span>
                  </div>
                  <div className={styles.ScrabContainer} ref={scrabRef}>
                    <div className={styles.scrabBox} dangerouslySetInnerHTML={{__html: dataPostDetail?.content}} ></div>
                  </div>
                  <div className={styles.postBoxContainer} ref={memoRef}>
                    <div className={styles.postBox} dangerouslySetInnerHTML={{__html: dataPostDetail?.memo}} ></div>
                  </div>
                  </div>

                <div className={styles.footer}>
                  <Comment />
                </div>
        </div>
    )
}