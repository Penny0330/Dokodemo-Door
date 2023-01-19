import { Link } from "react-router-dom";

//Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Style
import "./Home.scss";

function Home() {
    return(
        <div className="wrapper">
            <Navbar />

            <main className="home_main">
                <div className="left">
                    <div className="slogan">
                        <div>隨時隨地</div>
                        <div>分享屬於自己的</div>
                        <div className="slogan_point">微型網站</div>
                    </div>
                    <div className="start_button">
                        <Link to="/Login">
                            立即加入
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <div className="iphone"></div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Home;