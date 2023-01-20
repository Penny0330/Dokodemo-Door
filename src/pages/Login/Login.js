import { Link } from "react-router-dom";
import {useState} from "react";

// Hook
import { useLogin} from "../../hooks/useLogin";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Style
import styles from "./Login.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, pending } = useLogin();
  
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

    return(
        <div className="wrapper">
            <Navbar />

            <main className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <div className={styles.title}>登入</div>
                    <div className={styles.login}>
                        <label>
                            <p>帳號</p>
                            <input 
                                type="text" 
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </label>
                        <label>
                            <p>密碼</p>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </label>
                    </div>
                    <button className={styles.loginButton}>登入</button>
                    <div className={styles.error}> {error} </div>
                    <div className={styles.toSignup}>
                        <Link to="/signup">
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