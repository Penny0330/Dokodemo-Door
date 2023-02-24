import { useState } from "react";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Box from "../../components/Box/Box";
import Show from "../../components/Show/Show";
import ShowMobile from "../../components/ShowMobile/ShowMobile";
import smartphone from "../../images/smartphone.png";
import loading from "../../images/admin-loading.gif";
import leaf from "../../images/leaf.png";

import AddButton from "../../components/AddButton/AddButton";

// Style
import styles from "./Admin.module.css";

// hooks
import { useGetBox } from "../../hooks/useGetBox";
import { useAuthContext } from "../../hooks/useAuthContext";


function Admin() {
    const { user } = useAuthContext();
    const {profile, noPhotoText, value, setValue, color, pending, iconLink } = useGetBox(user);       
    const [openShow, setOpenShow] = useState(false);

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
                        <img src={leaf} alt="leaf" className={styles.imgLeaf} />

                        <AddButton />

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

                        <Show value={value} color={color} profile={profile} noPhotoText={noPhotoText} pending={pending} iconLink={iconLink}/>

                    </div>

                    {
                        openShow ?
                            <ShowMobile profile={profile} noPhotoText={noPhotoText} value={value} openShow={openShow} handleOpenShow={handleOpenShow} color={color} iconLink={iconLink} /> :
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