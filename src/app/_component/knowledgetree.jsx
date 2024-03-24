"use client"
import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  DefaultEdgeOptions,
  NodeTypes,
} from "react-flow-renderer";
import styles from "./knowledge.module.css";
import profileImg from "@/asset/images/main/kwang.jpg";
import likesIcon from "@/asset/images/likestar.png";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "../config/apiConfig";

const initialNodes = [

];
const initialEdges = [];

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const wrapperRef = useRef(null);
  async function onHandleBestPostPreview({ pageParam }) {
    try {
        const response = await api.get(`/api/v1/posts/ranks?type=WEEKLY&offset=0&limit=12`,{
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
const {data:bestPost}=useQuery({
  queryKey:"bestPost",
  queryFn:onHandleBestPostPreview
})
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleWrapperClick = (title,count,image,nickname) => {
    const wrapperContent = (
      <div className={styles.wrapper}>
        <div className={styles.previewHeader}>
          <div className={styles.profileCircle}>
            <Image src={profileImg} alt="profileImg" />
          </div>
          <div className={styles.postBy}>
            <span>post</span> <b>{nickname}</b>
          </div>
          <span className={styles.likesCount}>{count}</span>
          <div className={styles.likes}>
            <Image src={likesIcon} alt="like" />
          </div>
        </div>
        <div className={styles.previewBox}>
          <img src={image} alt="previewImg" />
        </div>
        <div className={styles.card}>
          <h3>{title}</h3>
          <div className={styles.tags}>
            <span>알고리즘</span>
          </div>
        </div>
      </div>
    );
    const id = (nodes.length + 1).toString();
    const newNode = {
      id,
      data: { label: wrapperContent }, // wrapper 내용으로 노드 label 설정
      position: { x: event.clientX - wrapperRef.current.offsetLeft - 100, y: event.clientY - wrapperRef.current.offsetTop - 100 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };
  
  return (
    <div className={styles.background}>
      <div className={styles.searchContainer}>
      <div className={styles.wrapperContainer}>
                {bestPost && bestPost.map((value, index)=>(
                    <div key={index}className={styles.wrapper} ref={wrapperRef} onClick={ ()=>handleWrapperClick(value.title,value.likeCount,value.imageUrl,value.nickname)}>
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
                  
                    ))}
                   
                </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background gap={8} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
