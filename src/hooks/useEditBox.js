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

        try {
            await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
        } catch (error) {
            console.log('error message', error);
        }
        setNewValue('');
        setIsEdit('');
    };

    const handleStorageLinkEdit = async (box, value) => {
        box.title = newValue;
        box.url = newLinkUrl;
        box.title && box.url ? (box.display = true) : (box.display = false);
        const _items = [...value];

        try {
            await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
        } catch (error) {
            console.log('error message', error);
        }
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
        if (!imgFile) return;
        if (box.file) {
            const desertRef = ref(storage, box.file);
            await deleteObject(desertRef);
        }

        const randomNum = Math.random().toString(36).substring(7);
        const name = `post.images/${auth.currentUser.uid},${randomNum}`;
        const storageRef = ref(storage, name);

        await uploadBytesResumable(storageRef, imgFile);

        const imgUrl = await getDownloadURL(storageRef);
        box.imgUrl = imgUrl;
        box.file = name;
        box.imgUrl ? (box.display = true) : (box.display = false);
        const _items = [...value];
        try {
            await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
        } catch (error) {
            console.log('error message', error);
        }
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

        try {
            await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
        } catch (error) {
            console.log('error message', error);
        }
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

        try {
            await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
        } catch (error) {
            console.log('error message', error);
        }

        setDeletePopup(false);
    };

    const onDragEnd = async (result, value) => {
        // source 被拖曳的物件 ； destination 拖曳後的位置
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        let _items = [...value];
        const [remove] = _items.splice(source.index, 1);
        _items.splice(destination.index, 0, remove);

        try {
            await updateDoc(doc(db, 'itemList', auth.currentUser.uid), { 'item': _items });
        } catch (error) {
            console.log('error message', error);
        }
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
