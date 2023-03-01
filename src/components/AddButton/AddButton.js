// style
import styles from './AddButton.module.css';

// hook
import { useGetBox } from '../../hooks/useGetBox';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAddBox } from '../../hooks/useAddBox';

// component
import title from '../../images/add_title.svg';
import link from '../../images/add_link.svg';
import image from '../../images/add_image.svg';
import line from '../../images/add_line.svg';
import leaf from '../../images/leaf.png';

function AddButton() {
    const { user } = useAuthContext();
    const { value } = useGetBox(user);
    const { open, handleClick, handleChange, addTextBox, addLinkBox, addImgBox, addLineBox } = useAddBox(value);

    return (
        <div className={styles.addButton} onClick={(e) => e.stopPropagation()}>
            <img src={leaf} alt="leaf" className={styles.imgLeaf} />
            <input type="checkbox" id={styles.menu} onChange={(e) => handleChange(e)} />
            <label
                htmlFor={styles.menu}
                className={styles.clickTitle}
                onClick={(e) => handleClick(e)}
                style={{ borderRadius: open ? '10px 10px 0 0' : '40px' }}>
                <div>新增區塊</div>
                <div>+</div>
            </label>

            <div
                className={styles.buttons}
                onClick={(e) => e.stopPropagation()}
                style={{
                    height: open ? 'auto' : '0px',
                    padding: open ? '15px 10px 25px' : '0px 10px',
                    borderRadius: open ? '0 0 50px 50px' : '50px'
                }}>
                <button className={styles.addTextButton} onClick={addTextBox}>
                    <img src={title} alt="" className={styles.icon} />
                    <div className={styles.titleAndRemark}>
                        <div className={styles.title}>文字</div>
                        <div className={styles.remark}>文字標題/文字段落</div>
                    </div>
                </button>
                <button className={styles.addLinkButton} onClick={addLinkBox}>
                    <img src={link} alt="" className={styles.icon} />
                    <div className={styles.titleAndRemark}>
                        <div className={styles.title}>文字按鈕</div>
                        <div className={styles.remark}>純文字連結按鈕</div>
                    </div>
                </button>
                <button className={styles.addImgButton} onClick={addImgBox}>
                    <img src={image} alt="" className={styles.icon} />
                    <div className={styles.titleAndRemark}>
                        <div className={styles.title}>圖片看板</div>
                        <div className={styles.remark}>支援: jpg/png/gif</div>
                    </div>
                </button>
                <button className={styles.addLineButton} onClick={addLineBox}>
                    <img src={line} alt="" className={styles.icon} />
                    <div className={styles.titleAndRemark}>
                        <div className={styles.title}>分隔線</div>
                        <div className={styles.remark}>可分隔不同區塊的線段</div>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default AddButton;
