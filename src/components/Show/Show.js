import { useState, useEffect } from "react";

// Style
import styles from "./Show.module.css";

import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../utils/firebase.config";


function Show({value}) {
    const [titleColor, setTitleColor] = useState("");
    const [linkTextColor, setTextColor] = useState("");
    const [linkColor, setLinkColor] = useState("");
    const [logeColor, setLogeColor] = useState("");

    useEffect(() => {
        const ref = doc(db, "itemList", auth.currentUser.uid)
        const unsub = onSnapshot((ref), (doc) => {

            if(doc.data() === undefined){
                setTitleColor("");
            }else{
                setTitleColor(doc.data().showColor.titleColor)
                setTextColor(doc.data().showColor.linkTextColor)
                setLinkColor(doc.data().showColor.linkColor)
                setLogeColor(doc.data().showColor.logeColor)
            }
            
        })

        return () =>{
            unsub()
        } 
    }, [])

    const changeColorPri = async(e) => {
        const showColor = {
            titleColor: "#333333",
            linkTextColor: "#333333",
            linkColor: "rgba(255, 255, 255, 0.645)",
            logeColor: "#333333",
        }

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"showColor": showColor})
    }

    const changeColorGreen = async(e) => {
        const showColor = {
            titleColor: "#333333",
            linkTextColor: "white",
            linkColor: "#395347",
            logeColor: "#395347",
        }

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"showColor": showColor})
    }

    const changeColorBlue = async(e) => {
        const showColor = {
            titleColor: "#333333",
            linkTextColor: "#ECE9DF",
            linkColor: "rgb(28 56 111)",
            logeColor: "rgb(28 56 111)",

        }

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"showColor": showColor})
    }

    const changeColorBlack = async(e) => {
        const showColor = {

            titleColor: "#333333",
            linkTextColor: "#ECE9DF",
            linkColor: "#333333",
            logeColor: "#333333",
        }

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"showColor": showColor})
    }


    return(

        <div className={styles.showing}>

            <div className={styles.box}>
                <div className={styles.userInfo}>
                    <div className={styles.pic}>T</div>
                    <div className={styles.username} style={{color: titleColor}}>@Test</div>
                </div>


                <div className={styles.textBox}>
                    {
                        value.map((box, index) => {
                            return( 
    
                                <div key={index}>
                                    {
                                        box.type === "text" && (
                                            box.title !== "" && box.display ? <div className={styles.text} style={{color: titleColor}} >{box.title}</div> : null
                                        )
                                    }
                                    {
                                        box.type === "link" && (
                                            box.title !== "" && box.url !== "" && box.display ? <div className={styles.link} style={{backgroundColor: linkColor}}><a href={box.url} target="_blank" style={{color: linkTextColor}}>{box.title}</a></div> : null
                                        )
                                    }
                                </div>  
                            )
                            
                        })
                    }
                </div>


                <div className={styles.footer} style={{color: logeColor}}>Dokodemo Door</div>
            
            </div>

            <div className={styles.color}>
                <div className={styles.colorPri} onClick={(e) => changeColorPri(e)}></div>
                <div className={styles.colorGreen} onClick={(e) => changeColorGreen(e)}></div>
                <div className={styles.colorBlue} onClick={(e) => changeColorBlue(e)}></div>
                <div className={styles.colorBlack} onClick={(e) => changeColorBlack(e)}></div>
            </div>
            
        </div>
        
    )
}

export default Show