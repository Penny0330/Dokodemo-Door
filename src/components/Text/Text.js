//Component
import toggle from "../../images/toggle.svg";
import trash from "../../images/trash.svg";
import pen from "../../images/pen.png";

// Style
import styles from "./Text.module.css";

function Text ({edit, 
                storageEdit, 
                cancelEdit, 
                deleteButton, 
                value, 
                isEdit, 
                newValue, 
                setNewValue, 
                newUrl, 
                setNewUrl,
                storageLinkEdit}){


    return(
        <div className={styles.allText}>
            { 
                value.map((box, index) => {
                    return(
                        <>
                            {
                                box.type !== "link" && (
                                    <div className={styles.textBox} key={index}>
                                        <div className={styles.textValueAndEditPen} 
                                                onClick={() => edit(index, box)} 
                                                style={{display: isEdit === index ? "none" : "flex"}}>
                                            { box.value == "" ?
                                                <div className={styles.textValue}>編輯文字</div>:
                                                <div className={styles.textValue}>{box.value}</div>
                                            }

                                            <img className={styles.editPen} src={pen} alt="pen"/>
                                        </div>

                                        <div className={styles.edit} style={{display: isEdit === index ? "flex" : "none"}}>
                                            <input className={styles.textInput} type="text" value={newValue} onChange={e => setNewValue(e.target.value)} />
                                            <div className={styles.editButton}>
                                                <div className={styles.saveButton}  onClick={() => storageEdit(box)}>儲存</div>
                                                <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                    取消
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.displayToggleAndTrash}>
                                            <img className={styles.displayToggleButton} src={toggle} alt="toggle" />
                                            <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(box)} />
                                        </div>
                                    </div>
                                )
                            }

                            {
                                box.type === "link" && (
                                    <div className={styles.linkBox} key={index}>

                                        <div className={styles.textValueAndEditPen} 
                                            onClick={() => edit(index, box)} 
                                            style={{display: isEdit === index ? "none" : "flex"}}>
                                            { box.value == "" ?
                                                <div className={styles.textValue}>編輯連結</div>:
                                                <div className={styles.textValue}>{box.value}</div>
                                            }

                                            <img className={styles.editPen} src={pen} alt="pen"/>
                                        </div>

                                        <div className={styles.linkEdit} style={{display: isEdit === index ? "flex" : "none"}}>
                                            {/* <div className={styles.titleAndLinkInput}> */}
                                                <input className={styles.titleInput} type="text" placeholder="按鈕文字" value={newValue} onChange={e => setNewValue(e.target.value)} />
                                                <input className={styles.linkInput} type="text" placeholder="連結網址" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
                                            {/* </div> */}
                                            
                                            <div className={styles.editButton}>
                                                <div className={styles.saveButton}  onClick={() => storageLinkEdit(box)}>儲存</div>
                                                <div className={styles.cancelButton}  onClick={() => cancelEdit(box)}>
                                                    取消
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.displayToggleAndTrash}>
                                            <img className={styles.displayToggleButton} src={toggle} alt="toggle" />
                                            <img className={styles.trashButton} src={trash} alt="trash" onClick={() => deleteButton(box)} />
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