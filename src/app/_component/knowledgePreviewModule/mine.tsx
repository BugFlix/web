import styles from "./mine.module.css";
import { useState,useEffect } from "react";
import { useInView } from "react-intersection-observer"
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import api from "../../config/apiConfig";

type Tree ={
  canvasId: number;
  title: string;
  key: string;
  nickname: string ;
}

export default function Mine() {
  const accessToken=localStorage.getItem("accestoken")
  let [page,setPageParam]=useState(0)
  const onHandleknowledgeTreePreview=async()=>{
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
  return (
    <div className={styles.board}>
      <div className={styles.board1}>
                        {bestPost?.pages.map((group,index)=>(
                          group.map((value)=>(
                            <div key={index}>{value.title}</div>
                          ))
                        ))}
      </div>
    </div>
  );
}
