"use client";
import Image from "next/image";
import styles from "./knowledgePreview.module.css";
import searchIcon from "@/asset/images/main/search.png";
import { useState, useEffect } from "react";
import Recent from "./knowledgePreviewModule/recent";
import Mine from "./knowledgePreviewModule/mine";
import CanvasSearch from "./canvassearch";
import axios from "axios";
import followClose from "@/asset/images/followclose.png"
import api from "../config/apiConfig";
export default function knowledgePreview() {
  const accessToken=localStorage.getItem("accestoken")
  const [divCount, setDivCount] = useState(0);
  const [isSearchbar, setIsSearchbar] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [treeTitle, setTreeTitle]=useState("")
  const handleSearchBar = () => {
    setIsSearchbar(true);
  };
  const handleChangeValue = (e:any)=>{
    setTreeTitle(e.target.value)
  }
  // div를 추가하는 함수
  const addDiv = () => {
    setDivCount(divCount + 1);
  };
  // 각 div의 스타일을 동적으로 결정하는 함수
  const getDivStyle = () => {
    const gradientIndex = divCount % 5; // 배경색 순환을 위해 나머지 연산 사용
    switch (gradientIndex) {
      case 0:
        return styles.gradient1;
      case 1:
        return styles.gradient2;
      case 2:
        return styles.gradient3;
      case 3:
        return styles.gradient4;
      case 4:
        return styles.gradient5;
      default:
        return styles.gradient1; // 기본적으로 첫 번째 스타일을 사용
    }
  };
  const handleAddOpen=()=>{
    setAddModal(true)
  }
  const handdleAddClose=()=>{
    setAddModal(false)
  }
  const addCanvase = async ()=>{
    const body={
      title:treeTitle,
      key:"default.json"
    }
    try{
      const response= await api.post("/api/v1/canvases",body,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      
      })
      console.log(response.data)
    }
    catch(error){
      console.error(error)
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.knowledgeLayout}>
        <div className={styles.headerMenu}>
          <button onClick={handleAddOpen}>추가</button>
          <div className={styles.searchBar} onClick={handleSearchBar}>
            <Image src={searchIcon} alt="search"></Image>
            <span>포스트 검색...</span>
          </div>
        </div>
        <div className={styles.boardLayout}>
        <Recent />
          <Mine />
        </div>
      </div>
      {isSearchbar ? <CanvasSearch setIsSearchbar={setIsSearchbar} /> : null}

      {addModal ? ( 
        <div className={styles.addView}>
          <div className={styles.addContainer}>
          <header><span>캔버스 추가</span>
                <button onClick={handdleAddClose}><Image src={followClose} alt="followClose"></Image></button></header>
            <input onChange={handleChangeValue} value={treeTitle}></input>
            <button onClick={addCanvase}>생성</button>
          </div>
        </div>):null}
    </div>
  );
}
