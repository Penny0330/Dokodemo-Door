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
    const toggleTrueFalse = () => setToggled(!toggled);
    let path = window.location.href.split("admin")[0]

    if(window.location.href.includes("member")){
        path = window.location.href.split("member")[0]
    }


    return(
    
        <nav>
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
                    <div className={styles.member}>
                        <a href={path + user} target="_blank">任意門</a>
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
                            <div className={styles.memberSide} onClick={() => setToggled(false)}>
                                <a href={path + user} target="_blank">任意門</a>
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