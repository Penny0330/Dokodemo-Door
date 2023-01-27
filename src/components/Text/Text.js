//Component
import pen from "../../images/pen.svg";
import toggle from "../../images/toggle.svg";
import trash from "../../images/trash.svg";

// Style
import styles from "./Text.module.css";

function Text ({edit, 
                storageEdit, 
                cancelEdit, 
                deleteButton, 
                value, 
                isEdit, 
                newValue, 
                setNewValue}){

    return(
        <div className={styles.allText}>
            { 
                value.map((box, index) => {
                    return(
                        <div className={styles.textBox} key={index}>
                    
                            <div className={styles.textValueAndEditPen} onClick={() => edit(index, box)} 
                                style={{display: isEdit === index ? "none" : "flex"}}
                            >
                                { box.value == "" ?
                                    <div className={styles.textValue}>編輯</div>:
                                    <div className={styles.textValue}>{box.value}</div>
                                }

                                <img className={styles.editPen} src={pen} alt="pen"/>
                            </div>

                            <div className={styles.edit} style={{display: isEdit === index ? "flex" : "none"}}>
                                <input type="text" value={newValue} onChange={e => setNewValue(e.target.value)} />
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
                    
                })
            } 
        </div> 
    )
        
}

export default Text