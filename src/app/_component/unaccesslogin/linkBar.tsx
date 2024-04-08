
import styles from "@/app/_component/dashboard.module.css"
export default function LinkBar(){
    return(
        <div className={styles.leftFixedSection}>
        <a href="/dashboard/home">홈</a>
        <a href="/dashboard/namu">지식 나무</a>
     </div>
    )
}