"use client"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./post.module.css"
interface Post {
    post_id: number;
    nickname: string;
    title: string;
    tags: { createdDate: string; modifiedDate: string; tagContent: string }[];
    like_count: number;
    is_like: boolean;
    image_url: string;
    createdDate: string;
    modifiedDate: string;
  }

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate: string = new Date(dateString).toLocaleDateString(
      "ko-KR",
      options
    );
    return formattedDate;
  };
  
  const formatRelativeTime = (dateString: string): string => {
    const now: Date = new Date();
    const date: Date = new Date(dateString);
    const diff: number = now.getTime() - date.getTime();
  
    // 분, 시간, 일로 계산
    const minutes: number = Math.floor(diff / 60000);
    const hours: number = Math.floor(diff / 3600000);
    const days: number = Math.floor(diff / 86400000);
  
    if (minutes < 1) {
      return "방금 전";
    } else if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      return formatDate(dateString);
    }
  };

export default function Post(){
    return(
        <div className={styles.postBackground}>
            <div className={styles.postContainer}>포스트</div>
        </div>
    )
}