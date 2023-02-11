import { useState } from "react";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Box from "../../components/Box/Box";
import Show from "../../components/Show/Show";
import ShowMobile from "../../components/ShowMobile/ShowMobile";
import smartphone from "../../images/smartphone.png";
import loading from "../../images/admin-loading.gif";
import leaf from "../../images/leaf.png"

// Style
import styles from "./Admin.module.css";

// hooks
import { useGetBox } from "../../hooks/useGetBox";
import { useAuthContext } from "../../hooks/useAuthContext";

// redux
// import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { handleAddTextBox, handleAddLinkBox, handleAddImgBox, handleAddLineBox } from "../../actions/AddBox";


function Admin() {
    const { user } = useAuthContext();
    const {profile, noPhotoText, value, setValue, color, pending } = useGetBox(user);       
    const [openShow, setOpenShow] = useState(false);

    // redux
    const dispatch = useDispatch();

    // max-width: 700 : click showing
    const handleOpenShow = () => {
        setOpenShow(!openShow);
    }

    return (
        <div className="wrapper">

            <Navbar />

            <main className={styles.main}>

                <div className={styles.container}>

                    <div className={styles.left}>
                        <img src={leaf} alt="leaf" />
                        <div className={styles.addButton}>
                            <button className={styles.openAllButton} onClick={() => setOpenSelect(true)}>+ 新增區塊</button>

                            <div className={styles.allButton}>
                                <button className={styles.addTextButton} onClick={()=>dispatch(handleAddTextBox(value))}>標題文字</button>
                                <button className={styles.addTextButton} onClick={()=>dispatch(handleAddLinkBox(value))}>連結按鈕</button>
                                <button className={styles.addTextButton} onClick={()=>dispatch(handleAddImgBox(value))}>圖片看板</button>
                                <button className={styles.addTextButton} onClick={()=>dispatch(handleAddLineBox(value))} >分隔線</button>
                            </div>
                        </div>

                            {
                                pending && (
                                    <img src={loading} alt="loading" className={styles.loading} />
                                )
                            }
                            {
                                !pending && (
                                    <Box value={value} setValue={setValue} color={color}/>
                                )
                            }
                            
                    </div>

                    <div className={styles.right}>

                        <Show value={value} color={color} profile={profile} noPhotoText={noPhotoText} pending={pending}/>

                    </div>

                    {
                        openShow ?
                            <ShowMobile profile={profile} noPhotoText={noPhotoText} value={value} openShow={openShow} handleOpenShow={handleOpenShow} color={color} /> :
                            <div className={styles.preview} onClick={handleOpenShow}>
                                <img className={styles.smartphone} src={smartphone} alt="smartphone" />
                            </div>
                    }

                </div>
            </main>

            <Footer />

        </div>
    )
}

export default Admin;