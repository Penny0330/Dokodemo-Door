import { useEffect, useState } from "react";

//Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Text from "../../components/Text/Text";
import Show from "../../components/Show/Show";

// Style
import styles from "./Admin.module.css";

import {auth, db} from "../../utils/firebase.config";
import { collection, addDoc, deleteDoc, doc, query, onSnapshot, where, updateDoc, orderBy} from "firebase/firestore";


function Admin() {
    const [value, setValue] = useState([]);
    const [newValue, setNewValue] = useState("");
    const [ isEdit, setIsEdit] = useState(null);


    useEffect(() => {
        const ref = collection(db, "url");
        const q = query(ref, where("user", "==", auth.currentUser.uid), orderBy("time", "desc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let textArr = [];
            querySnapshot.forEach((doc) => {
                textArr.push({ ...doc.data(), id: doc.id});
            });
            setValue(textArr)
        })
        return () => unsub();
    }, [])

    
    const addBox = async () => {

        await addDoc(collection(db, "url"), {
            value: "",
            user: auth.currentUser.uid,
            time: Date.now(),
        });
    }


    const edit = (index, box) => {
        setNewValue(box.value);
        setIsEdit((prev) => {
            return prev === index ? null : index
        });
    }

    const storageEdit = async (box) => {
        await updateDoc(doc(db, "url", box.id), {value: newValue});
        setIsEdit(null);
        setNewValue("");
    }

    const cancelEdit = () => {
        setIsEdit(null);
        setNewValue("");
    }

    const deleteButton = async (box) => {
        await deleteDoc(doc(db, "url", box.id))
    } 

    return(
        <div className="wrapper">
            <Navbar />

                <main className={styles.main} >
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <div className={styles.addButton}>
                                <button className={styles.addTextButton} onClick={addBox}>+ 新增文字</button>
                                <button className={styles.addTextButton}>+ 新增連結</button>
                            </div>

                            <Text edit={edit} storageEdit={storageEdit} cancelEdit={cancelEdit} deleteButton={deleteButton} value={value} isEdit={isEdit} newValue={newValue} setNewValue={setNewValue} />

                        </div>
                        <div className={styles.right}>
                            <div className={styles.showing}>

                                <Show value={value} />
                                
                            </div>
                            
                        </div>

                        <div className={styles.preview}>Preview</div>

                    </div>
                </main>

            <Footer />
        </div>
    )
}

export default Admin;