import { useEffect, useState, useReducer } from "react";

//Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Text from "../../components/Text/Text";
import Show from "../../components/Show/Show";
import ShowMobile from "../../components/ShowMobile/ShowMobile";
import smartphone from "../../images/smartphone.png";

// Style
import styles from "./Admin.module.css";

import { auth, db, storage } from "../../utils/firebase.config";
import { doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";


function Admin() {
    const [value, setValue] = useState([]);
    const [newValue, setNewValue] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [isEdit, setIsEdit] = useState("");
    const [openShow, setOpenShow] = useState(false);
    const [color, setColor] = useState({});
    const [newImgUrl, setNewImgUrl] = useState("");
    const [imgFile, setImgFile] = useState("");
    const [getImgUrl, setGetImgUrl] = useState("");
 


    useEffect(() => {
        const ref = doc(db, "itemList", auth.currentUser.uid)
        const unsub = onSnapshot((ref), (doc) => {

            if (doc.data() === undefined) {
                init()
                return
            } else {
                let itemArr = [];
                doc.data().item.map((item) => {
                    itemArr.push(item)
                })
                setValue(itemArr)
                setColor(doc.data().showColor)
            }

        })

        document.addEventListener('click', handle)

        return () => {
            unsub()
            document.removeEventListener('click', handle)
        }
    }, [])

    const handle = (e) => {
        setIsEdit("")
    };

    const init = async () => {
        const showColor = {
            titleColor: "#333333",
            linkTextColor: "#333333",
            linkColor: "rgba(255, 255, 255, 0.645)",
            logeColor: "#333333",
        }

        await setDoc(doc(db, "itemList", auth.currentUser.uid), { "item": [], "showColor": showColor })
    }

    // Add Data
    const addBox = async () => {
        const newText = [{
            type: "text",
            title: "",
            display: false
        }]

        const _value = newText.concat(value)
        setValue(_value)
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _value })

    };

    const addLinkBox = async () => {
        const newLink = [{
            type: "link",
            title: "",
            url: "",
            display: false
        }]

        const _value = newLink.concat(value)
        setValue(_value)
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _value })
    };

    const addPickBox = async () => {
        const newPic = [{
            type: "pic",
            imgUrl: "",
            file: "",
            display: false
        }]

        const _value = newPic.concat(value)
        setValue(_value)
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _value })
    }

    const addLineBox = async () => {
        console.log("hey~yo")
    }

    // Edit Data
    const edit = (e, index, box) => {
        e.stopPropagation()

        setNewValue(box.title)
        setNewUrl(box.url)
        setNewImgUrl(box.imgUrl)
        setIsEdit((prev) => {
            return prev === index ? "" : index
        })
    }

    const storageEdit = async (box) => {
        box.title = newValue
        box.title ? box.display = true : box.display = false
        const _items = [...value]
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
        setIsEdit("")
        setNewValue("")
    }

    const storageLinkEdit = async (box) => {
        box.title = newValue
        box.url = newUrl
        box.title && box.url ? box.display = true : box.display = false
        const _items = [...value]
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
        setIsEdit("")
        setNewValue("")
        setNewUrl("")
    }

    const storageImgEdit = (box) => {

            // imgFile 為空就停止動作
            if (!imgFile) return;
    
            // 第1個參數 storage service，第2個參數 檔案儲存資料夾名稱 / 檔案名稱
            const randomNum = Math.random().toString(36).substring(7)
            const name = `post.images/${auth.currentUser.uid},${randomNum}`
            const storageRef = ref(storage, name);
            // uploadBytesResumable 上傳檔案至 cloud storage 
            const uploadTask = uploadBytesResumable(storageRef, imgFile);
            // on() 可監控整個上傳過程: 速度、失敗訊息、取得成功後檔案url
            uploadTask.on("state_changed",
                // (snapshot) => {
                //     const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                //     setProgresspercent(progress)
                // },
                // (error) => {
                //     console.log(error)
                // },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setGetImgUrl(downloadURL)
                        box.imgUrl = downloadURL
                        box.file = name
                        box.imgUrl ? box.display = true : box.display = false
                        const _items = [...value]
                        setValue(_items)
                        updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
                        setIsEdit("")                        
                    })
                    
                }
            )
    }

    const uploadImgEdit = (e) => {
        const file = e.target.files[0]
        const imageURL = URL.createObjectURL(file)
        setImgFile(file)
        setNewImgUrl(imageURL) 
    }


    const cancelEdit = () => {
        setIsEdit("")
        setNewValue("")
        setNewUrl("")
        setNewImgUrl("")
    }

    // display toggle
    const handleDisplay = async (box) => {
        if (box.type === "text" && box.title === "") {
            return
        }

        if (box.type === "link" && box.title === "" || box.url === "") {
            return
        }

        box.display ? box.display = false : box.display = true
        const _items = [...value]
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
    }

    // Delete Data
    const deleteButton = async (box, index) => {
        if(box.type === "pic"){
            const desertRef = ref(storage, box.file);

            deleteObject(desertRef).then(() => {
                // File deleted successfully
              }).catch((error) => {
                console.log(error)
                // Uh-oh, an error occurred!
              });
        }

        const _items = [...value]
        _items.splice(index, 1)
        setValue(_items)
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
    }

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
                            <button className={styles.addTextButton} onClick={addBox}>+ 標題文字</button>
                            <button className={styles.addTextButton} onClick={addLinkBox}>+ 連結按鈕</button>
                            <button className={styles.addTextButton} onClick={addPickBox}>+ 圖片看板</button>
                            <button className={styles.addTextButton} onClick={addLineBox}>+ 分隔線</button>
                        </div>

                        <Text edit={edit} storageEdit={storageEdit} cancelEdit={cancelEdit} deleteButton={deleteButton} value={value} setValue={setValue} isEdit={isEdit} newValue={newValue} setNewValue={setNewValue} newUrl={newUrl} setNewUrl={setNewUrl} storageLinkEdit={storageLinkEdit} handleDisplay={handleDisplay} uploadImgEdit={uploadImgEdit} storageImgEdit={storageImgEdit} newImgUrl={newImgUrl} getImgUrl={getImgUrl} />

                    </div>

                    <div className={styles.right}>

                        <Show value={value} color={color} />

                    </div>

                    {
                        openShow ?
                            <ShowMobile value={value} openShow={openShow} handleOpenShow={handleOpenShow} color={color} /> :
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