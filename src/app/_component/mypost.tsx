"use client"

import axios from "axios"
import styles from "./mypost.module.css"
import { useEffect,useState,useContext} from "react"
import { useQuery } from "@tanstack/react-query"
import { AuthContext } from "./Provider/authProvider";
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setPostId } from "../slices/postSlice"
import { setDataPost } from '@/app/slices/datapost';
import api from "@/app/config/apiConfig"
import Post from "./post"
import Myleftsection from "./myPostModule/myleftsection"
import MyRightSection from "./myPostModule/myrightsection"
import { Doughnut } from "react-chartjs-2"
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

interface Post {
    postId: number;
    nickname: string;
    title: string;
    tags: string [];
    like_count: number;
    is_like: boolean;
    imageUrl: string;
    createdDate: string;
    modifiedDate: string;
  }
export default function MyPost(){
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
      const response =await axios.get("/api/v1/posts/mine", {
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
  
  const { data: datapost, isLoading, isError, isSuccess } = useQuery<Post[]>({
    queryKey: ["mypostpreview"],
    queryFn: onHandleMyPostPreview,


  });
  if(datapost){
    dispatch(setDataPost(datapost))
  }


  

    
    return(
        <div className={styles.moduleBackground}>
          <Myleftsection/>
          <MyRightSection/>
        </div>
    )
}