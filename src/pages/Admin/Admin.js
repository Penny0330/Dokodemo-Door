import { useEffect, useState } from "react";

//Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Text from "../../components/Text/Text";
import Show from "../../components/Show/Show";
import ShowMobile from "../../components/ShowMobile/ShowMobile";
import smartphone from "../../images/smartphone.png";

// Style
import styles from "./Admin.module.css";

import {auth, db, storage} from "../../utils/firebase.config";
import {  doc, onSnapshot, updateDoc } from "firebase/firestore";



function Admin() {
    const [value, setValue] = useState([]);
    const [newValue, setNewValue] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [isEdit, setIsEdit] = useState("");
    const [openShow, setOpenShow] = useState(false);

    useEffect(() => {
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

        document.addEventListener('click', handle)

        return () =>{
            unsub()
            document.removeEventListener('click', handle)
        } 
    }, [])

    const handle = (e) =>{
        setIsEdit("")
    };

    // Add Data
    const addBox = async () => {
        const newText = {
            type: "text",
            title: "",
            display: true
        }

        if(value){
            let _items = [...value]
            _items.unshift(newText)
            setValue(_items)
            await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})

        }else{
            setItems([newText])
            await setDoc(doc(db, "itemList", auth.currentUser.uid), {"item": [newText]})
        }
    };

    const addLinkBox = async () => {
        const newText = {
            type: "link",
            title: "",
            url: "",
            display: true
        }

        if(value){
            console.log("hey")
            let _items = [...value]
            _items.unshift(newText)
            setValue(_items)
            await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})

        }else{
            console.log("on data")
            setItems([newText])
            await setDoc(doc(db, "itemList", auth.currentUser.uid), {"item": [newText]})
        }
    };

    // Edit Data
    const edit = (e, index, box) => {
        e.stopPropagation()
        setNewValue(box.title)
        setNewUrl(box.url)
        setIsEdit((prev) => {
            return prev === index ? "" : index
        })
    }

    const storageEdit = async (box) => {
        box.title = newValue
        const _items = [...value]
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})
        setIsEdit("")
        setNewValue("")
    }

    const storageLinkEdit = async (box) => {
        box.title = newValue
        box.url = newUrl
        const _items = [...value]
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})
        setIsEdit("")
        setNewValue("")
        setNewUrl("")
    }

    const cancelEdit = () => {
        setIsEdit("")
        setNewValue("")
        setNewUrl("")
    }

    // Delete Data
    const deleteButton = async (index) => {

        const _items = [...value]
        _items.splice(index, 1)
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})
    } 

    
    // max-width: 700 : click showing
    const handleOpenShow = () => {
        setOpenShow(!openShow)
    }

    const handleDisplay = async (box) => {

        if(box.display){
            box.display = false

        }else{
            box.display = true
        }

        const _items = [...value]
        setValue(_items)

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _items})
    }



    return(
        <div className="wrapper">

            <Navbar />

                <main className={styles.main}>

                    <div className={styles.container}>

                        <div className={styles.left}>
                            <div className={styles.addButton}> 
                                <button className={styles.addTextButton} onClick={addBox}>+ 標題文字</button>
                                <button className={styles.addTextButton} onClick={addLinkBox}>+ 連結按鈕</button>
                            </div>

                            <Text edit={edit} storageEdit={storageEdit} cancelEdit={cancelEdit} deleteButton={deleteButton} value={value} setValue={setValue} isEdit={isEdit} newValue={newValue} setNewValue={setNewValue} newUrl={newUrl} setNewUrl={setNewUrl} storageLinkEdit={storageLinkEdit} handleDisplay={handleDisplay} />

                        </div>

                        <div className={styles.right}>

                                <Show value={value} />

                        </div>

                        {
                            openShow ? 
                            <ShowMobile value={value} openShow={openShow} handleOpenShow={handleOpenShow} /> : 
                            <div className={styles.preview} onClick={handleOpenShow}>
                                <img className={styles.smartphone} src={smartphone} alt="smartphone"/>
                            </div>
                        }

                    </div>
                </main>

            <Footer />

        </div>
    )
}

export default Admin;