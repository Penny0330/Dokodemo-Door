import { useState } from "react";

import { auth, db, storage } from "../utils/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

export const useEditBox = () => {

    const [newValue, setNewValue] = useState("");
    const [newLinkUrl, setNewLinkUrl] = useState("");
    const [newImgUrl, setNewImgUrl] = useState("");
    const [imgFile, setImgFile] = useState("");
    const [popup, setPopup] = useState(false);

    const edit = (e, box) => {
        e.stopPropagation()
        setNewValue(box.title)
        setNewLinkUrl(box.url)
        setNewImgUrl(box.imgUrl)
    }

    const storageEdit = async (box, value) => {
        box.title = newValue
        box.title ? box.display = true : box.display = false
        const _items = [...value]

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
        setNewValue("")
        
    }

    const storageLinkEdit = async (box, value) => {
        box.title = newValue
        box.url = newLinkUrl
        box.title && box.url ? box.display = true : box.display = false
        const _items = [...value]

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
        setNewValue("")
        setNewLinkUrl("")
        
    }

    
    const uploadImgEdit = (e) => {
        const file = e.target.files[0]
        const imageURL = URL.createObjectURL(file)
        setImgFile(file)
        setNewImgUrl(imageURL) 
    }

    const storageImgEdit = async(box, value) => {

        // imgFile 為空就停止動作
        if (!imgFile) return;
        if(imgFile.size > 1000000){
            setPopup(true)
            return
        }

        // 第1個參數 storage service，第2個參數 檔案儲存資料夾名稱 / 檔案名稱
        const randomNum = Math.random().toString(36).substring(7)
        const name = `post.images/${auth.currentUser.uid},${randomNum}`
        const storageRef = ref(storage, name);
        // uploadBytesResumable 上傳檔案至 cloud storage 
        const uploadTask = uploadBytesResumable(storageRef, imgFile);
        // on() 可監控整個上傳過程: 速度、失敗訊息、取得成功後檔案url
        uploadTask.on("state_changed",
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    box.imgUrl = downloadURL
                    box.file = name
                    box.imgUrl ? box.display = true : box.display = false
                    const _items = [...value]
                    updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
                })
            }
        )
    }

    const displayToggle = async (box, value) => {
        if (box.type === "text" && box.title === "") {
            return
        }

        if (box.type === "link" && box.title === "" || box.url === "") {
            return
        }

        box.display ? box.display = false : box.display = true
        const _items = [...value]

        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
    }

    const deleteButton = async (box, index, value) => {
        if(box.type === "pic" && box.file){
            const desertRef = ref(storage, box.file);

            deleteObject(desertRef).then(() => {
              }).catch((error) => {
                console.log(error)
              });
        }

        const _items = [...value]
        _items.splice(index, 1)
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _items })
    }

    return {edit, newValue, setNewValue,  newLinkUrl, setNewLinkUrl, newImgUrl, setNewImgUrl, storageEdit, storageLinkEdit, uploadImgEdit, storageImgEdit, storageImgEdit, displayToggle, deleteButton, popup, setPopup}
}