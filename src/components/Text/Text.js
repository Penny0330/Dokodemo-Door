import { useRef } from "react";

//Component
import toggle from "../../images/toggle.svg";
import trash from "../../images/trash.svg";
import pen from "../../images/pen.png";
import drag from "../../images/drag.png";

// Style
import styles from "./Text.module.css";

import { where, updateDoc, doc, collection, query, getDocs} from "firebase/firestore";
import { db, auth } from "../../utils/firebase.config";

function Text ({edit, 
                storageEdit, 
                cancelEdit, 
                deleteButton, 
                value, 
                setValue,
                isEdit, 
                newValue, 
                setNewValue, 
                newUrl, 
                setNewUrl,
                storageLinkEdit}){

    // value.map(item => {
    //     console.log(item)
    // })


    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    // const onDragStart = (e, index) => {
    //     console.log("drag started", index)
    // }

    // const onDragEnter = (e, index) => {
    //     console.log(e, index)
    // }


    const handleSort = async (box) => {
        let _value = [...value];

        const draggedItemContent = _value.splice(dragItem.current, 1)[0]

        _value.splice(dragOverItem.current, 0, draggedItemContent)

        // let changItemId = null;

        setValue(_value)

        // const ref = collection(db, "url");
        // const q = query(ref, where("index", "==", dragOverItem.current));
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     changItemId = doc.id
        // });

        // await updateDoc(doc(db, "url", box.id), {index: dragOverItem.current});
        // await updateDoc(doc(db, "url", changItemId), {index: dragItem.current});

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _value})

        dragItem.current = null
        dragOverItem.current =null
     
    }


    return(
        <div className={styles.allText}>

            { value.map((box, index) => {
                    return(
                        <>
                            {
                                box.type === "text" && (
                                    <div className={styles.textBox} >
                                        <img className={styles.drag} src={drag} alt="drag" 
                                            draggable  
                                            onDragStart={(e)=> dragItem.current=index}
                                            onDragEnter={(e)=> dragOverItem.current=index}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => e.preventDefault()}
                                            />

                                        <div className={styles.textValueAndEditPen} 
                                                onClick={() => edit(index, box)} 
                                                style={{display: isEdit === index ? "none" : "flex"}}>
                                            { box.title == "" ?
                                                <div className={styles.textValue}>編輯文字</div>:
                                                <div className={styles.textValue}>{box.title}</div>
                                            }

                                            <img className={styles.editPen} src={pen} alt="pen"/>
                                        </div>

                                        <div className={styles.edit} style={{display: isEdit === index ? "flex" : "none"}}>
                                            <input className={styles.textInput} type="text" value={newValue} onChange={e => setNewValue(e.target.value)} />
                                            <div className={styles.editButton}>
                                                <div className={styles.saveButton}  onClick={() => storageEdit(box, index)}>儲存</div>
                                                <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                    取消
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.displayToggleAndTrash}>
                                            <img className={styles.displayToggleButton} src={toggle} alt="toggle" />
                                            <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(index)} />
                                        </div>
                                    </div>
                                )
                            }

                            {
                                box.type === "link" && (
                                    <div className={styles.linkBox}>

                                        <img className={styles.drag} src={drag} alt="drag" 
                                            draggable  
                                            onDragStart={(e)=> dragItem.current=index}
                                            onDragEnter={(e)=> dragOverItem.current=index}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => e.preventDefault()}
                                            />

                                        <div className={styles.textValueAndEditPen} 
                                            onClick={() => edit(index, box)} 
                                            style={{display: isEdit === index ? "none" : "flex"}}>
                                            { box.title == "" ?
                                                <div className={styles.textValue}>編輯連結</div>:
                                                <div className={styles.textValue}>{box.title}</div>
                                            }

                                            <img className={styles.editPen} src={pen} alt="pen"/>
                                        </div>

                                        <div className={styles.linkEdit} style={{display: isEdit === index ? "flex" : "none"}}>

                                                <input className={styles.titleInput} type="text" placeholder="按鈕文字" value={newValue} onChange={e => setNewValue(e.target.value)} />
                                                <input className={styles.linkInput} type="text" placeholder="連結網址" value={newUrl} onChange={e => setNewUrl(e.target.value)} />

                                            
                                            <div className={styles.editButton}>
                                                <div className={styles.saveButton}  onClick={() => storageLinkEdit(box, index)}>儲存</div>
                                                <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                    取消
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.displayToggleAndTrash}>
                                            <img className={styles.displayToggleButton} src={toggle} alt="toggle" />
                                            <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(index)} />
                                        </div>
                                    </div>
                                )
                            }
                        </>

                    )
                    
                })
            }
        </div> 
    )
        
}

export default Text