import { Link } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Style
import styles from "./Signup.module.css";

function Signup() {
    return(
        <div className="wrapper">
            <Navbar />

            <main className={styles.main}>
                <form className={styles.form}>
                    <div className={styles.title}>加入我們 !</div>
                    <div className={styles.signup}>
                        <label>
                            <p>帳號</p>
                            <input type="text" placeholder="Email" />
                        </label>
                        <label>
                            <p>密碼</p>
                            <input type="password" placeholder="Password" />
                        </label>
                    </div>
                    <button className={styles.signupButton}>註冊</button>
                    <div className={styles.toLogin}>
                        <Link to="/Login">
                            已有帳號? 前往登入!
                        </Link>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    )
}

export default Signup;