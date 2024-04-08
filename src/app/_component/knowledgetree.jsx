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
  import { useSelector } from "react-redux";
 
  const initialNodes = [];
  const initialEdges = [];
  const customNodeTypes = {
    custom: CustomNode, // Custom Node 컴포넌트 추가
    text: CustomTextNode,
  };

  export default function Home() {
    const nodeText = useSelector((state) => state.nodeData.nodes);
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
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
          "https://weblog-project.s3.ap-northeast-2.amazonaws.com/knowledgeTree/1712466191554.json",
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
    async function onHandleBestPostPreview({ pageParam }) {
      // try {
      //   const response = await api.get(
      //     `/api/v1/posts/ranks?type=WEEKLY&offset=0&limit=12`,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      //   return response.data;
      // } catch (error) {
      //   console.error(error);
      // }
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/posts/ranks?type=weekly&number=20&offset=${0}&limit=12`)
        console.log(response.data)
        return response.data.slicedData
    } catch (error) {
        console.error(error)
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
          x: 100,
          y:100,
        },
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);
    };

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
      };
      // try {
      //   const response = await axios.post(
      //     "http://localhost:8000/api/v1/savedData",
      //     boxes,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      //   return response.data;
      // } catch (error) {
      //   console.error(error);
      // }
      try {
        // 두 번째 단계: boxes 데이터를 서버에 전송
        const response2 = await axios.post('/api/uploadtree', boxes, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        console.log(response2.data); // 두 번째 단계 응답 확인
    
      } catch (error) {
        console.error('Error uploading boxes data:', error);
      }
    };
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
          onNodeClick={onElementClick}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    );
  }
