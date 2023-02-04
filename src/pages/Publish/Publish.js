import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Publish.module.css";

import { db } from "../../utils/firebase.config";
import { onSnapshot,  doc} from "firebase/firestore";

function Publish(){
    const [value, setValue] = useState([]);
    const [showColor, setShowColor] = useState("");

    const uid = window.location.href.split("/")[3];

    useEffect(() => {

        const ref = doc(db, "itemList", uid)
        const unsub = onSnapshot((ref), (doc) => {

            if(doc.data() === undefined){
                setValue([]);
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

    console.log(showColor)

    return(
        <div className={styles.wrapper}>

            <div className={styles.main}>
                <div className={styles.userInfo}>
                    <div className={styles.pic}>T</div>
                    <div className={styles.userName}>@Test</div>
                </div>
                <div className={styles.allList}>
                {
                    value.map((box, index) => {
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
                            
                            </div>
                        ) 
                    })
                    
                }
                </div>


                <div className={styles.logo}>
                    <Link to="/"  style={{color: showColor.logeColor}} >
                        Dokodemo Door
                    </Link>
                </div>
            </div>



        </div>
    )
}

export default Publish