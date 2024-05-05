"use client"
import { useContext,useState, useEffect, useRef} from "react"
import styles from "./treesearch.module.css"
import Debounce from "./searchDebounce/debounce"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import api from "../config/apiConfig"
import { useDispatch } from "react-redux"
import { setPostId } from "@/app/slices/postSlice"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/app/_component/Provider/authProvider"
import { setPostValue } from "../slices/postValue"
type Value={
    postId:number
    title:string
    tags:string
    nickname:string
}
type SearchProps = {
  setIsSearchbar: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function TreeSearch({ setIsSearchbar }: SearchProps){
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
    const returnPost = (value:any)=>{
      dispatch(setPostValue(value))
    }
 
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
  

    return(
        <div className={styles.modalBackground}>
            <div ref={searchRef} className={styles.searchContainer}>
                <div className={styles.searchBar}>
                    <select className={styles.select} id="searchTypeSelect">
                        <option value="default">제목+테그</option>
                        <option value="paragraph">제목</option>
                        <option value="tag">태그</option>
                    </select>
                    <input type="text" value={search} onChange={handleInputChange} placeholder="검색어를 입력해주세요"></input>
                </div> 
                {isSuccess && (
          <div className={styles.autoCompleteList}>
            {dataValue.map((value,item) => (
              <div
                key={item}
                className={styles.autoCompleteItem}
                onClick={()=>returnPost(value)}
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