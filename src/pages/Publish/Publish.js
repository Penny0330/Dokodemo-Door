import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Publish.module.css";

import { db } from "../../utils/firebase.config";
import { collection, query, onSnapshot, where, orderBy} from "firebase/firestore";

function Publish(){
    const [value, setValue] = useState([]);

    const uid = window.location.href.split("/")[3];

    useEffect(() => {
        const ref = collection(db, "url");
        const q = query(ref, where("user", "==", uid), orderBy("time", "desc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let textArr = [];
            querySnapshot.forEach((doc) => {
                textArr.push({ ...doc.data(), id: doc.id});
            });
            setValue(textArr)
        })
        return () => unsub();
    }, [])

    console.log(value)


    return(
        <div className={styles.wrapper}>

            <div className={styles.main}>
                <div className={styles.userInfo}>
                    <div className={styles.pic}>T</div>
                    <div className={styles.userName}>@Test</div>
                </div>
                {
                    value.map((box, index) => {
                        return(
                            <div className={styles.allList} key={index}>
                                {
                                    box.type !== "link" && (
                                        box.value !== "" ? <div className={`${styles.list} ${styles.text}`}>{box.value}</div> : null
                                    )
                                }

                                {
                                    box.type === "link" && (
                                        box.value !== "" ? 
                                        <div  className={`${styles.list} ${styles.link}`}>
                                            <a href={box.url} target="_blank">
                                                {box.value}
                                            </a>
                                        </div> : null
                                    )
                                }
                            </div>
                            
                        ) 
                    })
                }


                <div className={styles.logo}>
                    <Link to="/" >
                        Dokodemo Door
                    </Link>
                </div>
            </div>



        </div>
    )
}

export default Publish