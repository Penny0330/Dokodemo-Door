import { useState, useEffect } from 'react';

import { auth, db, storage } from '../utils/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';

export const useEditBox = () => {
    const [newValue, setNewValue] = useState('');
    const [newLinkUrl, setNewLinkUrl] = useState('');
    const [newImgUrl, setNewImgUrl] = useState([]);
    const [imgFile, setImgFile] = useState('');
    const [isEdit, setIsEdit] = useState('');
    const [deletePopup, setDeletePopup] = useState(false);
    const [deleteData, setDeleteData] = useState('');

    useEffect(() => {
        document.addEventListener('click', () => {
            setIsEdit('');
        });

        return () => {
            document.removeEventListener('click', () => {
                setIsEdit('');
            });
        };
    }, []);

    const handleEdit = (e, box, index) => {
        e.stopPropagation();
        setNewValue(box.title);
        setNewLinkUrl(box.url);
        setNewImgUrl(box.imgUrl);
        setIsEdit((prev) => {
            return prev === index ? '' : index;
        });
    };

    const handleStorageEdit = async (box, value) => {
        box.title = newValue;
        box.title ? (box.display = true) : (box.display = false);
        const _items = [...value];

        await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
        setNewValue('');
        setIsEdit('');
    };

    const handleStorageLinkEdit = async (box, value) => {
        box.title = newValue;
        box.url = newLinkUrl;
        box.title && box.url ? (box.display = true) : (box.display = false);
        const _items = [...value];

        await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
        setNewValue('');
        setNewLinkUrl('');
        setIsEdit('');
    };

    const handleUploadImgEdit = (e) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImgFile(file);
        setNewImgUrl(imageURL);
    };

    const handleStorageImgEdit = async (box, value) => {
        // imgFile 為空就停止動作
        if (!imgFile) return;
        // 刪除原有的圖片檔案
        if (box.file) {
            const desertRef = ref(storage, box.file);
            await deleteObject(desertRef);
        }

        // 第1個參數 storage service，第2個參數 檔案儲存資料夾名稱 / 檔案名稱
        const randomNum = Math.random().toString(36).substring(7);
        const name = `post.images/${auth.currentUser.uid},${randomNum}`;
        const storageRef = ref(storage, name);
        // uploadBytesResumable 上傳檔案至 cloud storage
        await uploadBytesResumable(storageRef, imgFile);
        // getDownloadURL 取得網址
        const imgUrl = await getDownloadURL(storageRef);
        box.imgUrl = imgUrl;
        box.file = name;
        box.imgUrl ? (box.display = true) : (box.display = false);
        const _items = [...value];
        await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
        setIsEdit('');
    };

    const cancelEdit = () => {
        setIsEdit('');
        setNewValue('');
        setNewLinkUrl('');
        setNewImgUrl('');
        setImgFile('');
    };

    const displayToggle = async (box, value) => {
        if (box.type === 'text' && box.title === '') return;
        if ((box.type === 'link' && box.title === '') || box.url === '') return;
        if (box.type === 'pic' && box.imgUrl === '') return;

        box.display ? (box.display = false) : (box.display = true);
        const _items = [...value];

        await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
    };

    const deleteCheck = (box, index) => {
        setDeletePopup(true);
        setDeleteData([box, index]);
    };

    const deleteButton = async (value) => {
        if (deleteData[0].type === 'pic' && deleteData[0].file) {
            const desertRef = ref(storage, deleteData[0].file);

            deleteObject(desertRef)
                .then(() => {})
                .catch((error) => {
                    console.log(error);
                });
        }

        const _items = [...value];
        _items.splice(deleteData[1], 1);

        await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });

        setDeletePopup(false);
    };

    const onDragEnd = async (result, value) => {
        // source 被拖曳的物件 ； destination 拖曳後的位置
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        let _items = [...value];
        // 從 source.index 剪下被拖曳的元素
        const [remove] = _items.splice(source.index, 1);
        //在 destination.index 位置貼上被拖曳的元素
        _items.splice(destination.index, 0, remove);

        // 設定新的 value
        // setValue(newValue)
        await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
    };

    return {
        handleEdit,
        newValue,
        setNewValue,
        newLinkUrl,
        setNewLinkUrl,
        newImgUrl,
        setNewImgUrl,
        handleStorageEdit,
        handleStorageLinkEdit,
        handleUploadImgEdit,
        handleStorageImgEdit,
        displayToggle,
        deleteCheck,
        deletePopup,
        setDeletePopup,
        deleteButton,
        isEdit,
        setIsEdit,
        cancelEdit,
        onDragEnd
    };
};
