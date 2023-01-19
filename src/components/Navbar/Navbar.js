import { Link } from "react-router-dom";

import hamburger from "../../images/hamburger.png";


// Style
import styles from "./Navbar.module.css";

function Navbar() {
    return(
    
        <nav>
            <div className={styles.title}>
                <Link to="/" >
                    Dokodemo Door
                </Link>
            </div>
            <div className={styles.loginComputer}>
                <div className={styles.login}>
                    <Link to="/Login">
                        登入
                    </Link>
                </div>
                <div className={styles.signup}>
                    <Link to="/Signup">
                        註冊
                    </Link>
                </div>
            </div>

            <div className={styles.loginMobile}>
                <img className={styles.hamburger} src={ hamburger }  alt="side_menu" />
            </div>
        </nav>
        
    )
}

export default Navbar