
import Loginmodal from "@/app/_component/LoginModal"
import Main from "@/app/_component/Main"
import styles from "@/app/_component/main.module.css"
export default function LoginModal(){
    return(
        <div className={styles.container}>
            <Main/>
            <Loginmodal/>
        </div>
    )
}