import { useState } from "react";

import { auth, db, storage } from "../utils/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const useMember = () => {

    const [imgFile, setImgFile] = useState("");
    const [newImgUrl, setNewImgUrl] = useState("");
    const [pending, setPending] = useState(false);

    const uploadPhoto = (e) => {
        const file = e.target.files[0];
        if(file){
            const imageURL = URL.createObjectURL(file);
            setImgFile(file);
            setNewImgUrl(imageURL);
        }
    }

    const storageProfile = async ( newAccount, newIntro ) => {

        try{
            setPending(true);

            if (!imgFile){
                const newProfile = {
                    account: newAccount,
                    photo: newImgUrl,
                    introduction: newIntro
                }
                await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "profile": newProfile });

                setTimeout(() => {
                    setPending(false);
                }, 1000)

                return
            }

            // 第1個參數 storage service，第2個參數 檔案儲存資料夾名稱 / 檔案名稱
            const name = `post.images/${auth.currentUser.uid}`;
            const storageRef = ref(storage, name);
            // uploadBytesResumable 上傳檔案至 cloud storage 
            await uploadBytesResumable(storageRef, imgFile);
            const imgUrl = await getDownloadURL(storageRef);
            const newProfile = {
                                account: newAccount,
                                photo: imgUrl,
                                introduction: newIntro
                            }
            await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "profile": newProfile });
            setTimeout(() => {
                setPending(false);
            }, 1000)
        }
        catch(error){
            console.log(error)
        }

    }

    return { uploadPhoto, newImgUrl, setNewImgUrl, storageProfile, pending }
}