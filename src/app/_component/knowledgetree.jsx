  "use client";
  import React, { useState, useRef, useCallback, useEffect } from "react";
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
    useNodesState,
    useEdgesState
  } from "react-flow-renderer";
  import styles from "./knowledge.module.css";
  import profileImg from "@/asset/images/main/kwang.jpg";
  import likesIcon from "@/asset/images/likestar.png";
  import Image from "next/image";
  import { useQuery } from "@tanstack/react-query";
  import api from "../config/apiConfig";
  import CustomNode from "./customNodes/customNodes";
  import CustomTextNode from "./customNodes/customTextNodes";
  import axios from "axios";
  import { useDispatch, useSelector } from "react-redux";
  import TreeSearch from "./treesearch";
 
  const initialNodes = [];
  const initialEdges = [];
  const customNodeTypes = {
    custom: CustomNode, // Custom Node 컴포넌트 추가
    text: CustomTextNode,
  };

  export default function Home() {
    const nodeText = useSelector((state) => state.nodeData.nodes);
    const reduxCanvasId=useSelector((state)=>state.tree.canvasId)
    const reduxPostValue=useSelector((state)=>state.postValue.value)
    const reduxKey=useSelector((state)=>state.tree.key)
    const reduxCanvasTitle=useSelector((state)=>state.tree.title)
    const [canvasId]=useState(reduxCanvasId||localStorage.getItem("canvascanvasId"))
    const [postValue]=useState(reduxPostValue||localStorage.getItem("postpostValue"))
    const [key]=useState(reduxKey||localStorage.getItem("keykey"))
    const [canvasTitle]=useState(reduxCanvasTitle||localStorage.getItem("canvascanvasTitle"))
    const accessToken=localStorage.getItem("accestoken")
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
    const [isSearchbar, setIsSearchBar]=useState(false)
    const [text,setText]=useState("")
    const wrapperRef = useRef(null);
    const handleSelectedNodeId = (nodeId) => {
      // 선택된 노드의 ID를 사용하여 원하는 작업 수행
      console.log("선택된 노드의 ID:", nodeId);
      // 다른 작업 수행 가능
    };

    const fetchBoxes = async () => {
      try {
        const response = await axios.get(
          `https://weblog-project.s3.ap-northeast-2.amazonaws.com/knowledgeTree/${key}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setNodes(response.data.nodes || []);
        setEdges(response.data.edges || []);
       
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchBoxes();
    }, []);
   
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

    const handleWrapperClick = () => {
      const id = (nodes.length + 1).toString();
      const postId=postValue.postId
      const title=postValue.title
      const nickname=postValue.nickname
      const tags=postValue.tags
      const newNode = {
        id,
        type: "custom",
        data: { postId, title,tags, nickname }, // wrapper 내용으로 노드 label 설정
        position: {
          x: 100,
          y:100,
        },
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);
    };
    useEffect(()=>{
      handleWrapperClick()
    },[postValue])
    useEffect(()=>{
      localStorage.setItem("canvascanvasId",canvasId)
      localStorage.setItem("postpostValue",postValue)
      localStorage.setItem("keykey",key)
      localStorage.setItem("canvascanvasTitle",canvasTitle)
    },[canvasId,postValue,key,canvasTitle])
    return (
      <div className={styles.background}>
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={customNodeTypes}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
        
      </div>
    );
  }