import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Hook
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

// Component
import hamburger from "../../images/hamburger.png";
import close from "../../images/close.png";

// Style
import styles from "./Navbar.module.css";

function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [ toggled, setToggled ] = useState(false);
    const [ popupCopy, setPopupCopy ] = useState(false);


    const toggleTrueFalse = () => setToggled(!toggled);

    let path = window.location.href.split("admin")[0];

    if(window.location.href.includes("member")){
        path = window.location.href.split("member")[0];
    }

    const copy = () => {
        navigator.clipboard.writeText(path + user);
        setPopupCopy(true);
        
        setTimeout(()=>{
            setPopupCopy(false);
        }, 1500)
    }

    return(
    
        <nav>
            {
                popupCopy && (
                    <div className={styles.popupCopy}>
                        <p>已複製</p>
                    </div>
                )
            }


            <div className={styles.title}>
                <Link to="/" >
                    Dokodemo Door
                </Link>
            </div>

            { !user && (
                <div className={styles.loginComputer}>
                    <div className={styles.login}>
                        <Link to="/login">
                            登入
                        </Link>
                    </div>
                    <div className={styles.signup}>
                        <Link to="/signup">
                            註冊
                        </Link>
                    </div>
                </div>
            )}

            { user && (
                <div className={styles.loginComputer}>
                    <div className={styles.member}>
                        <NavLink to="/admin">主頁</NavLink>
                    </div>
                    <div className={styles.member}>
                        <NavLink to={"/member"}>會員中心</NavLink> 
                    </div>
                    <div className={styles.openDoor}>

                        <a>任意門▾</a>

                        <div className={styles.copy} >
                            <a className={styles.goToDoor} href={path + user} target="_blank">⇀  前往任意門</a>
                            <button className={styles.copyButton} onClick={copy}>⇀  Copy網址</button>
                        </div>

                    </div>
                    <div className={styles.logout} onClick={logout}>登出</div>
                </div>
            )}



            <div className={styles.loginMobile} onClick={toggleTrueFalse} >
                { !toggled ?
                    <img className={styles.hamburger} src={ hamburger }  alt="side_menu" /> :
                    <img className={styles.close} src={ close }  alt="close" />
                }           
            </div>
            { !toggled ? 
                null : 
                (<div className={styles.link}>
                    { !user && (
                        <>
                        <div className={styles.loginSide} onClick={() => setToggled(false)}>
                            <Link to="/login">
                                登入
                            </Link>
                        </div>
                        <div className={styles.signupSide} onClick={() => setToggled(false)}>
                            <Link to="/signup">
                                註冊
                            </Link>
                        </div>
                        </>
                    )}
                    { user &&
                        <>
                            <div className={styles.memberSide} onClick={() => setToggled(false)}>
                                <Link to={"/admin"}>主頁</Link>
                            </div>
                            <div className={styles.memberSide} onClick={() => setToggled(false)}>
                                <Link to={"/member"}>會員中心</Link>
                            </div>
                            <div className={styles.doorSide}  onClick={(e) => openDoorNav(e)}>
                                
                                {
                                    !open && (
                                        <div className={styles.doorOpen}>
                                            <div>任意門</div>
                                            <div className={styles.plus}>+</div>
                                        </div>
                                    )
                                }

                                {
                                    open &&(
                                        <>
                                            <a>任意門</a>
                                            <img className={styles.closeDoor} src={close}  alt="close" />
                                            <div className={styles.doorMobile} >
                                                <a className={styles.goToDoorMobile} href={path + user} target="_blank"  onClick={() => setToggled(false)}>⇀  前往任意門</a>
                                                <button className={styles.copyButtonMobile} onPointerUp={copy}>⇀  Copy網址</button>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className={styles.logoutSide}  onClick={logout}>登出</div>
                        </>
                    }
                </div>)
            }
        </nav>
        
    )
}

export default Navbar