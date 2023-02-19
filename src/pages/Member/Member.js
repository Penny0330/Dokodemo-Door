import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import loading from "../../images/loading.gif";
import Show from "../../components/Show/Show";
import ShowMobile from "../../components/ShowMobile/ShowMobile";
import smartphone from "../../images/smartphone.png";

// hooks
import { useMember } from "../../hooks/useMember";
import { useGetBox } from "../../hooks/useGetBox";
import { useAuthContext } from "../../hooks/useAuthContext";

// Style
import styles from "./Member.module.css";

// firebase
import { auth, db } from "../../utils/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

function Member () {

    const { user } = useAuthContext();
    const {profile, value, setValue, color } = useGetBox(user);       
    const [openShow, setOpenShow] = useState(false);

    const { uploadPhoto, newImgUrl, setNewImgUrl, storageProfile, pending } = useMember();
    const [ newAccount, setNewAccount] = useState("");
    const [ newIntro, setNewIntro] = useState("");

    const noPhotoText = newAccount.slice(0, 1).toUpperCase();


    useEffect(() => {
        const ref = doc(db, "itemList", auth.currentUser.uid)
        const unsub = onSnapshot((ref), (doc) => {
                setNewImgUrl(doc.data().profile.photo);
                setNewAccount(doc.data().profile.account);
                setNewIntro(doc.data().profile.introduction);
        })
        
        return () => {
            unsub()
        }
    }, [])

        // max-width: 700 : click showing
        const handleOpenShow = () => {
            setOpenShow(!openShow);
        }

    // const handleUploadPhoto = (e) => {
    //     uploadPhoto(e);
    // }

    // const handleStore = (newAccount, newIntro) => {
    //     storageProfile(newAccount, newIntro);
    // }

    return(

        <div className="wrapper">
            <Navbar />

            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.storeAndGoHomeButton}>
                            <button className={styles.goHomeButton}>
                                <Link to={"/admin"}>返回主頁</Link>
                            </button>

                            {
                                !pending && (
                                    <button className={styles.storeButton} onClick={() => storageProfile(newAccount, newIntro)}>儲存</button>
                            )
                            }
                            {
                                pending && (
                                    <button className={styles.loadingButton}>
                                        <img src={loading} alt="" className={styles.loading} />
                                    </button>
                                )
                            }

                        </div>
                        <div className={styles.profile}>
                            <div className={styles.profilePhoto}>
                                
                                {
                                    newImgUrl && (
                                        <img src={newImgUrl} alt="" className={styles.photo} />
                                    )
                                }
                                
                                {
                                    !newImgUrl && (
                                        <div className={styles.noPhoto}>{noPhotoText}</div>
                                    )
                                }
    
                                <div className={styles.photoEditButton}>
                                    <input type="file"
                                            id="file-input"
                                            accept="image/*"
                                            className={styles.fileInput} onChange={(e) => uploadPhoto(e)}
                                        />
                                    <label className={styles.fileLabel} htmlFor="file-input">
                                        
                                        <span>編輯</span>
                                        
                                    </label>
                                </div>
                            </div>
                            <form className={styles.profileAccount_Introduction}>
                                <label htmlFor="account" className={styles.memberLabel}>帳號</label>
                                <input type="text" id="account" className={styles.accountInput} value={newAccount} onChange={(e) => setNewAccount(e.target.value)} />
                                <label htmlFor="introduction" className={styles.memberLabel} >個人簡介</label>
                                <textarea cols="30" rows="5" id="introduction" className={styles.introductionTextarea} value={newIntro} onChange={(e) => setNewIntro(e.target.value)}></textarea>
                            </form>
                        </div>
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

export default Member