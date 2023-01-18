import { Link } from "react-router-dom";


// Style
import "./Navbar.scss"

function Navbar() {
    return(
        <nav>
            <div className="nav_title">
                <Link to="/" >
                    Dokodemo Door
                </Link>
            </div>
            <div className="nav_login_signup">
                <div className="login">
                    <Link to="/Login">
                        登入
                    </Link>
                </div>
                <div className="signup">
                    <Link to="/Signup">
                        註冊
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar