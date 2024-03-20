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
    postId: number;
    nickname: string;
    content:string;
    title: string;
    tags: string [];
    likeCount: number;
    like: boolean;
    imageUrl: string;
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
  const [isFullSize, setIsFullSize] = useState(false);
  const router = useRouter();

    async function onHandlePostDetail() {
      // try{
      //   const response =await axios.get<Post>("http://localhost:3001/postDetail", {
      //     params: {
      //       postId: 1// 'posId'를 'postId'로 수정
      //     },
      //   // headers: {
      //   //   "Content-Type": "application/json",
      //   //   Authorization: `Bearer ${accesstoken}`
      //   // }
      // })
      try{
        const response =await api.get<Post>(`/api/v1/posts/${postId}`, {
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

    const {data:dataPostDetail, isLoading, isError, isSuccess}=useQuery<any>({ 
      queryKey:["postDetail"],
      queryFn: onHandlePostDetail
    })
    useEffect(() => {
      if(isLoading){

        <div className={styles.postContainer}>로딩중입니다...</div>
      }
      if (isSuccess && dataPostDetail) {
        setLikeCount(dataPostDetail.likeCount ?? 0);
        setBtnPressed(dataPostDetail.like ?? false);
        setImg(dataPostDetail.like ? likeImg : unlikeImg);
      }
      
    }, [isSuccess, dataPostDetail, isLoading]);

    const postRef=useRef<HTMLDivElement>(null)
    const scrabRef=useRef<HTMLDivElement>(null)
    const memoRef=useRef<HTMLDivElement>(null)
    const footerRef=useRef<HTMLDivElement>(null)
   
    const onHandleLikeButton = async (postId:number) => {
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
        const response=await api.patch(`/api/v1/likes/${postId}`,{},{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
        console.log(response)
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
      if(postRef.current&&scrabRef.current&&memoRef.current&&footerRef.current){
        postRef.current.style.width = isFullSize ? "900px" : "100%";
        postRef.current.style.transition = "0.4s";
        scrabRef.current.style.height = isFullSize ? "500px" : "1000px";
        memoRef.current.style.marginTop = isFullSize ? "702px" : "1177.5px";
        footerRef.current.style.top=isFullSize? "1220px":"1700px"
          setIsFullSize(!isFullSize);
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
            postRef.current.style.width="60vw"
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
                    <div className={styles.headerContent}>
                      <div className={styles.title}><h1>{dataPostDetail?.title}</h1></div> 
                    <div className={styles.tagsContainer}>
                        <Image src={tagImg} alt="tag"></Image>
                        <span>태그:</span>
                        {dataPostDetail?.tags.map((value:any,index:any)=>(
                              <div key={index} className={styles.tagsIndex}>
                                <span className={styles.tagCircle}>{value}</span>
                            </div>
                        ))}     
                    </div>
                    <button className={styles.likeBtn} onClick={()=>onHandleLikeButton(dataPostDetail?.postId)}>
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
                    </div>
                  <div className={styles.ScrabContainer} ref={scrabRef}>
                    <div className={styles.scrabBox} dangerouslySetInnerHTML={{__html: dataPostDetail?.content}} ></div>
                  </div>
                  <div className={styles.postBoxContainer} ref={memoRef}>
                    <div className={styles.postBox} dangerouslySetInnerHTML={{__html: dataPostDetail?.memo}} ></div>
                  </div>
                  </div>

                <div ref={footerRef}className={styles.footer}>
                  <Comment />
                </div>
        </div>
    )
}