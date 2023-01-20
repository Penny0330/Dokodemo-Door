import { Link } from "react-router-dom";

//Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Style
// import "./Home.scss";
import styles from "./Home.module.css";

function Home() {
    return(
        
        <div className="wrapper">
            <Navbar />
            
            <main className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.slogan}>
                        <div>隨時隨地</div>
                        <div>分享屬於自己的</div>
                        <div className="slogan_point">微型網站</div>
                    </div>
                    <div className={styles.button}>
                        <Link to="/signup">
                            立即加入
                        </Link>
                    </div>
                </div>
                <div>
                    <div className={styles.iphone}></div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Home;