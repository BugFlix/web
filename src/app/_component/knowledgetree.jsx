"use client";
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
import CustomNode from "./customNodes/customNodes";

const initialNodes = [];
const initialEdges = [];
const customNodeTypes = {
  custom: CustomNode, // Custom Node 컴포넌트 추가
};

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const wrapperRef = useRef(null);
  async function onHandleBestPostPreview({ pageParam }) {
    try {
      const response = await api.get(
        `/api/v1/posts/ranks?type=WEEKLY&offset=0&limit=12`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  //리액트쿼리를 이용한 데이터 헨들 무한스크롤
  const { data: bestPost } = useQuery({
    queryKey: "bestPost",
    queryFn: onHandleBestPostPreview,
  });
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = (params) => {
    console.log("onConnect params:", params); // 연결된 노드들의 정보를 콘솔에 출력
    const { source, target } = params;
    const newEdge = {
      id: `edge-${source}-${target}`,
      source,
      target,
    };
    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };

  const handleWrapperClick = (postId, title, count, image, nickname) => {
    const id = (nodes.length + 1).toString();
    const newNode = {
      id,
      type: "custom",
      data: { postId, title, count, image, nickname }, // wrapper 내용으로 노드 label 설정
      position: {
        x: event.clientX - wrapperRef.current.offsetLeft - 100,
        y: event.clientY - wrapperRef.current.offsetTop - 100,
      },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  return (
    <div className={styles.background}>
      <div className={styles.searchContainer}>
        <div className={styles.wrapperContainer}>
          {bestPost &&
            bestPost.map((value, index) => (
              <div
                key={index}
                className={styles.wrapper}
                ref={wrapperRef}
                onClick={() =>
                  handleWrapperClick(
                    value.postId,
                    value.title,
                    value.likeCount,
                    value.imageUrl,
                    value.nickname
                  )
                }
              >
                <div className={styles.previewHeader}>
                  <div className={styles.profileCircle}>
                    <Image src={profileImg} alt="profileImg"></Image>
                  </div>
                  <div className={styles.postBy}>
                    {" "}
                    <span>post</span> <b>{value.nickname}</b>
                  </div>
                  <span className={styles.likesCount}>{value.likeCount}</span>
                  <div className={styles.likes}>
                    <Image src={likesIcon} alt="like"></Image>
                  </div>
                </div>
                <div className={styles.previewBox}>
                  <img src={value.imageUrl} alt="previewImg"></img>
                </div>
                <div className={styles.card}>
                  <h3>{value.title}</h3>
                  <div className={styles.tags}>
                    {value.tags.map((value, index) => (
                      <span key={index}>{value}</span>
                    ))}
                  </div>
                </div>
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
        nodeTypes={customNodeTypes}
      >
       <Background  />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
