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
                                    box.value !== "" ? <div className={styles.text}>{box.value}</div> : null
                                    
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