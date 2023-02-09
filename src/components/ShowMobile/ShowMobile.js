import { Link } from "react-router-dom";

// Style
import styles from "./ShowMobile.module.css";
import close_phone from "../../images/close_phone.png";

import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../utils/firebase.config";

function ShowMobile({profile, noPhotoText, value, color,  openShow, handleOpenShow }) {


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

        <div className={styles.open}>
            <div className={styles.openMobileRight} style={{display: openShow ? "block" : "none"}}>
                <div className={styles.openShowing}>
                    <div className={styles.color}>
                    <div className={styles.colorPri} onClick={(e) => changeColorPri(e)}></div>
                    <div className={styles.colorGreen} onClick={(e) => changeColorGreen(e)}></div>
                    <div className={styles.colorBlue} onClick={(e) => changeColorBlue(e)}></div>
                    <div className={styles.colorBlack} onClick={(e) => changeColorBlack(e)}></div>
                    </div>

                    <div className={styles.box}>
                        <div className={styles.userInfo}>
                            {
                                !profile.photo && (
                                    <div className={styles.noPic}>{noPhotoText}</div>
                                )
                            }
                            {
                                profile.photo &&(
                                    <img src={profile.photo} alt="profile-photo" className={styles.pic} />
                                )
                            }
                            <div className={styles.username} style={{color: color.titleColor}}>{`@${profile.account}`}</div>
                            <div className={styles.introduction}>{profile.introduction}</div>
                        </div>


                        <div className={styles.textBox}>
                            {
                                value.map((box, index) => {
                                    return( 
            
                                        <div key={index}>
                                            {
                                                box.type === "text" && (
                                                    box.title !== "" && box.display && (
                                                        <div className={styles.text} style={{color: color.titleColor}} >{box.title}</div>
                                                    )
                                                )
                                            }
                                            {
                                                box.type === "link" && (
                                                    box.title !== "" && box.url !== "" && box.display && (
                                                        <div className={styles.link} style={{backgroundColor: color.linkColor}}><a href={box.url} target="_blank" style={{color: color.linkTextColor}}>{box.title}</a></div>
                                                    )
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
                                    
                                })
                            }
                        </div>

                        <div className={styles.footer}>
                            <Link to="/"  style={{color: color.logeColor}} >
                                Dokodemo Door
                            </Link>
                        </div>
                        
                    </div>

                    <img className={styles.close_phone} src={close_phone} alt="close_phone"  
                        onClick={handleOpenShow} />
                    
                </div>
            </div>
        </div>
    )
}

export default ShowMobile