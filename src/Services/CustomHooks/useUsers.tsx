import { message } from "antd"
import { usersCollectionRef, firestoreDB } from "../Firebase/FirebaseCfg"
import { getDocs, setDoc, doc, getDoc } from "firebase/firestore"
import { IUser } from "../../Model/Users"
import { useLocalStorage } from "./useLocalStorage"
import { GlobalConstants } from "../../Share/Constants"
import { Data } from "../../Layout/Layout"
import { useContext } from "react"
import { IContext } from "../../Model/Others"

export const useUsers = () => {
    const { setUser, user } = useContext(Data) as IContext
    const { setToLocalStorage, removeFromlocalStorage } = useLocalStorage();

    const getCurrentUser = () => {
        return user;
    }

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

    const getUserById = (id: string): Promise<IUser | null | void> => {

        const docRef = doc(usersCollectionRef, id)

        const user = getDoc(docRef)
            .then(doc => {
                const docData = doc.data()
                console.log(docData)
                return (
                    docData
                        ? {
                            name: docData?.name,
                            email: docData?.email,
                            mssv: docData?.mssv,
                            permissions: docData?.permission,
                            imgUrl: docData?.imgURL,
                            points: docData?.points,
                            joinDate: docData?.joinDate,
                            id: doc.id,
                        }
                        : null
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

    const addUserToBrowserAndState = (user: IUser | null) => {
        const userLocalKey = GlobalConstants.localStorageKeys.user
        setUser(user)
        user ? setToLocalStorage(userLocalKey, user) : removeFromlocalStorage(userLocalKey)
    }

    return { getAllUsers, updateUser, getUserById, addUserToBrowserAndState, getCurrentUser }
}