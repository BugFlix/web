"use client"
import { useState, useEffect} from "react"
import styles from "./search.module.css"
import Debounce from "./searchDebounce/debounce"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
type Value={
    keyword:string
}
export default function Search(){
    const [search, setSearch]=useState("")
    const handleInputChange=(e:any)=>{
        setSearch(e.target.value)
    }
    const autoCompleteSearch=Debounce(search,500);
 
    const onHandleAutoComplete=async ()=>{
        try{
           
            const response = await axios.get(`http://localhost:3004/autoComplete?keyword=${autoCompleteSearch}`);
            const autoCompleteResults = response.data

            console.log("AutoComplete Results:", autoCompleteResults);
            return autoCompleteResults;
        }
        catch(error){

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

    return(
        <div className={styles.modalBackground}>
            <div className={styles.searchContainer}>
                <div className={styles.searchBar}>
                    <select>
                        <option value="default">제목+테그</option>
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
              >
                {value.keyword}
              </div>
            ))} 
              </div>
        )}
            </div>
        </div>
    )
}