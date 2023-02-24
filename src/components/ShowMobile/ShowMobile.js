import { Link } from "react-router-dom";

// components
import close_phone from "../../images/close_phone.png";

// hooks
import { useChangeColor } from "../../hooks/useChangeColor";

// Style
import styles from "./ShowMobile.module.css";

function ShowMobile({profile, noPhotoText, value, color, openShow, handleOpenShow, iconLink}) {

    const { changeColorPri, changeColorGreen, changeColorBlue, changeColorBlack, active } = useChangeColor(color);

    const allIcons = [
        <svg stroke="gray" fill={color.logeColor} strokeWidth="0" viewBox="0 0 512 512" focusable="false" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"></path></svg>,

        <svg stroke="gray" fill={color.logeColor} strokeWidth="0" viewBox="0 0 16 16" focusable="false" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path></svg>,

        <svg stroke="gray" fill={color.logeColor} strokeWidth="0" viewBox="0 0 16 16" focusable="false" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path></svg>,

        <svg stroke="gray" fill={color.logeColor} strokeWidth="0" viewBox="0 0 16 16" focusable="false" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"></path></svg>,

        <svg stroke="gray" fill={color.logeColor} strokeWidth="0" viewBox="0 0 16 16" focusable="false" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"></path></svg>,

        <svg stroke="gray" fill={color.logeColor} strokeWidth="0" viewBox="0 0 16 16" focusable="false" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path></svg>,

        <svg stroke="gray" fill={color.logeColor} strokeWidth="0" viewBox="0 0 16 16" focusable="false" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0zM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157zm.791-2.924h.562c.086 0 .155.07.155.156v3.486c0 .086-.07.155-.155.155h-.562a.156.156 0 0 1-.156-.155V4.918c0-.086.07-.156.156-.156zm3.863 0h.56c.087 0 .157.07.157.156v3.486c0 .086-.07.155-.156.155h-.561a.155.155 0 0 1-.04-.005h-.002a.168.168 0 0 1-.011-.004l-.005-.002-.007-.003a.066.066 0 0 1-.008-.004L9.6 8.54l-.01-.006-.001-.001a.154.154 0 0 1-.04-.039l-1.6-2.16v2.07a.155.155 0 0 1-.155.156h-.561a.156.156 0 0 1-.156-.155V4.918c0-.086.07-.156.156-.156H7.8l.005.001h.006l.003.001h.006l.01.003h.002l.002.001.01.003.005.002a.09.09 0 0 1 .009.004l.003.001.002.001a.113.113 0 0 1 .013.008l.003.002.005.003v.001c.002 0 .003.002.004.003a.092.092 0 0 1 .008.006l.003.003a.17.17 0 0 1 .023.026L9.52 6.99V4.918c0-.086.07-.156.156-.156zm3.815.717c0 .086-.07.156-.155.156H11.81v.59h1.525c.086 0 .155.07.155.155v.561c0 .086-.07.156-.155.156H11.81v.59h1.525c.086 0 .155.07.155.155v.561c0 .086-.07.156-.155.156h-2.242a.155.155 0 0 1-.11-.045l-.002-.003a.155.155 0 0 1-.044-.107V4.918c0-.042.017-.08.043-.107l.003-.003.001-.001a.155.155 0 0 1 .109-.045h2.242c.086 0 .155.07.155.156v.561z"></path></svg>,

        <svg stroke="gray" fill={color.logeColor} strokeWidth="0" viewBox="0 0 1024 1024" focusable="false" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>,

        <svg stroke="gray" fill={color.logeColor} strokeWidth="0" role="img" viewBox="0 0 24 24" focusable="false" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
    ]

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
                            <div className={styles.iconLinks}>
                                {
                                    iconLink.map((icon, index)=>{
                                        return(
                                            <div key={index}>
                                                {
                                                    icon.iconIndex === 0 && icon.link && (
                                                        <a href={`mailto:${icon.link}`} className={styles.iconLink}>{allIcons[icon.iconIndex]}</a>
                                                    )
                                                }
                                                {
                                                    icon.iconIndex !== 0 && icon.link && (
                                                        <a href={icon.link} target={"_blank"} className={styles.iconLink}>{allIcons[icon.iconIndex]}</a>
                                                    ) 
                                                }

                                            </div>
                                            
                                        )
                                    })
                                }
                            </div>
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