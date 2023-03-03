import { Link } from 'react-router-dom';

//Component
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import demo from '../../images/demo.jpg';
import demo_bear from '../../images/demo-bear.jpg';
import demo_dorami from '../../images/demo-dorami.jpg';
import demo_admin from '../../images/demo-admin.png';
import demo_link from '../../images/demo-link.png';
import demo_image from '../../images/demo-image.png';
import demo_iconLink from '../../images/demo-iconLink.png';
import demo_profile from '../../images/demo-profile.png';

// Style
import styles from './Home.module.css';

//slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <div className="wrapper">
            <Navbar />
            <main className={styles.main}>
                <div className={styles.first}>
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
                    <div className={styles.right}>
                        <img src={demo_admin} alt="demo_admin" className={styles.demoAdmin} />
                    </div>
                </div>

                <div className={styles.second}>
                    <div className={styles.secondContainer}>
                        <div className={styles.secondLeft}>
                            <img src={demo_link} alt="link" className={styles.demoLink} />
                            <img src={demo_image} alt="image" className={styles.demoImage} />
                            <img
                                src={demo_iconLink}
                                alt="iconLink"
                                className={styles.demoIconLink}
                            />
                        </div>
                        <div className={styles.secondRight}>
                            <div className={styles.secondTitle}>提供多樣區塊選擇</div>
                            <div className={styles.secondText}>
                                連結按鈕、圖片、社交圖標、分隔線 ...
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.third}>
                    <div className={styles.thirdContainer}>
                        <div className={styles.thirdLeft}>
                            <div className={styles.secondTitle}>編輯個人檔案&即時預覽</div>
                            <div className={styles.secondText}>
                                上傳頭貼、更改帳號、主題顏色挑選
                            </div>
                        </div>
                        <div className={styles.thirdRight}>
                            <img
                                src={demo_profile}
                                alt="demo_profile"
                                className={styles.demo_profile}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.fourth}>
                    <div className={styles.fourthContainer}>
                        <div className={styles.fourthLeft}>
                            <div className={styles.fourthTitle}>精選用戶</div>
                            <div className={styles.button}>
                                <Link to="/signup">立即加入</Link>
                            </div>
                        </div>
                        <div className={styles.fourthRight}>
                            <Slider {...settings}>
                                <div>
                                    <a
                                        href="https://dokodemo-door.web.app/mqPfzYw2oUNRUxz6FYoLT2WLb662"
                                        target="_blank"
                                        rel="noreferrer">
                                        <img src={demo} alt="demo" className={styles.demo} />
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="https://dokodemo-door.web.app/Bczf9mYFJANr5um3PfkAx1AtzIT2"
                                        target="_blank"
                                        rel="noreferrer">
                                        <img src={demo_bear} alt="demo" className={styles.demo} />
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="https://dokodemo-door.web.app/ERTyPMWRbtZccInsHDoNA1FJD5F3"
                                        target="_blank"
                                        rel="noreferrer">
                                        <img src={demo_dorami} alt="demo" className={styles.demo} />
                                    </a>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
