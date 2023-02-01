import { useEffect, useState, useRef } from "react";

//Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Text from "../../components/Text/Text";
import Show from "../../components/Show/Show";
import smartphone from "../../images/smartphone.png";
import close_phone from "../../images/close_phone.png";

// Style
import styles from "./Admin.module.css";

import {auth, db} from "../../utils/firebase.config";
import { collection, addDoc, deleteDoc, doc, query, onSnapshot, where, updateDoc, orderBy} from "firebase/firestore";


function Admin() {
    const [value, setValue] = useState([]);
    const [newValue, setNewValue] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [isEdit, setIsEdit] = useState("");
    const [openShow, setOpenShow] = useState(false);



    useEffect(() => {
        // const ref = collection(db, "url");
        // const q = query(ref, where("user", "==", auth.currentUser.uid), orderBy("time", "desc"));
        // const unsub = onSnapshot(q, (querySnapshot) => {
        //     let textArr = [];
        //     querySnapshot.forEach((doc) => {
        //         textArr.push({ ...doc.data(), id: doc.id});
        //     });
        //     setValue(textArr)
        // })

        const ref = doc(db, "itemList", auth.currentUser.uid)
        const unsub = onSnapshot((ref), (doc) => {

            if(doc.data() === undefined){
                setValue([]);
            }else{
                let itemArr = [];
                doc.data().item.map((item) => {
                    itemArr.push(item)
                })
                setValue(itemArr)
            }
            
        })

        return () => unsub();
    }, [])
    
    // Add Data
    const addBox = async () => {

        // await addDoc(collection(db, "url"), {
        //     value: "",
        //     user: auth.currentUser.uid,
        //     time: Date.now(),
        // });
 
        const newText = {
            type: "text",
            title: "",
        }

        if(value){
            console.log("hey")
            let _items = [...value]
            _items.push(newText)
            setValue(_items)
            await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})

        }else{
            console.log("on data")
            setItems([newText])
            await setDoc(doc(db, "itemList", auth.currentUser.uid), {"item": [newText]})
        }

    }

    const addLinkBox = async () => {

        // await addDoc(collection(db, "url"), {
        //     type: "link",
        //     value: "",
        //     url: "",
        //     user: auth.currentUser.uid,
        //     time: Date.now(),
        // });

        const newText = {
            type: "link",
            title: "",
            url: ""
        }

        if(value){
            console.log("hey")
            let _items = [...value]
            _items.push(newText)
            setValue(_items)
            await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})

        }else{
            console.log("on data")
            setItems([newText])
            await setDoc(doc(db, "itemList", auth.currentUser.uid), {"item": [newText]})
        }

    }

    // Edit Data
    const edit = (index, box) => {
        setNewValue(box.title);
        setNewUrl(box.url);
        setIsEdit((prev) => {
            return prev === index ? "" : index
        });
    }

    const storageEdit = async (box, index) => {
        // await updateDoc(doc(db, "url", box.id), {value: newValue});
        // setIsEdit("");
        // setNewValue("");
 
        box.title = newValue
        const _items = [...value]
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})
        setIsEdit("");
        setNewValue("");
    }

    const storageLinkEdit = async (box, index) => {
        // await updateDoc(doc(db, "url", box.id), {value: newValue, url: newUrl});
        // setIsEdit("");
        // setNewValue("");
        // setNewUrl("");
        
        box.title = newValue;
        box.url = newUrl;
        const _items = [...value]
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})
        setIsEdit("");
        setNewValue("");
        setNewUrl("");
    }

    const cancelEdit = () => {
        setIsEdit("");
        setNewValue("");
        setNewUrl("");
    }

    // Delete Data
    const deleteButton = async (index) => {
        // await deleteDoc(doc(db, "url", box.id))

        const _items = [...value]
        _items.splice(index, 1)
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})
    } 

    
    // max-width: 700 : click showing
    const handleOpenShow = () => {
        setOpenShow(!openShow);
    }

    return(
        <div className={styles.wrapper}>

            <div className={ openShow ? styles.layout : undefined}></div>

            <Navbar />

                <main className={styles.main}>
                    <div className={styles.container}>

                        <div className={styles.left}>
                            <div className={styles.addButton}> 
                                <button className={styles.addTextButton} onClick={addBox}>+ 標題文字</button>
                                <button className={styles.addTextButton} onClick={addLinkBox}>+ 連結按鈕</button>
                            </div>

                            <Text edit={edit} storageEdit={storageEdit} cancelEdit={cancelEdit} deleteButton={deleteButton} value={value} setValue={setValue} isEdit={isEdit} newValue={newValue} setNewValue={setNewValue} newUrl={newUrl} setNewUrl={setNewUrl} storageLinkEdit={storageLinkEdit} />

                        </div>

                        <div className={styles.right}>
                            <div className={styles.showing}>

                                <Show value={value} />
                                
                            </div>
                        </div>

                        {
                            !openShow && (
                                <div className={styles.preview} onClick={handleOpenShow}>
                                    <img className={styles.smartphone} src={smartphone} alt="smartphone"/>
                                </div>
                                
                            )
                        }


                        {
                            openShow && (
                                <div className={styles.open}>
                                    <div className={styles.openMobileRight} style={{display: openShow ? "block" : "none"}}>
                                        <div className={styles.openShowing}>
            
                                            <Show value={value} />

                                            <img className={styles.close_phone} src={close1} alt="close1"  
                                                onClick={handleOpenShow} />
                                            
                                        </div>
                                    
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </main>

            <Footer />

        </div>
    )
}

export default Admin;