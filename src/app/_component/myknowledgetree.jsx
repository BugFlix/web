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
  import styles from "./myknowledge.module.css";
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

  export default function Myknowledgetree() {
    const nodeText = useSelector((state) => state.nodeData.nodes);
    const reduxCanvasId=useSelector((state)=>state.tree.canvasId)
    const reduxPostValue=useSelector((state)=>state.postValue.value)
    console.log(reduxPostValue)
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
    const onElementClick = (event, element) => {
      if (element && element.id) {
        handleSelectedNodeId(element.id);
        typeText(element.id)
      }
    };
    const typeText=(id)=>{
      setText(nodeText)
      const updatedNodes = nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              text: nodeText,
            },
          };
        }
        return node;
      });
      console.log(updatedNodes)
      setNodes([...updatedNodes]); 
    }
    useEffect(() => {
      typeText();
    }, [nodeText]);
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
      console.log("click")
      const id = (nodes.length + 1).toString();
      const postId=reduxPostValue.postId
      const title=reduxPostValue.title
      const nickname=reduxPostValue.nickname
      const tags=reduxPostValue.tags
      const imageUrl=reduxPostValue.imageUrl
      const likeCount=reduxPostValue.likeCount
      const profileImg=reduxPostValue.profileImageUrl
      const newNode = {
        id,
        type: "custom",
        data: { postId, title,tags, nickname,imageUrl,likeCount,profileImg }, // wrapper 내용으로 노드 label 설정
        position: {
          x: 100,
          y:100,
        },
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);
    };
    useEffect(()=>{
      handleWrapperClick()
    },[reduxPostValue])

    const handleText = () => {
      const id = (nodes.length + 1).toString();
      const newNode = {
        id,
        type: "text",
        data: {
          text: "",
        },
        position: {
          x:  200,
          y: 200,
        },
      };
      setNodes((prevNodes) => [...prevNodes, newNode])
    };
    const handleSave = async () => {
      const boxes = {
        nodes: nodes,
        edges: edges,
        name:key
      };

      try {
        // 두 번째 단계: boxes 데이터를 서버에 전송
        const response2 = await axios.post('/api/uploadtree', boxes, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        console.log(response2.data.fileName); // 두 번째 단계 응답 확인
        const body={
          title:canvasTitle,
          key:response2.data.fileName
        }
        const response3=await api.put(`/api/v1/canvases/${canvasId}`,body,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
        })
        console.log(response3.data)
    
      } catch (error) {
        console.error('Error uploading boxes data:', error);
      }
    };
    useEffect(()=>{
      localStorage.setItem("canvascanvasId",canvasId)
      localStorage.setItem("postpostValue",reduxPostValue)
      localStorage.setItem("keykey",key)
      localStorage.setItem("canvascanvasTitle",canvasTitle)
    },[canvasId,reduxPostValue,key,canvasTitle])
    return (
      <div className={styles.background}>
        
        <div className={styles.menu}>
        <button onClick={handleText} style={{ marginRight: "10px" }}>
              Add Text
            </button>
          <button onClick={handleSave} style={{ marginRight: "10px" }}>
            저장
          </button>
        </div>

        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={customNodeTypes}
          onNodeClick={onElementClick}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
          <TreeSearch setIsSearchbar={setIsSearchBar}/>
        
      </div>
    );
  }