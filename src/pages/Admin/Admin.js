import { useState } from "react";

//Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Text from "../../components/Text/Text";
import Show from "../../components/Show/Show";
import ShowMobile from "../../components/ShowMobile/ShowMobile";
import smartphone from "../../images/smartphone.png";
import loading from "../../images/admin-loading.gif"

// Style
import styles from "./Admin.module.css";

import { useGetBox } from "../../hooks/useGetBox";

// redux
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { handleAddTextBox, handleAddLinkBox, handleAddImgBox } from "../../actions/AddBox";


function Admin() {
    const {profile, noPhotoText, value, setValue, color, pending } = useGetBox();

                          
    const [openShow, setOpenShow] = useState(false);

    // redux
    const counter = useSelector(state=>state.AddBox);
    const dispatch = useDispatch();

    // max-width: 700 : click showing
    const handleOpenShow = () => {
        setOpenShow(!openShow)
    }

    return (
        <div className="wrapper">

            <Navbar />

            <main className={styles.main}>

                <div className={styles.container}>

                    <div className={styles.left}>
                    
                        <div className={styles.addButton}>
                            <button className={styles.addTextButton} onClick={()=>dispatch(handleAddTextBox(value))}>+ 標題文字</button>
                            <button className={styles.addTextButton} onClick={()=>dispatch(handleAddLinkBox(value))}>+ 連結按鈕</button>
                            <button className={styles.addTextButton} onClick={()=>dispatch(handleAddImgBox(value))}>+ 圖片看板</button>
                            <button className={styles.addTextButton}>+ 分隔線</button>
                        </div>

                            {
                                pending && (
                                    <img src={loading} alt="loading" className={styles.loading} />
                                )
                            }
                            {
                                !pending && (
                                    <Text value={value} setValue={setValue}/>
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