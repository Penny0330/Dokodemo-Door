import { Link } from "react-router-dom";

// components
import close_phone from "../../images/close_phone.png";

// hooks
import { useChangeColor } from "../../hooks/useChangeColor";

// Style
import styles from "./ShowMobile.module.css";

function ShowMobile({profile, noPhotoText, value, color, openShow, handleOpenShow }) {

    const { changeColorPri, changeColorGreen, changeColorBlue, changeColorBlack, active } = useChangeColor(color);

    return(

        <div className={styles.open}>
            <div className={styles.openMobileRight} style={{display: openShow ? "block" : "none"}}>
                <div className={styles.openShowing}>
                    <div className={styles.color}>
                        <div className={`${styles.colorPri} ${active === "pri" ? styles.active : ""}`} onClick={changeColorPri}></div>
                        <div className={`${styles.colorGreen} ${active === "green" ? styles.active : ""}`} onClick={changeColorGreen}></div>
                        <div className={`${styles.colorBlue} ${active === "blue" ? styles.active : ""}`} onClick={changeColorBlue}></div>
                        <div className={`${styles.colorBlack} ${active === "black" ? styles.active : ""}`} onClick={changeColorBlack}></div>
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
                                            {
                                                box.type === "line" && (
                                                    box.display && (
                                                        <div className={styles.lineBoxInner}>
                                                            <div className={styles.line} style={{color: color.logeColor}}></div>
                                                        </div>
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