import { Link } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Style
import "./Signup.scss";

function Signup() {
    return(
        <div className="wrapper">
            <Navbar />

            <main className="signup_main">
                <form className="signup_form">
                    <div className="signup_title">加入我們 !</div>
                    <div className="signup_box">
                        <label>
                            <p>帳號</p>
                            <input type="text" placeholder="Email" />
                        </label>
                        <label>
                            <p>密碼</p>
                            <input type="password" placeholder="Password" />
                        </label>
                    </div>
                    <button className="signup_button">註冊</button>
                    <div className="new_account">
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