import styles from "./Popup.module.css";

function Popup ({setPopup}){

    const closePopup = () => {
        setPopup(false);
    }

    return(
        <div className={styles.popup}>
            <div className={styles.popupBox}>
                <p className={styles.popupTitle}>圖片容量大於1MB</p>
                <button className={styles.popupButton} onClick={closePopup}>確認</button>
            </div>
        </div>
    )
}

export default Popup;