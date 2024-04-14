
"use client"
import Image from "next/image"
import styles from "./knowledgePreview.module.css"
import searchIcon from "@/asset/images/main/search.png"
import { useState } from "react";
export default function knowledgePreview(){
    const [divCount, setDivCount] = useState(0);
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
    return(
        <div className={styles.background}>
                <div className={styles.knowledgeLayout}>
                <div className={styles.headerMenu}>
                <div className={styles.searchBar}>
                    <Image src={searchIcon} alt="search"></Image>
                    <span>포스트 검색...</span>
                </div>
                </div>
                <div className={styles.boardLayout}>
                    <div className={styles.board}>
                        <div className={styles.board1}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className={styles.board}></div>
                </div>
            </div>
        </div>
    )
}