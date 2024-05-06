import MyPost from "@/app/_component/mypostview"
import Home from "@/app/_component/home";
import styles from "@/app/_component/dashboard.module.css"
export default function PostView(){
  
  return(
    <div className={styles.container}>
       <Home/>
       <MyPost/>
    </div>
   
  )
}