import { Link } from "react-router-dom";
import {useState} from "react";

// Hook
import { useSignup } from "../../hooks/useSignup";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Style
import styles from "./Signup.module.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, pending } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password);
    }

    return(
        <div className="wrapper">
            <Navbar />

            <main className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <div className={styles.title}>加入我們 !</div>
                    <div className={styles.signup}>
                        <label>
                            <p>帳號</p>
                            <input 
                                type="email" 
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required  />
                        </label>
                        <label>
                            <p>密碼：至少 6 個字元</p>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </label>
                    </div>
                    <button className={styles.signupButton}>註冊</button>
                    <div className={styles.error}> {error} </div>
                    <div className={styles.toLogin}>
                        <Link to="/login">
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