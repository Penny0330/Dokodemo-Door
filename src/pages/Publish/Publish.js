import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Publish.module.css";

import { db } from "../../utils/firebase.config";
import { onSnapshot,  doc} from "firebase/firestore";

function Publish(){
    const [value, setValue] = useState([]);
    const [showColor, setShowColor] = useState("");
    const [error, setError] = useState(false)

    const uid = window.location.href.split("/")[3];

    useEffect(() => {

        const ref = doc(db, "itemList", uid)
        const unsub = onSnapshot((ref), (doc) => {
            console.log(doc.data())
            if(doc.data() === undefined){
                setError(true)
                return
            }else{
                let itemArr = [];
                doc.data().item.map((item) => {
                    itemArr.push(item)
                })
                setValue(itemArr)
                setShowColor(doc.data().showColor)

            }
            
        })

        return () => unsub();
    }, [])

    return(
        <div className={styles.wrapper}>

                {
                    error &&(
                        <div className={styles.errorMain}>
                            <div className={styles.error}>
                                <h1>Oops!</h1>
                                <h4>此頁面無法訪問</h4>
                                
                                <ul>
                                    <li>  📗 請檢查您輸入的網址是否正確</li>
                                    <li>  📗 返回 Dokodemo Door 創造專屬任意門</li>
                                </ul>
                                <Link to="/" className={styles.backToHomeLink}>
                                    <button className={styles.backToHomeButton}>回首頁</button>
                                </Link>
                                
                            </div>

                            <div className={styles.logo}>
                                <Link to="/"  style={{color: showColor.logeColor}} >
                                    Dokodemo Door
                                </Link>
                            </div>
                        </div>
                    )
                }

                {
                    !error && (
                        <div className={styles.main}>
                            <div className={styles.userInfo}>
                                <div className={styles.pic}>T</div>
                                <div className={styles.userName}>@Test</div>
                            </div>
                            <div className={styles.allList}> 
                                {value.map((box, index) => {
                                    return(
                                        <div key={index}>
                                            {
                                                box.type === "text" && (
                                                    box.title !== "" && box.display ? <div className={`${styles.list} ${styles.text}`}style={{color: showColor.titleColor}} >{box.title}</div> : null  
                                                )
                                            }

                                            {
                                                box.type === "link" && (
                                                    box.title !== "" && box.url !== "" && box.display ? 
                                                    <div  className={`${styles.list} ${styles.link}`} style={{backgroundColor: showColor.linkColor}}>
                                                        <a href={box.url} target="_blank" style={{color: showColor.linkTextColor}} >
                                                            {box.title}
                                                        </a>
                                                    </div> : null
                                                )
                                            }

                                            {
                                                box.type === "pic" && (
                                                    box.imgUrl !== "" && box.display && (
                                                        <img className={styles.img} src={box.imgUrl} alt="img" />
                                                    ) 
                                                )
                                            }
                                        
                                        </div>
                                    ) 
                                })}
                            </div>

                            <div className={styles.logo}>
                                <Link to="/"  style={{color: showColor.logeColor}} >
                                    Dokodemo Door
                                </Link>
                            </div>
                        </div>
                    )
                }
                  
        </div>
    )
}

export default Publish