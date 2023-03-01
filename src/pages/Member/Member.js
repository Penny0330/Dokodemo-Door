import { useState, useEffect } from 'react';

//Component
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import loading from '../../images/loading.gif';
import Preview from '../../components/Preview/Preview';
import PreviewMobile from '../../components/PreviewMobile/PreviewMobile';
import smartphone from '../../images/smartphone.png';
import member from '../../images/member.png';
import drag from '../../images/drag.png';
import trash from '../../images/trash.svg';
import pin from '../../images/pin.svg';

// hooks
import { useMember } from '../../hooks/useMember';
import { useGetBox } from '../../hooks/useGetBox';
import { useAuthContext } from '../../hooks/useAuthContext';

// Style
import styles from './Member.module.css';

// firebase
import { auth, db } from '../../utils/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

// DnD
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

function Member() {
    const { user } = useAuthContext();
    const { profile, value, color } = useGetBox(user);
    const [openShow, setOpenShow] = useState(false);
    const [account, setAccount] = useState('');
    const [newAccount, setNewAccount] = useState('');
    const [newIntro, setNewIntro] = useState('');
    const [iconLink, setIconLink] = useState([]);

    const {
        uploadPhoto,
        newImgUrl,
        setNewImgUrl,
        storageProfile,
        pending,
        allIcons,
        addIcon,
        updateData,
        deleteCheck,
        deleteButton,
        onDragEnd,
        deletePopup,
        setDeletePopup,
        openIconList,
        setOpenIconList
    } = useMember(iconLink);

    const noPhotoText = account.slice(0, 1).toUpperCase();

    useEffect(() => {
        const ref = doc(db, 'itemList', auth.currentUser.uid);
        const unsub = onSnapshot(ref, (doc) => {
            setNewImgUrl(doc.data().profile.photo);
            setNewAccount(doc.data().profile.account);
            setAccount(doc.data().profile.account);
            setNewIntro(doc.data().profile.introduction);
            setIconLink(doc.data().iconLink);
        });
        return () => {
            unsub();
        };
    }, []);

    const handleOpenShow = () => {
        setOpenShow(!openShow);
    };

    return (
        <div className="wrapper">
            <Navbar />

            {deletePopup && (
                <div className={styles.popup}>
                    <div className={styles.popupBox}>
                        <p className={styles.alter}>注意</p>
                        <p className={styles.popupTitle}>確認刪除區塊？</p>
                        <button
                            className={styles.cancelDeleteButton}
                            onClick={() => setDeletePopup(!deletePopup)}>
                            取消
                        </button>
                        <button className={styles.deleteButton} onClick={() => deleteButton()}>
                            確認
                        </button>
                    </div>
                </div>
            )}

            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.profile}>
                            <img src={member} alt="member" className={styles.memberIcon} />
                            <div className={styles.memberTitle}>個人簡介</div>
                            <div className={styles.profilePhoto}>
                                {newImgUrl && (
                                    <img src={newImgUrl} alt="" className={styles.photo} />
                                )}
                                {!newImgUrl && <div className={styles.noPhoto}>{noPhotoText}</div>}
                                <div className={styles.photoEditButton}>
                                    <input
                                        type="file"
                                        id="file-input"
                                        accept="image/*"
                                        className={styles.fileInput}
                                        onChange={(e) => uploadPhoto(e)}
                                    />
                                    <label className={styles.fileLabel} htmlFor="file-input">
                                        <span>編輯</span>
                                    </label>
                                </div>
                            </div>
                            <form className={styles.profileAccount_Introduction}>
                                <label htmlFor="account" className={styles.memberLabel}>
                                    帳號
                                </label>
                                <input
                                    type="text"
                                    id="account"
                                    className={styles.accountInput}
                                    value={newAccount}
                                    onChange={(e) => setNewAccount(e.target.value)}
                                />
                                <label htmlFor="introduction" className={styles.memberLabel}>
                                    個人簡介
                                </label>
                                <textarea
                                    cols="30"
                                    rows="5"
                                    id="introduction"
                                    className={styles.introductionTextarea}
                                    value={newIntro}
                                    onChange={(e) => setNewIntro(e.target.value)}></textarea>
                            </form>

                            <div className={styles.store}>
                                {!pending && (
                                    <button
                                        className={styles.storeButton}
                                        onClick={() => storageProfile(newAccount, newIntro)}>
                                        儲存
                                    </button>
                                )}
                                {pending && (
                                    <button className={styles.loadingButton}>
                                        <img src={loading} alt="" className={styles.loading} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={styles.socialIcons}>
                            <img src={pin} alt="pin" className={styles.memberIcon} />
                            <div className={styles.socialIconsTitle}>社群連結</div>

                            <DragDropContext onDragEnd={(e) => onDragEnd(e, value)}>
                                <Droppable droppableId="drop-id">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <div className={styles.iconLinkList}>
                                                {iconLink.map((icon, index) => {
                                                    return (
                                                        <Draggable
                                                            draggableId={index.toString()}
                                                            index={index}
                                                            key={index}>
                                                            {(provided) => (
                                                                <div
                                                                    {...provided.draggableProps}
                                                                    ref={provided.innerRef}>
                                                                    <div
                                                                        className={styles.iconLinks}>
                                                                        <div className={styles.dragAndTrash}>
                                                                        <img
                                                                            src={drag}
                                                                            alt="drag"
                                                                            className={styles.drag}
                                                                            {...provided.dragHandleProps}/>
                                                                        <button className={styles.deleteCheckButton}>
                                                                            <img src={trash} alt="trash" className={styles.deleteButtonIcon} onClick={() => deleteCheck(index)} />
                                                                        </button>
                                                                    </div>

                                                                    <div className={styles.iconAndLink}>
                                                                        {allIcons[icon.iconIndex]}
                                                                        <input type="text" placeholder="請輸入信箱/網址" value={iconLink[index].link} onChange={(e) => updateData(e, icon.iconIndex, index)}/>
                                                                    </div>
                                                                    
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </Draggable>
                                                    ) 
                                                })
                                            }
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                    </DragDropContext>
                    {
                        !openIconList && (
                            <div className={styles.addIcons}  onClick={() => setOpenIconList(!openIconList)}>+</div>
                        )
                    }
                    {
                        openIconList && (
                            <>
                                <div className={styles.selectIcons}>
                                    <ul>
                                        {
                                            allIcons.map((icon, index) => {
                                                return(
                                                    <li key={index} onClick={() => addIcon(index)}>
                                                        <button className={styles.iconButton}>
                                                            {icon}
                                                        </button>
                                                    </li>
                                                )
                                            })
                                        }
                                        
                                    </ul>
                                </div>
                                <div className={styles.addIcons_open}  onClick={() => setOpenIconList(!openIconList)}>×</div>
                            </>
                        )
                    }
                </div>
            </div>

            <div className={styles.right}>

                <Preview
                    value={value}
                    color={color}
                    profile={profile}
                    noPhotoText={noPhotoText}
                    pending={pending}
                    iconLink={iconLink}/>
            </div>

            {openShow ? (   
                <PreviewMobile profile={profile} noPhotoText={noPhotoText} value={value} openShow={openShow} handleOpenShow={handleOpenShow} color={color} iconLink={iconLink} /> ) :
                <div className={styles.preview} onClick={handleOpenShow}>
                    <img className={styles.smartphone} src={smartphone} alt="smartphone" />
                </div>
            }
            </div>
            </main>
            <Footer />
        </div>
    );
}

export default Member;
