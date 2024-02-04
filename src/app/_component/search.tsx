import styles from "./search.module.css"
export default function Search(){
    return(
        <div className={styles.modalBackground}>
            <div className={styles.searchContainer}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="검색어를 입력해주세요"></input>
                    <button className={styles.iconSearch}></button>
                </div>  
            </div>
        </div>
    )
}