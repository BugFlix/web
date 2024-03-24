import styles from "./trend.module.css"
export default function Trend(){
    return(
        <div className={styles.background}>
            <div className={styles.knowledgeLayout}>
                <div className={styles.headerMenu}></div>
                <div className={styles.boardLayout}>
                    <div className={styles.board}>
                        <div className={styles.board1}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className={styles.board}></div>
                    <div className={styles.board}></div>
                    <div className={styles.board}></div>
                    <div className={styles.board}></div>
                    <div className={styles.board}></div>
                </div>
            </div>
        </div>
    )
}