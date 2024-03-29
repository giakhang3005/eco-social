import { message } from "antd"
import { usersCollectionRef, firestoreDB } from "../Firebase/FirebaseCfg"
import { getDocs, setDoc, doc, getDoc } from "firebase/firestore"
import { IUser } from "../../Model/Users"

export const useUsers = () => {

    const getAllUsers = () => {
        const users = getDocs(usersCollectionRef)
            .then((snapshot) => {
                const allUsers: any[] = []

                snapshot.docs.forEach(doc => {
                    allUsers.push({ ...doc.data(), id: doc.id })
                })

                return allUsers
            })
            .catch((err) => {
                message.error("Đã có lỗi xảy ra, vui lòng tải lại trang")
            })

        return users;
    }

    const getUserById = (id: string) => {

        const docRef = doc(usersCollectionRef, id)
        const user = getDoc(docRef)
            .then(doc => {
                const docData = doc.data()
                return (
                    docData
                        ? {
                            ...docData,
                            id: doc.id,
                        }
                        : undefined
                )

            })
            .catch(err => console.log(err))

        return user;
    }

    // If user not exist, create -> use to custom UID
    const updateUser = async (userData: IUser) => {
        const user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            mssv: userData.mssv,
            permission: userData.permissions,
            imgURL: userData.imgUrl,
            points: userData.points,
            joinDate: userData.joinDate,
        }

        const docRef = doc(usersCollectionRef, user.id)
        const updateStatus = setDoc(docRef, user)
            .then((res) => {
                return true;
            })
            .catch(err => {
                console.log(err)
                return false;
            })

        return updateStatus;
    }

    return { getAllUsers, updateUser, getUserById }
}