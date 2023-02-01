// Style
import styles from "./Show.module.css";

function Show(value) {

    return(
   
        <div className={styles.box}>
            <div className={styles.userInfo}>
                <div className={styles.pic}>T</div>
                <div className={styles.username}>@Test</div>
            </div>


            <div className={styles.textBox}>
                {
                    value.value.map((box, index) => {
                        return( 
 
                            <>
                                {
                                    box.type === "text" && (
                                        box.title !== "" ? <div className={styles.text}>{box.title}</div> : null
                                    )
                                }
                                {
                                    box.type === "link" && (
                                        box.title !== "" && box.url !== ""  ? <div className={styles.link}><a href={box.url} target="_blank">{box.title}</a></div> : null
                                    )
                                }
                            </>  
                        )
                        
                    })
                }
            </div>


            <div className={styles.footer}>Dokodemo Door</div>
        
        </div>
        
    )
}

export default Show