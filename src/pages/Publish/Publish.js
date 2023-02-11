import { Link, useParams } from "react-router-dom";

// component
import loading from "../../images/admin-loading.gif"

// hooks
import { useGetBox } from "../../hooks/useGetBox";

// style
import styles from "./Publish.module.css";

function Publish(){

    const params = useParams();
    const {profile, noPhotoText, value, color, error, pending } = useGetBox(params.user);

    return(
        <div className={styles.wrapper}>
                        
                {
                    pending && (
                        <div className={styles.loadingDiv}>
                            <img src={loading} alt="" className={styles.loading} />
                        </div>
                        
                    )
                }

                {
                    error && !pending &&(
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
                                <Link to="/"  style={{color: color.logeColor}} >
                                    Dokodemo Door
                                </Link>
                            </div>
                        </div>
                    )
                }

                {
                    !error && !pending &&(
                        <div className={styles.main}>
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
 
                                <div className={styles.userName}>{`@${profile.account}`}</div>
                                <div className={styles.introduction}>{profile.introduction}</div>
                            </div>
                            <div className={styles.allList}> 
                                {value.map((box, index) => {
                                    return(
                                        <div key={index}>
                                            {
                                                box.type === "text" && (
                                                    box.title !== "" && box.display ? <div className={`${styles.list} ${styles.text}`}style={{color: color.titleColor}} >{box.title}</div> : null  
                                                )
                                            }

                                            {
                                                box.type === "link" && (
                                                    box.title !== "" && box.url !== "" && box.display ? 
                                                    <div  className={`${styles.list} ${styles.link}`} style={{backgroundColor: color.linkColor}}>
                                                        <a href={box.url} target="_blank" style={{color: color.linkTextColor}} >
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
                                })}
                            </div>

                            <div className={styles.logo}>
                                <Link to="/"  style={{color: color.logeColor}} >
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