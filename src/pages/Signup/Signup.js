import { Link } from "react-router-dom";
import { useState } from "react";

// Hook
import { useSignup } from "../../hooks/useSignup";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import loading from "../../images/loading.gif";

// Style
import styles from "./Signup.module.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [account, setAccount] = useState("");
    const { signup, error, pending } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(account, email, password);
    }

    return(
        <div className="wrapper">
            <Navbar />

            <main className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <div className={styles.title}>加入我們 !</div>
                    <div className={styles.signup}>
                        <label>
                            <p>帳號：至少 4 個字元</p>
                            <input 
                                type="text" 
                                placeholder="Account"
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                required  />
                        </label>
                        <label>
                            <p>信箱</p>
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
                    {
                        !pending ? 
                        <button className={styles.signupButton}>
                            <p>註冊</p>
                        </button> :
                        <button className={styles.signupButton}><img className={styles.loading} src={loading} alt="" /></button>
                    }

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