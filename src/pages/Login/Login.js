import { Link } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Style
import "./Login.scss";

function Login() {
    return(
        <div className="wrapper">
            <Navbar />

            <main className="login_main">
                <form className="login_form">
                    <div className="login_title">登入</div>
                    <div className="login_box">
                        <label>
                            <p>帳號</p>
                            <input type="text" placeholder="Email" />
                        </label>
                        <label>
                            <p>密碼</p>
                            <input type="password" placeholder="Password" />
                        </label>
                    </div>
                    <button className="login_button">登入</button>
                    <div className="new_account">
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