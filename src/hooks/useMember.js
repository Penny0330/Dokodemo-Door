import { useState } from "react";

import { auth, db, storage } from "../utils/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";



export const useMember = () => {

    const [imgFile, setImgFile] = useState("");
    const [newImgUrl, setNewImgUrl] = useState("");
    const [pending, setPending] = useState(false);

    const uploadPhoto = (e) => {
        const file = e.target.files[0]
        const imageURL = URL.createObjectURL(file)
        setImgFile(file)
        setNewImgUrl(imageURL) 
    }

    const storageProfile = ( newAccount, newIntro) => {
        setPending(true)

        if (!imgFile){
            const newProfile = {
                account: newAccount,
                photo: newImgUrl,
                introduction: newIntro
            }
            updateDoc(doc(db, "itemList", auth.currentUser.uid), { "profile": newProfile })

            setTimeout(() => {
                setPending(false)
            }, 1000)

            return
        }

        // 第1個參數 storage service，第2個參數 檔案儲存資料夾名稱 / 檔案名稱
        const name = `post.images/${auth.currentUser.uid}`
        const storageRef = ref(storage, name);
        // uploadBytesResumable 上傳檔案至 cloud storage 
        const uploadTask = uploadBytesResumable(storageRef, imgFile);
        // on() 可監控整個上傳過程: 速度、失敗訊息、取得成功後檔案url
        uploadTask.on("state_changed",
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const newProfile = {
                        account: newAccount,
                        photo: downloadURL,
                        introduction: newIntro
                    }

                    console.log(newProfile)
            
                    updateDoc(doc(db, "itemList", auth.currentUser.uid), { "profile": newProfile })
            
                    setTimeout(() => {
                        setPending(false)
                    }, 1000)
                })
            }
        )
    }

    return { uploadPhoto, newImgUrl, setNewImgUrl, storageProfile, pending }
}