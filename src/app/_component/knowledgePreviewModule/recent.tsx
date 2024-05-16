"use client"
import styles from "./recent.module.css";
import {useContext,useState,useEffect } from "react";
import { useInView } from "react-intersection-observer"
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import api from "../../config/apiConfig";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCanvasId } from "@/app/slices/treeNumber";
import { setKey } from "@/app/slices/treeNumber";
import { AuthContext } from "../Provider/authProvider";



type Tree ={
  canvasId: number;
  title: string;
  key: string;
  nickname: string ;
}

export default function Recent() {
  const accessToken=localStorage.getItem("accestoken")
  const {nickname}=useContext(AuthContext)
  const dispatch=useDispatch()
  const router=useRouter()
  let [page,setPageParam]=useState(0)
  const onHandleknowledgeTreePreview=async()=>{
    try{
      const response=await api.get(`/api/v1/canvases?offset=${page}&limit=12`,{
        headers:{
          "Content-Type":"application/json",


        }
      })
      console.log(response.data)
      return response.data
    }
    catch(error){
      console.log(error)
    }
  }
  const {
    data: bestPost,
    isLoading,
    isError,
    isSuccess,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching
} = useInfiniteQuery<Tree[], object, InfiniteData<Tree[]>, [_1: string], number>({
    queryKey: ["bestPostPreview"],
    queryFn: onHandleknowledgeTreePreview,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.slice(-1)?.[0]?.canvasId, // Adjusted this line
});

//스클롤 감지 하단으로 가면 다음 요청 보내기
const {ref,inView}=useInView({
    threshold:0,
    delay:1000,

});
useEffect(()=>{
    if (inView && !isFetching && hasNextPage) {
      setPageParam(++page)
        fetchNextPage();
      }

},[inView,isFetching,hasNextPage,fetchNextPage])

const onHandleTree=async(canvasId:number,key:string, treenickname:string)=>{
  console.log(canvasId, key)
  try{
    if(treenickname==nickname){
      router.push("knowledgetree/myview")
    }
    else{
      router.push("knowledgetree/view")
    }
   
    dispatch(setCanvasId(canvasId))
    dispatch(setKey(key))
  }catch(error){
    console.error(error)
  }
}

const getRandomGradient = () => {
  const colors = [
    '#C8DCFD, #CFDFFC, #D5E3FB, #DDE7FA',
    '#D1CBFD, #D5CEFD, #DAD4FB, #E3DEFA',
    '#FDE3CA, #FDE5CE, #FEEBD9, #FEEDDD',
    '#C3F0FB, #C9F1FA, #D4F3F9, #D9F4F9',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
  return (
    <div>
      <h3>최근 등록된 캔버스</h3>
      <div className={styles.board}>
  {bestPost?.pages.map((group, index) => (
    group.map((value, idx) => (
      <div key={index * 100 + idx} className={styles['board-item']} style={{ background: `linear-gradient(180deg, ${getRandomGradient()})` }}>
      <div className={styles['content']} onClick={() => onHandleTree(value.canvasId, value.key, value.nickname)}>
        <div className={styles['title']}>{value.title}</div>
        <div className={styles['nickname']}>{value.nickname}</div>
      </div>
    </div>
    ))
  ))}
</div>
    </div>
    
  );
}
