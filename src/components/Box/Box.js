//Component
import Popup from "../Popup/Popup";
import toggleOpen from "../../images/toggle-open.png";
import toggleClose from "../../images/toggle-close.png";
import trash from "../../images/trash.svg";
import pen from "../../images/pen.png";
import drag from "../../images/drag.png";

//hooks
import { useEditBox } from "../../hooks/useEditBox";

// Style
import styles from "./Box.module.css";

// firebase
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../utils/firebase.config";

// DnD
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

function Box ({ value, setValue, color }){

    const { handleEdit, newValue, setNewValue,  newLinkUrl, setNewLinkUrl, newImgUrl, handleStorageEdit, handleStorageLinkEdit, handleUploadImgEdit, handleStorageImgEdit, displayToggle, deleteButton, popup, setPopup, isEdit, cancelEdit } = useEditBox();

    const onDragEnd = async(result) => {
        // source 被拖曳的物件 ； destination 拖曳後的位置
        const { source, destination } = result
     
        if (!destination) {
            return;
        }

        let newValue = [...value];  
    
        // 從 source.index 剪下被拖曳的元素
        const [remove] = newValue.splice(source.index, 1);

        //在 destination.index 位置貼上被拖曳的元素
        newValue.splice(destination.index, 0, remove);
    
        // 設定新的 value
        setValue(newValue)
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"item": newValue});
      }
    
    return(
        
        <div className={styles.allText}>
            
            {
                popup && (
                    < Popup setPopup={setPopup} />
                )
            }  

            <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
                <Droppable droppableId="drop-id">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                value.length !== 0 && (
                                    value.map((box, index) => {
                                        return(
                                            <Draggable draggableId={index.toString()} index={index} key={index}>
                                                {(provided) => (

                                                    <div 
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef} >

                                                        {
                                                            box.type === "text" && (

                                                                <div className={`${styles.textBox}`}> 
                                                                    <img className={styles.drag} src={drag} alt="drag"/>

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
                                                                                <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={(e) => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        {
                                                                            !box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={(e) => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        
                                                                        <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(box, index, value)} />
                                                                    </div>

                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            box.type === "link" && (
                                                                <div className={styles.linkBox}>
                                                                    <img className={styles.drag} src={drag} alt="drag"/>
                                                        
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
                                                                                <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={(e) => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        {
                                                                            !box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={(e) => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        
                                                                        <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(box, index, value)} />
                                                                    </div>     
                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            box.type === "pic" && (
                                                                <div className={styles.picBox}>
                                                                    <img className={styles.drag} src={drag} alt="drag" />
                                                        
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
                                                                                <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={(e) => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        {
                                                                            !box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={(e) => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        
                                                                        <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(box, index, value)} />
                                                                    </div>
                                                        
                                                                    <div className={styles.picInfo}>
                                                                        <div>檔案須小於1MB</div>
                                                                    </div>
                                                        
                                                                </div>
                                                                
                                                            )
                                                        }

                                                        {
                                                            box.type === "line" && (
                                                                <div className={`${styles.lineBox}`}> 
                                                                    <img className={styles.drag} src={drag} alt="drag"/>

                                                                    <div className={styles.lineBoxInner}>
                                                                        <div className={styles.line} style={{color: color.logeColor}}></div>
                                                                    </div>

                                                                    <div className={styles.displayToggleAndTrash}>
                                                                        {
                                                                            box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={(e) => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        {
                                                                            !box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={(e) => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        
                                                                        <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(box, index, value)} />
                                                                    </div>
                                                                </div>
                                                            )

                                                        }
                                                    </div>
                                                )}
                                            </Draggable>
                                        ) 
                                    })  
                                )
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {
                !value.length && (
                    <div  className={styles.noData}>
                        <div>新增您的連結</div>   
                        <div>創造專屬任意門!</div> 
                    </div>
                                    
                )
            }

        </div> 
    ) 
}

export default Box