"use client"
import { useContext,useState, useEffect, useRef} from "react"
import styles from "./search.module.css"
import Debounce from "./searchDebounce/debounce"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import api from "../config/apiConfig"
import { useDispatch } from "react-redux"
import { setPostId } from "@/app/slices/postSlice"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/app/_component/Provider/authProvider"
type Value={
    postId:number
    title:string
    tags:string
    nickname:string
}
type SearchProps = {
  setIsSearchbar: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Search({ setIsSearchbar }: SearchProps){
    const [search, setSearch]=useState("")
    const {isLogin,nickname}=useContext(AuthContext)
    const router=useRouter()
    const dispatch = useDispatch()
    const searchRef = useRef<HTMLDivElement>(null);
    const accessToken=localStorage.getItem("accestoken")
    const handleInputChange=(e:any)=>{
        setSearch(e.target.value)
    }
    const autoCompleteSearch=Debounce(search,500);
 
    const onHandleAutoComplete=async ()=>{
        const searchTypeSelect = document.getElementById('searchTypeSelect') as HTMLSelectElement | null;
        if(searchTypeSelect){
            const selectedType = searchTypeSelect.value;
            let type;
            if (selectedType === "default") {
              type = "TAG_AND_CONTENT";
            } else if (selectedType === "paragraph") {
              type = "CONTENT";
            } else if (selectedType === "tag") {
              type = "TAG";
            }
            try{
           
                const response = await api.get(`/api/v1/search/posts?query=${autoCompleteSearch}&type=${type}&offset=0&limit=12`,{
                  headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                  }
                });
                const autoCompleteResults = response.data
    
                console.log("AutoComplete Results:", autoCompleteResults);
                return autoCompleteResults;
            }
            catch(error){
    
            }
          //   try{
           
          //     const response = await axios.get(`http://localhost:8000/api/v1/search/posts?query=${autoCompleteSearch}&type=${type}&offset=0&limit=12`);
          //     const autoCompleteResults = response.data
  
          //     console.log("AutoComplete Results:", autoCompleteResults);
          //     return autoCompleteResults;
          // }
          // catch(error){
  
          // }
        }
       
       
    }
    const { data: dataValue, isLoading, isError, isSuccess, refetch } = useQuery<Value[]>({
        queryKey: ["autoComplete"],
        queryFn: onHandleAutoComplete,
        enabled: false,
    })

    useEffect(() => {
        if (autoCompleteSearch) {
            refetch();
        }
    }, [autoCompleteSearch, refetch]);

    const onHandleSearchItemView = (value: any) => {
        const viewHtml: HTMLElement | null = document.getElementById("view");
      
        if (viewHtml) {
          viewHtml.style.display = "block";
          viewHtml.style.transition = "0.3s";
      
          const onMouseMove = (e: MouseEvent) => {
            viewHtml.style.left = `${e.pageX}px`;
            viewHtml.style.top = `${e.pageY}px`;
          };
      
          document.addEventListener("mousemove", onMouseMove);
      
          const contentHtml = `
             <h3>${value.title}</h3>
              <div  class=${styles.bestTags}>
            ${value.tags.map((tag: string)=> `<span>${tag}</span>`).join('')}
              </div>
              <div class=${styles.postBy}> <span>post</span> <b>${value.nickname}</b></div> 
          `;
      
          viewHtml.innerHTML = contentHtml;
        }
      };
      
      const onHandleSearchItemOut = () => {
        const viewHtml: HTMLElement | null = document.getElementById("view");
      
        if (viewHtml) {
          viewHtml.style.display = "none";
          viewHtml.style.transition = "0.3s";
        }
      };
      
      const onHandlePost =(postid:number)=>{
        console.log(postid)
        if(isLogin){
            router.push(`/${nickname}/dashboard/home/post`)
            dispatch(setPostId(postid))
            setIsSearchbar(false)
        }
        else{
            router.push(`/dashboard/home/post`)
            dispatch(setPostId(postid))
            setIsSearchbar(false)
        }
        
    }
    const setExitBtn =()=>{
      setIsSearchbar(false)
    }
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
              setIsSearchbar(false);
          }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
          document.removeEventListener("keydown", handleKeyDown);
      };
  }, [setIsSearchbar]);
    
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchbar(false);
    }
};

useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [setIsSearchbar]);

    return(
        <div className={styles.modalBackground}>
            <div  className={styles.exit}  onClick={setExitBtn}>닫기</div>
            <div ref={searchRef} className={styles.searchContainer}>
                <div className={styles.searchBar}>
                    <select className={styles.select} id="searchTypeSelect">
                        <option value="default">제목+태그</option>
                        <option value="paragraph">제목</option>
                        <option value="tag">태그</option>
                    </select>
                    <input type="text" value={search} onChange={handleInputChange} placeholder="검색어를 입력해주세요"></input>
                    <button className={styles.iconSearch}></button>
                </div> 
                {isSuccess && (
          <div className={styles.autoCompleteList}>
            {dataValue.map((value,item) => (
              <div
                key={item}
                className={styles.autoCompleteItem}
                onMouseOver={()=>onHandleSearchItemView(value)}
                onMouseOut={onHandleSearchItemOut}
                onClick={()=>onHandlePost(value.postId)}
              >
                {value.title}
             
              </div>
            ))}
            <div id="view" className={styles.searchItem}></div>
               
      
        
              </div>
        )}
            </div>
        </div>
    )
}