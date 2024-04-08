import styles from "./leftsection.module.css"
import searchIcon from "@/asset/images/main/search.png"
import fireIcon from "@/asset/images/main/hot.png"
import profileImg from "@/asset/images/main/kwang.jpg"
import likesIcon from "@/asset/images/likestar.png"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/app/_component/Provider/authProvider"
import { useContext, useEffect, useRef, useState } from "react"
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { useDispatch } from "react-redux"
import { setPostId } from "@/app/slices/postSlice"
import axios from "axios"
import api from "@/app/config/apiConfig"
import Search from "../search"
type Post ={
    postId: number;
    nickname: string;
    title: string;
    tags: string [];
    likeCount: number;
    is_like: boolean;
    imageUrl: string;
    createdDate: string;
    modifiedDate: string;
}
export default function LeftSection(){
    const {isLogin,nickname}=useContext(AuthContext)
    const [datePostMenu, setDatePostMenu]=useState("WEEKLY")
    const [isSearchbar,setIsSearchbar]=useState(false)
    const dispatch = useDispatch()
    const HandleSearch=()=>{
        setIsSearchbar(true)
    }
    const router=useRouter()
        //인기포스트 요청
        async function onHandleBestPostPreview({ pageParam }: { pageParam?: number }) {
            try {
                const response = await api.get(`/api/v1/posts/ranks?type=${datePostMenu}&offset=${pageParam}&limit=12`,{
                    headers:{
                        "Content-Type":"application/json",

                    }
                })
                console.log(response.data)
                return response.data
            } catch (error) {
                console.error(error)
            }
            // try {
            //     const response = await axios.get(`http://localhost:8000/api/v1/posts/ranks?type=weekly&number=20&offset=${pageParam}&limit=12`)
            //     console.log(response.data)
            //     return response.data.slicedData
            // } catch (error) {
            //     console.error(error)
            // }
        }
        //리액트쿼리를 이용한 데이터 헨들 무한스크롤
        const {data:bestPost, isLoading, isError, isSuccess,refetch, fetchNextPage, hasNextPage, isFetching  }=useInfiniteQuery<Post[],object,InfiniteData<Post[]>,[_1: string],number>({
            queryKey:["bestPostPreview"],
            queryFn: onHandleBestPostPreview,
            initialPageParam:0,
            getNextPageParam: (lastpage)=>lastpage.at(-1)?.postId,
       
    
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

        const onHandlePost =(postid:number)=>{
            console.log(postid)
            if(isLogin){
                router.push(`/${nickname}/dashboard/home/post`)
                dispatch(setPostId(postid))
            }
            else{
                router.push(`/dashboard/home/post`)
                dispatch(setPostId(postid))
            }
            
        }
        const handlePostTab= (tab:any)=>{
            setDatePostMenu(tab)
            refetch();  
        }
    return(
        <div className={styles.leftSection}>
            <div className={styles.postTab}>
                <div className={styles.searchBar} onClick={HandleSearch}>
                    <Image src={searchIcon} alt="search"></Image>
                    <span>포스트 검색...</span>
                </div>
                <div className={styles.popularHeader}>
                    <h1>인기포스트</h1>
                    <div className={styles.trendHeader}>
                        <Image src={fireIcon} alt="fire"></Image>
                        <span>트렌드 태그</span>
                        <div className={styles.tag}>
                            <span>알고리즘</span>
                            <span>태그</span>
                            <span>신년일교</span>
                        </div>
                    </div>
                </div>
                <div className={styles.popularTab}>
                        <span onClick={()=>handlePostTab("WEEKLY")}>주간</span>
                        <span onClick={()=>handlePostTab("MONTHLY")}>월간</span>
                        <span onClick={()=>handlePostTab("YEARLY")}>연간</span>
                </div>
            </div>
            {/* 포스트 컨테이너 */}
            <div className={styles.postContainer}>
                <div className={styles.wrapperContainer}>
                {bestPost?.pages.map((group,index)=>(
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
                            {/* <div ref={ref} style={{height:50}}></div> */}
                    </div>
                    
                    ))
                    ))}
                   
                </div>
          
                {isSearchbar && <Search setIsSearchbar={setIsSearchbar} />}
            </div>
            
         </div>
    )
}