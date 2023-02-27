//Component
import Popup from "../Popup/Popup";
import toggleOpen from "../../images/toggle-open.png";
import toggleClose from "../../images/toggle-close.png";
import trash from "../../images/trash.svg";
import pen from "../../images/pen.png";
import drag from "../../images/drag.png";

import imageIcon from "../../images/image.png";
import imageWhite from "../../images/image_white.png";
import check from "../../images/check.png";
import closeWhite from "../../images/close_edit.png";

//hooks
import { useEditBox } from "../../hooks/useEditBox";
import { useGetBox } from "../../hooks/useGetBox";
import { useAuthContext } from "../../hooks/useAuthContext";

// Style
import styles from "./Box.module.css";

// DnD
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";


function Box (){

    const { user } = useAuthContext();
    const { value, color } = useGetBox(user);
    const { handleEdit, newValue, setNewValue,  newLinkUrl, setNewLinkUrl, newImgUrl, handleStorageEdit, handleStorageLinkEdit, handleUploadImgEdit, handleStorageImgEdit, displayToggle, deleteButton, deletePopup, setDeletePopup, popup, setPopup, isEdit, cancelEdit, deleteCheck, onDragEnd } = useEditBox();
    
    return(
        
        <div className={styles.allText}>
            
            {
                popup && (
                    < Popup setPopup={setPopup} />
                )
            }

            {
                deletePopup && (
                    <div className={styles.popup}>
                        <div className={styles.popupBox}>
                            <p className={styles.alter}>注意</p>
                            <p className={styles.popupTitle}>確認刪除區塊？</p>
                            <button className={styles.cancelDeleteButton} onClick={() => setDeletePopup(!deletePopup)}>取消</button>
                            <button className={styles.deleteButton} onClick={() => deleteButton(value)}>確認</button>
                        </div>
                    </div>
                )
            }

            <DragDropContext onDragEnd={(e) => onDragEnd(e, value)}>
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
                                                        
                                                        ref={provided.innerRef} >
                                                        {
                                                            box.type === "text" && (

                                                                <div className={`${styles.textBox}`}> 

                                                                    <img className={styles.drag} src={drag} alt="drag" {...provided.dragHandleProps}/>

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
                                                                            <div className={styles.TextSaveButton}  onClick={() => handleStorageEdit(box, value)}>
                                                                                {/* 儲存 */}
                                                                                <img src={check} alt="" className={styles.checkIcon} />
                                                                            </div>
                                                                            <div className={styles.TextCancelButton}  onClick={() => cancelEdit(box)}>
                                                                                {/* 取消 */}
                                                                                <img src={closeWhite} alt="" className={styles.cancelIcon} />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className={styles.displayToggleAndTrash}>
                                                                        {
                                                                            box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={() => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        {
                                                                            !box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={() => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        
                                                                        <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteCheck(box, index)} />
                                                                    </div>

                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            box.type === "link" && (
                                                                <div className={styles.linkBox}>
                                                                    <img className={styles.drag} src={drag} alt="drag"  {...provided.dragHandleProps}/>
                                                        
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
                                                                            <div className={styles.TextSaveButton}  onClick={() => handleStorageLinkEdit(box, value)}>
                                                                                {/* 儲存 */}
                                                                                <img src={check} alt="" className={styles.checkIcon} />
                                                                            </div>
                                                                            <div className={styles.TextCancelButton}  onClick={() => cancelEdit(box)}>
                                                                                {/* 取消 */}
                                                                                <img src={closeWhite} alt="" className={styles.cancelIcon} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                        
                                                                    <div className={styles.displayToggleAndTrash}>
                                                                        {
                                                                            box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={() => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        {
                                                                            !box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={() => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        
                                                                        <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteCheck(box, index)} />
                                                                    </div>     
                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            box.type === "pic" && (
                                                                <div className={styles.picBox}>
                                                                    <img className={styles.drag} src={drag} alt="drag"  {...provided.dragHandleProps} />                                                        
                                                                    <div className={styles.imgValueAndEditPen} 
                                                                        onClick={(e) => handleEdit(e, box ,index)} 
                                                                        style={{display: isEdit === index ? "none" : "flex"}}
                                                                        >
                                                                        { box.imgUrl === "" ?
                                                                            <div className={styles.imgNoValue}>
                                                                                <img src={imageIcon} alt="" />
                                                                                上傳圖片
                                                                            </div>:
                                                                            <div className={styles.imgValue}>
                                                                                <img className={styles.img} src={box.imgUrl} alt="" />
                                                                            </div>
                                                                            
                                                                        }
                                                                        <img className={styles.editPen} src={pen} alt="pen" />
                                                                    </div> 
                                                        
                                                                    <div className={styles.picEdit} 
                                                                        style={{display: isEdit === index ? "flex" : "none"}}
                                                                        onClick={(e) => e.stopPropagation()} >
                                                                            
                                                                            
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
                                                                                    <div className={styles.noImage}>
                                                                                        {/* 上傳圖片 */}
                                                                                    </div>
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
                                                                                    <span>
                                                                                        <img src={imageWhite} alt="" className={styles.addImage} />
                                                                                        {/* 上傳 */}
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                            
                                                                            <div className={styles.saveButton}  onClick={() => handleStorageImgEdit(box, value)}>
                                                                                {/* 儲存 */}
                                                                                <img src={check} alt="" className={styles.checkIcon} />
                                                                            </div>
                                                                            <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                                                {/* 取消 */}
                                                                                <img src={closeWhite} alt="" className={styles.cancelIcon} />
                                                                            </div>
                                                        
                                                                        </div>
                                                                    </div>

                                                        
                                                                    <div className={styles.displayToggleAndTrash}>
                                                                        {
                                                                            box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={() => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        {
                                                                            !box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={() => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        
                                                                        <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteCheck(box, index)} />
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
                                                                    <img className={styles.drag} src={drag} alt="drag"  {...provided.dragHandleProps} />

                                                                    <div className={styles.lineBoxInner}>
                                                                        <div className={styles.line} style={{color: color.logeColor}}></div>
                                                                    </div>

                                                                    <div className={styles.displayToggleAndTrash}>
                                                                        {
                                                                            box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleOpen} alt="toggle" onClick={() => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        {
                                                                            !box.display && (
                                                                                <img className={styles.displayToggleButton} src={toggleClose} alt="toggle" onClick={() => displayToggle(box, value)} />
                                                                            )
                                                                        }
                                                                        
                                                                        <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteCheck(box, index)} />
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