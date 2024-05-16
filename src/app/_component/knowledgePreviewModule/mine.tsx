"use client"
import styles from "./mine.module.css";
import { useState,useEffect } from "react";
import { useInView } from "react-intersection-observer"
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import api from "../../config/apiConfig";
import { useRouter } from "next/navigation"
import { setCanvasId, setKey } from "@/app/slices/treeNumber";
import { useDispatch } from "react-redux";

type Tree ={
  canvasId: number;
  title: string;
  key: string;
  nickname: string ;
}

export default function Mine() {
  const accessToken=localStorage.getItem("accestoken")
  const router=useRouter()
  const dispatch=useDispatch()
  let [page,setPageParam]=useState(0)
  const onHandleMyKnowledgeTreePreview=async()=>{
    try{
      const response=await api.get(`/api/v1/canvases/mine?offset=${page}&limit=12`,{
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${accessToken}`

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
    data: bestDataPost,
    isLoading,
    isError,
    isSuccess,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching
} = useInfiniteQuery<Tree[], object, InfiniteData<Tree[]>, [_1: string], number>({
    queryKey: ["bestPostPreview"],
    queryFn: onHandleMyKnowledgeTreePreview,
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
      router.push("knowledgetree/myview")
  
   
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
const onDeleteTree=async (canvasId:any)=>{
  try{
    const resposne = await api.delete(`/api/v1/canvases/${canvasId}`,{
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${accessToken}`

      }
    })
    if(resposne.status==200){
      window.location.reload()
    }
  }catch(error){
    console.error(error)
  }
}
  return (
   <div>
    <h3>마이 캠버스</h3>
     <div className={styles.board}>
     {bestDataPost?.pages.map((group, index) => (
          group.map((value, idx) => (
            <div key={index * 100 + idx} className={styles['board-item']} style={{ background: `linear-gradient(180deg, ${getRandomGradient()})` }}>
            <div className={styles['content']} onClick={() => onHandleTree(value.canvasId, value.key, value.nickname)}>
              <div className={styles['title']}>{value.title}</div>
              <div className={styles['nickname']}>{value.nickname}</div>
            </div>
            <button className={styles['delete-button']} onClick={() => onDeleteTree(value.canvasId)}>삭제</button>
          </div>
          ))
        ))}
    </div>
   </div>
  );
}
