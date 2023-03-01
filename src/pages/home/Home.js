import { Link } from 'react-router-dom';

//Component
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import demo from '../../images/demo.png';

// Style
// import "./Home.scss";
import styles from './Home.module.css';

function Home() {
    return (
        <div className="wrapper">
            <Navbar />
            <main className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.slogan}>
                        <div>創造專屬任意門</div>
                        <div>簡單、快速、分享</div>
                        <div>一鍵前往您的所有網站</div>
                    </div>
                    <div className={styles.button}>
                        <Link to="/signup">立即加入</Link>
                    </div>
                </div>
                <div>
                    <div className={styles.iphone}>
                        <img src={demo} alt="demo" className={styles.demo} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
