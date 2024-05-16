import Image from "next/image"
import styles from "./profileLeftSection.module.css"
import likesIcon from "@/asset/images/likestar.png"
import profileImg from "@/asset/images/main/kwang.jpg"
import followClose from "@/asset/images/followclose.png"
import { useEffect,useState,useContext} from "react"
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { AuthContext } from "@/app/_component/Provider/authProvider";
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setPostId } from "@/app/slices/postSlice"
import { setDataPost } from '@/app/slices/datapost';
import api from "@/app/config/apiConfig"
import Post from "../post"
import axios from "axios"
import { useInView } from "react-intersection-observer"
import { RootState } from "@/app/reducers/rootReducer"

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
export default function ProfileLeftSection (){

    const dispatch = useDispatch()
    const url: string = window.location.href;
    const encodeUrl=encodeURIComponent(url)
    console.log(encodeUrl)
    const router=useRouter()
    const [follwerView, setFollowerView]=useState(false)
    const [follwingView, setFollowingView]=useState(false)
    const [followedBtn, setFollowedBtn]=useState(false)
    const reduxnickname=useSelector((state:RootState)=>state.profile.nickname)
    const [nickname, setNickname]=useState<any>(reduxnickname|| localStorage.getItem("profilename"))
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
        const response =await api.get(`/api/v2/posts/users/${nickname}?offset=${0}&limit=12`, {
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

    async function onHandleProfileData(){
      try{
        const response = await api.get(`/api/v1/profiles/users/${nickname}`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        })
        console.log(response.data)
        setFollowedBtn(response.data.followed)
        return response.data
      }
      catch(error){
        console.error(error)
      }
    }

    const {data: profileData}=useQuery<any>({
      queryKey:["profileData"],
      queryFn: onHandleProfileData
    })
    
    // //리액트쿼리를 이용한 데이터 헨들 무한스크롤
    const {data:dataPost, isLoading, isError, isSuccess, fetchNextPage, hasNextPage, isFetching  }=useInfiniteQuery<Post[],object,InfiniteData<Post[]>,[_1: string],number>({
        queryKey:["dataPostPreview"],
        queryFn: onHandleMyPostPreview,
        initialPageParam:0,
        getNextPageParam: (lastpage)=>lastpage.at(1)?.postId,
    })
    // 스클롤 감지 하단으로 가면 다음 요청 보내기
    const {ref,inView}=useInView({
        threshold:0,
        delay:1000,

    });
    // useEffect(()=>{
    //     if (inView && !isFetching && hasNextPage) {
    //         fetchNextPage();
    //       }

    // },[inView,isFetching,hasNextPage,fetchNextPage])

    async function onHandleFollwer(){
      try{
          const repsonse= await api.get(`/api/v1/follows/${nickname}/follower`,{
              headers:{
                  "Content-Type":"application/json",
                  Authorization: `Bearer ${accessToken}`
              }
          })
          console.log(repsonse.data)
          return repsonse.data
      }
      catch(error){
          console.error(error)
      }
  }

  async function onHandleFollowing(){
      try{
          const response = await api.get(`/api/v1/follows/${nickname}/following`,{
              headers:{
                  "Content-Type":"application/json",
                  Authorization: `Bearer ${accessToken}`
              }
          })
          console.log(response.data)
          return response.data
      }
      catch(error){
          console.error(error)
      }
  }
    const {data:followers}=useQuery<any>({
      queryKey:["followerKey"],
      queryFn:onHandleFollwer,
  })
  const {data: following}=useQuery<any>({
      queryKey:["followingKey"],
      queryFn: onHandleFollowing
  })

    const onHandlePost = (postId: number) => {
        console.log(postId)
        router.push(`/${nickname}/dashboard/home/post`)
        dispatch(setPostId(postId))
      }

    const onHandleFollowerView=()=>{
      setFollowerView(true)
    }
    const onHandleCloseFollowerView=()=>{
      setFollowerView(false)
    }
    const onHandleFollowingView=()=>{
      setFollowingView(true)
    }
    const onHandleCloseFollowingView=()=>{
      setFollowingView(false)
    }
    const addFollow = async ()=>{
      const body={
        nickname:nickname
      }
      try{
        const response = await api.post("/api/v1/follows",body,{
          headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${accessToken}`,
        }
        })
        console.log(response.data)
      }
      catch(error){
        console.error(error)
      }
    }
    const deleteFollow = async ()=>{
      try{
        const response=await api.delete("/api/v1/follows/following",{
          data:{
            nickname:nickname
          },
          headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${accessToken}`,
        }
        })
        
        console.log(response.data)
        if(response.status=200){
          window.location.reload()
        }
       
      }
      catch(error){
        console.error(error)
      }
    }
    useEffect(()=>{
      localStorage.setItem("profilename",nickname)
    },[nickname])
    console.log(dataPost)
    return(
        <div className={styles.innerView}>
            <div className={styles.myProfile}>
                <div className={styles.header}>
                  
                    <img src={profileData?.imageUrl} alt=""/>
                    <div className={styles.profile}>
                        <span>{profileData?.nickname}</span>
                        <span>{profileData?.email}</span>
                    </div>
                    {followedBtn ? (<button onClick={deleteFollow}>팔로잉</button>):<button onClick={addFollow}>팔로우</button>}
                    <div className={styles.followers}>
                        <div>
                            <span>{}</span>
                            <span>포스트</span>
                        </div>
                        <div onClick={onHandleFollowerView}>
                            {/* <span>{followers.length}</span> */}
                            <span>{followers?.length}</span>
                            <span>팔로워</span>
                        </div>
                        <div onClick={onHandleFollowingView}>
                            <span>{following?.length}</span>
                         
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
                                        <img src={profileData?.imageUrl} alt="profileImg"></img>
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
            {follwerView ?( 
              <div className={styles.followersView}>
              <div className={styles.followerContainer}>
                <header><span>팔로워</span>
                <button onClick={onHandleCloseFollowerView}><Image src={followClose} alt="followClose"></Image></button></header>
                {followers?.map((value:any,index:any)=>(
                  <div className={styles.follwerList}>
                  <div key={index} className={styles.followerListWrapper}>
                    <div className={styles.followerCircle}>
                      <img src={value?.profileImageUrl}></img>
                    </div>
                    <span>{value.nickname}</span>
                    <button>팔로잉</button>
                  </div>
                 </div>
                ))}
              </div>
            </div>
           ): null}
           {follwingView ?( 
              <div className={styles.followersView}>
              <div className={styles.followerContainer}>
                <header><span>팔로잉</span>
                <button onClick={onHandleCloseFollowingView}><Image src={followClose} alt="followClose"></Image></button></header>
                {following?.map((value:any,index:any)=>(
                  <div className={styles.follwerList}>
                  <div key={index} className={styles.followerListWrapper}>
                    <div className={styles.followerCircle}>
                      <img src={value?.profileImageUrl}></img>
                    </div>
                    <span>{value.nickname}</span>
                    <button>팔로잉</button>
                  </div>
                 </div>
                ))}
                </div>
            </div>
           ): null}
        </div>
    )
}