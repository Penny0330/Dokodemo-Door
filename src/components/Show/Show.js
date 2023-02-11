// Style
import styles from "./Show.module.css";

// components
import loading from "../../images/admin-loading.gif";

// hooks
import { useChangeColor } from "../../hooks/useChangeColor";

function Show({profile, noPhotoText, value, color, pending}) {

    const { changeColorPri, changeColorGreen, changeColorBlue, changeColorBlack, active } = useChangeColor(color);

    return(

        <div className={styles.showing}>

            {
                !pending && (
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
    
                    <div className={styles.footer} style={{color: color.logeColor}}>Dokodemo Door</div>
                
                </div>
                )
            }

            {
                pending && (
                    <img src={loading} alt="loading" className={styles.loading} />
                )
            }

            <div className={styles.color}>
                <div className={`${styles.colorPri} ${active === "pri" ? styles.active : ""}`} onClick={changeColorPri}></div>
                <div className={`${styles.colorGreen} ${active === "green" ? styles.active : ""}`} onClick={changeColorGreen}></div>
                <div className={`${styles.colorBlue} ${active === "blue" ? styles.active : ""}`} onClick={changeColorBlue}></div>
                <div className={`${styles.colorBlack} ${active === "black" ? styles.active : ""}`} onClick={changeColorBlack}></div>
            </div>
            
        </div>
        
    )
}

export default Show