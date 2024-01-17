"use client"

import axios from "axios"
import Image from "next/image"
import styles from "./mypost.module.css"
import likesIcon from "@/asset/images/likestar.png"
import { useEffect,useState} from "react"
import { useRouter } from "next/navigation"
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
  
export default function MyProfile(){
    const [dataPost, setDataPost] = useState<Post[]>([]);
    const router=useRouter()
    const onHandlePost =()=>{
        router.push('/dashboard/home/post')
    }
    useEffect(()=>{
    const responseDat = {
        data: [
          {
            post_id: 2,
            nickname: "하민",
            title: "하루 만에 혼자 3D 로 신년카드 웹앱을?",
            tags: [
              {
                createdDate: "2024-01-16T00:51:43.8662",
                modifiedDate: "2024-01-16T00:51:43.8662",
                tagContent: "카드",
              },
              {
                createdDate: "2024-01-16T00:51:43.869684",
                modifiedDate: "2024-01-16T00:51:43.869684",
                tagContent: "디자인",
              },
              {
                createdDate: "2024-01-16T00:51:43.869684",
                modifiedDate: "2024-01-16T00:51:43.869684",
                tagContent: "3d",
              },
            ],
            like_count: 1,
            is_like: true,
            image_url:
              "https://velog.velcdn.com/images/hmmhmmhm/post/f6cb929e-4552-4955-83ee-5d861225bc45/image.gif",
            createdDate: "2024-01-16T00:51:43.85549",
            modifiedDate: "2024-01-16T00:51:43.85549",
          },
          {
            post_id: 3,
            nickname: "김영은",
            title: "인터랙티브 3D web으로 만든 눈내리는",
            tags: [
              {
                createdDate: "2024-01-16T00:51:43.8662",
                modifiedDate: "2024-01-16T00:51:43.8662",
                tagContent: "3D",
              },
              {
                createdDate: "2024-01-16T00:51:43.869684",
                modifiedDate: "2024-01-16T00:51:43.869684",
                tagContent: "web",
              },
              {
                createdDate: "2024-01-16T00:51:43.869684",
                modifiedDate: "2024-01-16T00:51:43.869684",
                tagContent: "인터렉티브",
              },
            ],
            like_count: 5,
            is_like: true,
            image_url:
              "https://velog.velcdn.com/images/naro-kim/post/5765f485-9469-4a03-a0cf-2da5cf5c1ba5/image.gif",
            createdDate: "2024-01-16T00:51:43.85549",
            modifiedDate: "2024-01-16T00:51:43.85549",
          },
          {
            post_id: 4,
            nickname: "한대휘",
            title: "Next js ] Next js 란?",
            tags: [
              {
                createdDate: "2024-01-16T00:51:43.8662",
                modifiedDate: "2024-01-16T00:51:43.8662",
                tagContent: "next.js",
              },
              {
                createdDate: "2024-01-16T00:51:43.869684",
                modifiedDate: "2024-01-16T00:51:43.869684",
                tagContent: "web",
              },
              {
                createdDate: "2024-01-16T00:51:43.869684",
                modifiedDate: "2024-01-16T00:51:43.869684",
                tagContent: "프론트엔드",
              },
            ],
            like_count: 3,
            is_like: true,
            image_url:
              "https://miro.medium.com/v2/resize:fit:1300/format:webp/1*oAwGDARfOzWoZnq1Rhingg.png",
            createdDate: "2024-01-16T00:51:43.85549",
            modifiedDate: "2024-01-16T00:51:43.85549",
          },
        ],
      };
      setDataPost(responseDat.data);
      // api
      //   .get("/api/post/preview", {
      //     params: {
      //       url: url,
      //     },
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //     setDataPost(response.data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }, []);
    return(
        <div className={styles.moduleBackground} >
        <div className={styles.innerContents}>
        <div className={styles.postTabContainer}>
            </div>
            <div className={styles.collectionWrapper }>
            <ul className={styles.collection} >
            {dataPost.map((value , index)=>(
                <div key={index} className={styles.wrapper} onClick={onHandlePost}>
                <li className={styles.previewBox}>
                    <div className={styles.front}>
                    <img  src={value.image_url} alt="image"></img>
                    <h3>{value.title}</h3>
                    <div><span>
                    {value.modifiedDate
                      ? `수정됨: ${formatRelativeTime(value.modifiedDate)}`
                      : `작성됨: ${formatRelativeTime(value.createdDate)}`}
                  </span></div>
                    <div className={styles.contentHeader}>
                    <div className={styles.profileCircle}>
                        <img src="https://velog.velcdn.com/images/hmmhmmhm/profile/352c0d2c-9f4d-4489-a5c5-64d789a66a4b/image.webp" alt=''></img>  
                    </div>
                    <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                    <div className={styles.postBy}> <span>post</span> {value.nickname}</div> 
                    <span className={styles.likesCount}>{value.like_count}</span>
                    </div>
                    </div>
                    <div className={styles.back}> <div className={styles.content}>
                    <p>신년카드 웹앱 이미지 새해인사 우체통 (Web) 서비스 링크: https://postbox.run 위 URL 에서 실제로 신년인사 카드를 작성해보실 수 있어요! 코육대 예시 항해 플러스 코육대에서 행사를 연다는 소식을 한참 뒤늦게 듣고 빠르게 도전해보기 위</p>
                    </div></div>  
                </li>
                </div>      
            ))}
                
            </ul>
            </div>
        </div>
    </div>
    )
}