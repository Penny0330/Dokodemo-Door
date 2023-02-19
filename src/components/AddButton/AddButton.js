// style
import styles from "./AddButton.module.css";

// hook
import { useGetBox } from "../../hooks/useGetBox";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAddBox } from "../../hooks/useAddBox";

// component
import title from "../../images/add_title.svg";
import link from "../../images/add_link.svg";
import image from "../../images/add_image.svg";
import line from "../../images/add_line.svg";

function AddButton() {
  const { user } = useAuthContext();
  const { value } = useGetBox(user);
  const {
    open,
    handleClick,
    handleChange,
    addTextBox,
    addLinkBox,
    addImgBox,
    addLineBox,
  } = useAddBox(value);

  return (
    <div className={styles.addButton} onClick={(e) => e.stopPropagation()}>
      <input
        type="checkbox"
        id={styles.menu}
        onChange={(e) => handleChange(e)}
      />
      <label
        htmlFor={styles.menu}
        className={styles.clickTitle}
        onClick={(e) => handleClick(e)}
        style={{ borderRadius: open ? "10px 10px 0 0" : "40px" }}
      >
        <div>新增區塊</div>
        <div>+</div>
      </label>

      <div
        className={styles.buttons}
        onClick={(e) => e.stopPropagation()}
        style={{
          height: open ? "auto" : "0px",
          padding: open ? "15px 0 15px" : "0px",
          borderRadius: open ? "0 0 50px 50px" : "50px"
        }}
      >
        <button className={styles.addTextButton} onClick={addTextBox}>
          <img src={title} alt="" className={styles.icon} />
          標題文字
        </button>
        <button className={styles.addLinkButton} onClick={addLinkBox}>
          <img src={link} alt="" className={styles.icon} />
          連結按鈕
        </button>
        <button className={styles.addImgButton} onClick={addImgBox}>
          <img src={image} alt="" className={styles.icon} />
          圖片看板
        </button>
        <button className={styles.addLineButton} onClick={addLineBox}>
          <img src={line} alt="" className={styles.icon} />
          分隔線
        </button>
      </div>
    </div>
  );
}

export default AddButton;
