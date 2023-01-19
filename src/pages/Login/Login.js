import { Link } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Style
import styles from "./Login.module.css";

function Login() {
    return(
        <div className="wrapper">
            <Navbar />

            <main className={styles.main}>
                <form className={styles.form}>
                    <div className={styles.title}>登入</div>
                    <div className={styles.login}>
                        <label>
                            <p>帳號</p>
                            <input type="text" placeholder="Email" />
                        </label>
                        <label>
                            <p>密碼</p>
                            <input type="password" placeholder="Password" />
                        </label>
                    </div>
                    <button className={styles.loginButton}>登入</button>
                    <div className={styles.toSignup}>
                        <Link to="/Signup">
                            還沒有帳號? 立即註冊!
                        </Link>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    )
}

export default Login;