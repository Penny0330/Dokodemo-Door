import { useRef } from "react";

//Component
import toggleOpen from "../../images/toggle-open.png";
import toggleClose from "../../images/toggle-close.png";
import trash from "../../images/trash.svg";
import pen from "../../images/pen.png";
import drag from "../../images/drag.png";

// Style
import styles from "./Text.module.css";

import { updateDoc, doc } from "firebase/firestore";
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
                storageLinkEdit,
                handleDisplay,
            }){


    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const onDragStart = (e, index) => {
        dragItem.current=index;
        e.target.parentElement.style.border = "3px dashed gray";
    }


    const handleSort = async (e) => {
        let _value = [...value]
        const draggedItemContent = _value.splice(dragItem.current, 1)[0]
        _value.splice(dragOverItem.current, 0, draggedItemContent)
        setValue(_value)
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": _value})
        dragItem.current = null
        dragOverItem.current =null
        e.target.parentElement.style.border = "none";
    }


    return(
        <div className={styles.allText}>

            { value.map((box, index) => {
                    return(
                        <div key={index}>
                            {
                                box.type === "text" && (
                                    <div className={styles.textBox}>
                                        <img className={styles.drag} src={drag} alt="drag" draggable
                                            onDragStart={(e)=> onDragStart(e, index)}
                                            onDragEnter={(e)=> dragOverItem.current=index}
                                            onDragEnd={(e) => handleSort(e)}
                                            onDragOver={(e) => e.stopPropagation()}
                                            />

                                        <div className={styles.textValueAndEditPen} 
                                                onClick={(e) => edit(e,index, box)} 
                                                style={{display: isEdit === index ? "none" : "flex"}}>
                                            { box.title == "" ?
                                                <div className={styles.textNoValue}>編輯文字</div>:
                                                <div className={styles.textValue}>{box.title}</div>
                                            }

                                            <img className={styles.editPen} src={pen} alt="pen"/>
                                        </div>

                                        <div className={styles.edit} style={{display: isEdit === index ? "flex" : "none"}} onClick={(e) => e.stopPropagation()}>
                                            <input className={styles.textInput} type="text" value={newValue} onChange={e => setNewValue(e.target.value)} />
                                            <div className={styles.editButton}>
                                                <div className={styles.saveButton}  onClick={() => storageEdit(box, index)}>儲存</div>
                                                <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                    取消
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            box.display && (
                                                <div className={styles.displayToggleAndTrash}>
                                                    <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={(e) => handleDisplay(box)} />
                                                    <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(index)} />
                                                </div>
                                            )
                                        }

                                        {
                                            !box.display && (
                                                <div className={styles.displayToggleAndTrash}>
                                                    <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={(e) => handleDisplay(box)} />
                                                    <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(index)} />
                                                </div>
                                            )
                                        }

                                    </div>
                                )
                            }

                            {
                                box.type === "link" && (
                                    <div className={styles.linkBox}>

                                        <img className={styles.drag} src={drag} alt="drag" draggable
                                            onDragStart={(e)=> onDragStart(e, index)}
                                            onDragEnter={(e)=> dragOverItem.current=index}
                                            onDragEnd={(e) => handleSort(e)}
                                            onDragOver={(e) => e.stopPropagation()}
                                            />

                                        <div className={styles.textValueAndEditPen} 
                                            onClick={(e) => edit(e, index, box)} 
                                            style={{display: isEdit === index ? "none" : "flex"}}>
                                            { box.title == "" ?
                                                <div className={styles.textNoValue}>編輯連結</div>:
                                                <div className={styles.textValue}>{box.title}</div>
                                            }

                                            <img className={styles.editPen} src={pen} alt="pen"/>
                                        </div>

                                        <div className={styles.linkEdit} style={{display: isEdit === index ? "flex" : "none"}} onClick={(e) => e.stopPropagation()}>

                                                <input className={styles.titleInput} type="text" placeholder="按鈕文字" value={newValue} onChange={e => setNewValue(e.target.value)} />
                                                <input className={styles.linkInput} type="text" placeholder="連結網址" value={newUrl} onChange={e => setNewUrl(e.target.value)} />

                                            
                                            <div className={styles.editButton}>
                                                <div className={styles.saveButton}  onClick={() => storageLinkEdit(box, index)}>儲存</div>
                                                <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                    取消
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            box.display && (
                                                <div className={styles.displayToggleAndTrash}>
                                                    <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={(e) => handleDisplay(box)} />
                                                    <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(index)} />
                                                </div>
                                            )
                                        
                                        }
                                        {
                                            !box.display && (
                                                <div className={styles.displayToggleAndTrash}>
                                                    <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={(e) => handleDisplay(box)} />
                                                    <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(index)} />
                                                </div>
                                            )
                                        
                                        }

                                    </div>
                                )
                            }
                        </div>

                    )
                    
                })
            }
        </div> 
    )
        
}

export default Text