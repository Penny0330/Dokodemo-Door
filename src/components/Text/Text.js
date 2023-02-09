import { useRef, useState, useEffect } from "react";

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

import { useEditBox } from "../../hooks/useEditBox";

function Text ({ value, setValue }){

    const {edit, newValue, setNewValue,  newLinkUrl, setNewLinkUrl, newImgUrl, setNewImgUrl, storageEdit, storageLinkEdit, uploadImgEdit, storageImgEdit, displayToggle, deleteButton} = useEditBox();
    const [isEdit, setIsEdit] = useState("");

    useEffect(() => {
        document.addEventListener('click', handleClose)

        return () => {
            document.removeEventListener('click', handleClose)
        }
    }, [])

    const handleClose = (e) => {
        setIsEdit("")
    };

    const handleEdit = (e, box, index) => {
        
        edit(e, box)
        setIsEdit((prev) => {
            return prev === index ? "" : index
        })
    }

    const handleStorageEdit = (box, value) => {
        storageEdit(box, value)
        setIsEdit("")
    }

    const handleStorageLinkEdit = (box, value) => {
        storageLinkEdit(box, value)
        setIsEdit("")
    }

    const handleUploadImgEdit = (e) => {
        uploadImgEdit(e)
    }

    const handleStorageImgEdit = (box, value) => {
        storageImgEdit(box, value)
        setIsEdit("") 
    }

    const cancelEdit = () => {
        setIsEdit("")
        setNewValue("")
        setNewLinkUrl("")
        setNewImgUrl("")
    }

    const handleDisplayToggle = (box, value) => {
        displayToggle(box, value)
    }

    const handleDeleteButton = (box,  index, value) => {
        deleteButton( box, index, value)
    }

    // Drag and Down
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const handleOnDragStart = (e, index) => {
        dragItem.current=index;
        e.target.parentElement.style.border = "3px dashed gray";
    }


    const handleBoxSort = async (e) => {
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

            
            {
                value.length !== 0 && (
                    value.map((box, index) => {
                        return(
                            <div key={index}>
                                {
                                    box.type === "text" && (
                                        <div className={styles.textBox}>
                                            <img className={styles.drag} src={drag} alt="drag" draggable
                                                onDragStart={(e)=> handleOnDragStart(e, index)}
                                                onDragEnter={(e)=> dragOverItem.current=index}
                                                onDragEnd={(e) => handleBoxSort(e, value)}
                                                onDragOver={(e) => e.stopPropagation()}
                                                />

                                            <div className={styles.textValueAndEditPen} 
                                                    onClick={(e) => handleEdit(e, box, index)} 
                                                    style={{display: isEdit === index ? "none" : "flex"}}>
                                                { box.title == "" ?
                                                    <div className={styles.textNoValue}>編輯文字</div>:
                                                    <div className={styles.textValue}>{box.title}</div>
                                                }

                                                <img className={styles.editPen} src={pen} alt="pen"/>
                                            </div>

                                            <div className={styles.edit} style={{display: isEdit === index ? "flex" : "none"}} onClick={(e) => e.stopPropagation()}>
                                                <input className={styles.textInput} type="text" value={newValue} onChange={e => setNewValue(e.target.value)}/> 
                                                <div className={styles.editButton}>
                                                    <div className={styles.saveButton}  onClick={() => handleStorageEdit(box, value)}>儲存</div>
                                                    <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                        取消
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.displayToggleAndTrash}>
                                                {
                                                    box.display && (
                                                        <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={(e) => handleDisplayToggle(box, value)} />
                                                    )
                                                }
                                                {
                                                    !box.display && (
                                                        <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={(e) => handleDisplayToggle(box, value)} />
                                                    )
                                                }
                                                
                                                <img className={styles.trashButton} src={trash} alt="trash" onClick={() => handleDeleteButton(box, index, value)} />
                                            </div>

                                        </div>
                                    )
                                }

                                {
                                    box.type === "link" && (
                                        <div className={styles.linkBox}>

                                            <img className={styles.drag} src={drag} alt="drag" draggable
                                                onDragStart={(e)=> handleOnDragStart(e, index)}
                                                onDragEnter={(e)=> dragOverItem.current=index}
                                                onDragEnd={(e) => handleBoxSort(e, value)}
                                                onDragOver={(e) => e.stopPropagation()}
                                                />

                                            <div className={styles.textValueAndEditPen} 
                                                onClick={(e) => handleEdit(e, box, index)} 
                                                style={{display: isEdit === index ? "none" : "flex"}}>
                                                { box.title == "" ?
                                                    <div className={styles.textNoValue}>編輯連結</div>:
                                                    <div className={styles.textValue}>{box.title}</div>
                                                }

                                                <img className={styles.editPen} src={pen} alt="pen"/>
                                            </div>

                                            <div className={styles.linkEdit} style={{display: isEdit === index ? "flex" : "none"}} onClick={(e) => e.stopPropagation()}>

                                                    <input className={styles.titleInput} type="text" placeholder="按鈕文字" value={newValue} onChange={e => setNewValue(e.target.value)} />
                                                    <input className={styles.linkInput} type="text" placeholder="連結網址" value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)} />

                                                
                                                <div className={styles.editButton}>
                                                    <div className={styles.saveButton}  onClick={() => handleStorageLinkEdit(box, value)}>儲存</div>
                                                    <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                        取消
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.displayToggleAndTrash}>
                                                {
                                                    box.display && (
                                                        <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={(e) => handleDisplayToggle(box, value)} />
                                                    )
                                                }
                                                {
                                                    !box.display && (
                                                        <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={(e) => handleDisplayToggle(box, value)} />
                                                    )
                                                }
                                                
                                                <img className={styles.trashButton} src={trash} alt="trash" onClick={() => handleDeleteButton(box, index, value)} />
                                            </div>

                                        </div>
                                    )
                                }

                                {
                                    box.type === "pic" && (
                                        <div className={styles.picBox}>

                                            <img className={styles.drag} src={drag} alt="drag" draggable
                                                onDragStart={(e)=> handleOnDragStart(e, index)}
                                                onDragEnter={(e)=> dragOverItem.current=index}
                                                onDragEnd={(e) => handleBoxSort(e, value)}
                                                onDragOver={(e) => e.stopPropagation()}
                                                />

                                            <div className={styles.imgValueAndEditPen} 
                                                onClick={(e) => handleEdit(e, box ,index)} 
                                                style={{display: isEdit === index ? "none" : "flex"}}>
                                                { box.imgUrl == "" ?
                                                    <div className={styles.imgNoValue}>上傳圖片</div>:
                                                    <div className={styles.imgValue}>
                                                        <img className={styles.img} src={box.imgUrl} alt="" />
                                                    </div>
                                                }

                                                <img className={styles.editPen} src={pen} alt="pen"/>
                                            </div>

                                            <div className={styles.picEdit} style={{display: isEdit === index ? "flex" : "none"}} onClick={(e) => e.stopPropagation()}>
                                                    
                                                {
                                                    newImgUrl && (
                                                        <div className={styles.imgValueEdit}>
                                                            <img className={styles.imgEdit} src={newImgUrl} alt="" />
                                                        </div>
                                                    )
                                                }
                                                                                                    
                                                {
                                                    !newImgUrl && (
                                                        <div className={styles.noImgValueEdit}>
                                                            <div className={styles.noImage}>上傳圖片</div>
                                                        </div>
                                                    )
                                                }

                                                
                                                <div className={styles.picEditButton}>
                                                    <div className={styles.uploadButton}>
                                                        <input type="file"
                                                                id="file-input"
                                                                accept="image/*"
                                                                className={styles.fileInput} onChange={(e) => handleUploadImgEdit(e)}
                                                            />
                                                            <label className={styles.fileLabel} htmlFor="file-input">
                                                                
                                                                <span>上傳</span>
                                                                
                                                            </label>
                                                    </div>
                                                    <div className={styles.saveButton}  onClick={() => handleStorageImgEdit(box, value)}>儲存</div>
                                                    <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                        取消
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.displayToggleAndTrash}>
                                                {
                                                    box.display && (
                                                        <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={(e) => handleDisplayToggle(box, value)} />
                                                    )
                                                }
                                                {
                                                    !box.display && (
                                                        <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={(e) => handleDisplayToggle(box, value)} />
                                                    )
                                                }
                                                
                                                <img className={styles.trashButton} src={trash} alt="trash" onClick={() => handleDeleteButton(box, index, value)} />
                                            </div>

                                        </div>
                                    )
                                }
                            </div>

                        )
                        
                    })
                    
                )
            }

            {
                value.length === 0 && (
                    <div  className={styles.noData}>
                        <div>新增您的連結</div>   
                        <div>創造專屬任意門!</div> 
                    </div>
                                    
                )
            }


        </div> 
    )
        
}

export default Text