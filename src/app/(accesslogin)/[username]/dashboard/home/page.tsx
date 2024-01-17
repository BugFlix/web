"use client"
import Image from "next/image"
import styles from "./home.module.css"
import likesIcon from "@/asset/images/likestar.png"
import { ReactNode, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { revalidatePath, revalidateTag } from "next/cache"
async function getPostsRecommends() {
    const response = await fetch("/api/v1/user",{
        next:{
            tags:['posts','recommends']//넥스트에서 태그를 지원
        },
        cache:'no-store'// 저장을 안하려면 
    })

    if (!response.ok){
        throw new Error('데이터 가져오기 실패')
    }
    // revalidateTag('recommends') 캐시 초기화 하기 위한 태그 
    //revalidatePath('/home') 현재 페이지 데이터를 새로고침
    
    return response.json() //서버에서 받아온 데이터 기본적으로 자동 저장 
}
export default  function Home(){
    // const queryClient=new QueryClient()
    // //querykey가 있으면 queryFN 함수를 실행 해라 이런 뜻이다 
    // //posts 와 recommends는 한 쌍 
    // await queryClient.prefetchQuery({queryKey:['posts','recommends'],queryFn: getPostsRecommends})
    // const dehydratedState=dehydrate(queryClient)// hydrated는 서버에서온 데이터를 클라이언트에서 형식 맞추어서 물려받음

    // //값 가져오기
    // queryClient.getQueryData(['posts','recommends'])

    const tabRef=useRef<HTMLDivElement>(null)
    const slideRef = useRef<HTMLDivElement>(null);
    const [tabMenu, setTabMenu]=useState("popularTab")
    const router=useRouter()
    const onHandleTab=(prev:string)=>{
        setTabMenu(prev);
        if (slideRef.current) {
            slideRef.current.scrollLeft = tabMenu === "recommendTab" ? 0: 3000;
            slideRef.current.style.scale = "0.75";
            slideRef.current.style.transition = "0.5s";
          
            const intervalId = setInterval(() => {
              if (slideRef.current) {
                slideRef.current.style.scale = "1";
              }
            }, 500);
          
            setTimeout(() => {
              clearInterval(intervalId);
            }, 500);

          }
    }
    useEffect(()=>{
      if(tabRef.current){
        tabRef.current.style.left=tabMenu==="recommendTab"? '100px':'0'
        tabRef.current.style.transition="0.5s"
      }
    },[tabMenu])

    const onHandlePost =()=>{
        router.push('/dashboard/home/post')
    }
    return(
        <div className={styles.moduleBackground} >
            <div className={styles.innerContents}>
            <div className={styles.postTabContainer}>
                    <div className={styles.postTab}>
                      <div ref={tabRef} className={styles.tabActive}>
                      </div>
                      <section className={styles.popularTab}  onClick={()=> onHandleTab("popularTab")}> 인기포스트</section>
                        <section className={styles.recommendTab } onClick={()=>onHandleTab("recommendTab")}> 추천순</section>
                    </div>
                </div>
                {/* <HydrationBoundary state={dehydratedState}> */}
                <div className={styles.collectionWrapper } ref={slideRef}>
                <ul className={styles.collection} >
                    
                    <div className={styles.wrapper} onClick={onHandlePost}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/hmmhmmhm/post/f6cb929e-4552-4955-83ee-5d861225bc45/image.gif" alt="image"></img>
                        <h3>하루 만에 혼자 3D 로 신년카드 웹앱을?</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/hmmhmmhm/profile/352c0d2c-9f4d-4489-a5c5-64d789a66a4b/image.webp" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>하민</b></div> 
                        <span className={styles.likesCount}>200</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>신년카드 웹앱 이미지 새해인사 우체통 (Web) 서비스 링크: https://postbox.run 위 URL 에서 실제로 신년인사 카드를 작성해보실 수 있어요! 코육대 예시 항해 플러스 코육대에서 행사를 연다는 소식을 한참 뒤늦게 듣고 빠르게 도전해보기 위</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper} onClick={onHandlePost}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/greencloud/post/4ad0de67-bbaa-46af-8630-0f0d947791b5/image.GIF" alt="image"></img>
                        <h3>api 와장창 호출하지 않는 법 (Feat. 디바운스)</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/greencloud/profile/0c3223ce-47f4-4e04-b9ce-1a75949c73f4/image.PNG" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>가은</b></div> 
                        <span className={styles.likesCount}>57</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>일부러 거절당하기</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/teo/post/4320ed12-8242-4245-b58b-c1f05445c5b7/image.png" alt="image"></img>
                        <h3>나를 프로그래밍 해보자.</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/teo/profile/392ec036-5070-4c97-aabe-100969716dd9/image.jpg" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>teo.yu</b></div> 
                        <span className={styles.likesCount}>36</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>블로그 글을 써야겠다는 생각은 하고 있었지만 뭔가 기술적인 새로움이나 적어봄직한 내용들이 없어서 주제를 찾다가 제 커뮤니티 “개발자유머” 채널에 올린</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/medistream/post/bd57e6a2-e377-4f7a-aa07-d4da26c86e66/image.png" alt="image"></img>
                        <h3>[1편] .env 파일 관리, 환경변수 공유 쉽게 하</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/medistream/profile/d09ac64a-c557-47fa-a6e4-61a7e796cc3b/image.webp" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>메디스트림</b></div> 
                        <span className={styles.likesCount}>34</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>레파지토리 +50 개, 환경변수 +1000 개 .env 공유로는 해결 불가</p>
                       </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/redjen/post/eb78f214-4adb-4da3-a11a-bdcf3b0627b7/image.jpg" alt="image"></img>
                        <h3>2년차 개발자의 2023년 회고</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://images.velog.io/images/redjen/profile/69c8ece6-4212-4155-bde8-72cd3c8789f6/SW%EC%95%84%EC%9D%B4%EC%BD%98.jpg" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>redjen</b></div> 
                        <span className={styles.likesCount}>8</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>질려버린 음악을 늘어지게 듣다가 어느새 불빛들이 이어지네</p>
                       </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/yongtae923/post/4deed4dd-65b3-4243-a44c-be3c4cf00142/image.jpg" alt="image"></img>
                        <h3>개발자가 퇴사하고 컨설턴트가 되었지만 복학했습니다</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://images.velog.io/images/yongtae923/profile/a7f26053-bebc-4b47-a2e6-a620f86e89d3/yongtae_logo.jpg" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>Tate 김용태</b></div> 
                        <span className={styles.likesCount}>1</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>회고를 시작하기에 앞서 먼저 간단한 자기 소개를 해보겠습니다. 제 이름은 김용태이고, Tate 혹은 용태로 불리고 있습니다. 전공은 뇌공학이며, 지난 3년 동안 여성 패션 플랫폼 A사와 게임 플랫폼 U사에서 백</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/sksmsfbrjs/post/1823393c-ae5f-4bfd-b1d7-bc69f8dbbb2b/image.png" alt="image" ></img>
                        <h3>[Express.js] EC2 인스턴스와 S3 연결하기</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/sksmsfbrjs/profile/ae158442-2852-4bfd-b970-a48f0f830c19/social_profile.png" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>유건</b></div> 
                        <span className={styles.likesCount}>0</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>생성한 EC2 인스턴스에 생성한 S3 버킷을 연결하면 끝!</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/aksen5240/post/597136e4-42aa-445e-a1d2-d493ac1c020e/image.gif" alt="image"></img>
                        <h3>Figma 단축키 모음 (in Mac)</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/aksen5240/profile/50fb3f0d-ad03-47eb-b410-5c1c046ffe0e/social_profile.png" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>aksen5240</b></div> 
                        <span className={styles.likesCount}>0</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>Figma를 사용하다보면, Figma에서 제공하는 각종 기능들을 더 빠르고 효과적으로 사용하고 싶을 때가 많다. 이럴 때 단축키를 어느정도 숙지하면 생산성을 높이면서도 작업 시간을 줄일 수 있다.이에, 이번 글</p>
                        </div></div>  
                    </li>
                    </div>
                </ul>
                {/* 다른 컴포넌트 */}

                <ul className={styles.collection}>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/hmmhmmhm/post/f6cb929e-4552-4955-83ee-5d861225bc45/image.gif" alt="image"></img>
                        <h3>하루 만에 혼자 3D 로 신년카드 웹앱을?</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/hmmhmmhm/profile/352c0d2c-9f4d-4489-a5c5-64d789a66a4b/image.webp" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>하민</b></div> 
                        <span className={styles.likesCount}>200</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>신년카드 웹앱 이미지 새해인사 우체통 (Web) 서비스 링크: https://postbox.run 위 URL 에서 실제로 신년인사 카드를 작성해보실 수 있어요! 코육대 예시 항해 플러스 코육대에서 행사를 연다는 소식을 한참 뒤늦게 듣고 빠르게 도전해보기 위</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/greencloud/post/4ad0de67-bbaa-46af-8630-0f0d947791b5/image.GIF" alt="image"></img>
                        <h3>api 와장창 호출하지 않는 법 (Feat. 디바운스)</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/greencloud/profile/0c3223ce-47f4-4e04-b9ce-1a75949c73f4/image.PNG" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>가은</b></div> 
                        <span className={styles.likesCount}>57</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>일부러 거절당하기</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/teo/post/4320ed12-8242-4245-b58b-c1f05445c5b7/image.png" alt="image"></img>
                        <h3>나를 프로그래밍 해보자.</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/teo/profile/392ec036-5070-4c97-aabe-100969716dd9/image.jpg" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>teo.yu</b></div> 
                        <span className={styles.likesCount}>36</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>블로그 글을 써야겠다는 생각은 하고 있었지만 뭔가 기술적인 새로움이나 적어봄직한 내용들이 없어서 주제를 찾다가 제 커뮤니티 “개발자유머” 채널에 올린</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/medistream/post/bd57e6a2-e377-4f7a-aa07-d4da26c86e66/image.png" alt="image"></img>
                        <h3>[1편] .env 파일 관리, 환경변수 공유 쉽게 하</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/medistream/profile/d09ac64a-c557-47fa-a6e4-61a7e796cc3b/image.webp" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>메디스트림</b></div> 
                        <span className={styles.likesCount}>34</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>레파지토리 +50 개, 환경변수 +1000 개 .env 공유로는 해결 불가</p>
                       </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/redjen/post/eb78f214-4adb-4da3-a11a-bdcf3b0627b7/image.jpg" alt="image"></img>
                        <h3>2년차 개발자의 2023년 회고</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://images.velog.io/images/redjen/profile/69c8ece6-4212-4155-bde8-72cd3c8789f6/SW%EC%95%84%EC%9D%B4%EC%BD%98.jpg" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>redjen</b></div> 
                        <span className={styles.likesCount}>8</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>질려버린 음악을 늘어지게 듣다가 어느새 불빛들이 이어지네</p>
                       </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/yongtae923/post/4deed4dd-65b3-4243-a44c-be3c4cf00142/image.jpg" alt="image"></img>
                        <h3>개발자가 퇴사하고 컨설턴트가 되었지만 복학했습니다</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://images.velog.io/images/yongtae923/profile/a7f26053-bebc-4b47-a2e6-a620f86e89d3/yongtae_logo.jpg" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>Tate 김용태</b></div> 
                        <span className={styles.likesCount}>1</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>회고를 시작하기에 앞서 먼저 간단한 자기 소개를 해보겠습니다. 제 이름은 김용태이고, Tate 혹은 용태로 불리고 있습니다. 전공은 뇌공학이며, 지난 3년 동안 여성 패션 플랫폼 A사와 게임 플랫폼 U사에서 백</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/sksmsfbrjs/post/1823393c-ae5f-4bfd-b1d7-bc69f8dbbb2b/image.png" alt="image"></img>
                        <h3>[Express.js] EC2 인스턴스와 S3 연결하기</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/sksmsfbrjs/profile/ae158442-2852-4bfd-b970-a48f0f830c19/social_profile.png" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>유건</b></div> 
                        <span className={styles.likesCount}>0</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>생성한 EC2 인스턴스에 생성한 S3 버킷을 연결하면 끝!</p>
                        </div></div>  
                    </li>
                    </div>
                    <div className={styles.wrapper}>
                    <li className={styles.previewBox}>
                        <div className={styles.front}>
                        <img  src="https://velog.velcdn.com/images/aksen5240/post/597136e4-42aa-445e-a1d2-d493ac1c020e/image.gif" alt="image"></img>
                        <h3>Figma 단축키 모음 (in Mac)</h3>
                        <div className={styles.contentHeader}>
                        <div className={styles.profileCircle}>
                            <img src="https://velog.velcdn.com/images/aksen5240/profile/50fb3f0d-ad03-47eb-b410-5c1c046ffe0e/social_profile.png" alt=''></img>  
                        </div>
                        <div className={styles.likes}><Image src={likesIcon} alt="like"></Image></div>
                        <div className={styles.postBy}> <span>post</span> <b>aksen5240</b></div> 
                        <span className={styles.likesCount}>0</span>
                        </div>
                        </div>
                        <div className={styles.back}> <div className={styles.content}>
                        <p>Figma를 사용하다보면, Figma에서 제공하는 각종 기능들을 더 빠르고 효과적으로 사용하고 싶을 때가 많다. 이럴 때 단축키를 어느정도 숙지하면 생산성을 높이면서도 작업 시간을 줄일 수 있다.이에, 이번 글</p>
                        </div></div>  
                    </li>
                    </div>
                </ul>
                </div>
                {/* </HydrationBoundary> */}
            </div>
        </div>
    )
}