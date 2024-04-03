import { message } from "antd"
import { usersCollectionRef } from "../Firebase/FirebaseCfg"
import { getDocs, setDoc, doc, getDoc, query, where, onSnapshot } from "firebase/firestore"
import { IUser } from "../../Model/Users"
import { useLocalStorage } from "./useLocalStorage"
import { GlobalConstants } from "../../Share/Constants"
import { Data } from "../../Layout/Layout"
import { useContext } from "react"
import { IContext } from "../../Model/Others"
import { useLoading } from "./UseLoading"

export const useUsers = () => {
    const { setUser, user } = useContext(Data) as IContext
    const { updateLoading } = useLoading();
    const { setToLocalStorage, removeFromlocalStorage, getFromLocalStorage } = useLocalStorage();

    const getCurrentUser = () => {
        return user;
    }

    const initUserWhenRefresh = () => {
        const userLocalKey = GlobalConstants.localStorageKeys.user
        const localUser = getFromLocalStorage(userLocalKey)
        if (localUser) {
            getUserByIdRealtime(localUser.id);
        }
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
                // console.log(docData)
                return (
                    docData
                        ? {
                            name: docData?.name,
                            email: docData?.email,
                            mssv: docData?.mssv,
                            permissions: docData?.permissions,
                            imgUrl: docData?.imgUrl,
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

    const getUserByIdRealtime = (id: string) => {
        const queryColRef = query(usersCollectionRef, where("id", "==", id))

        onSnapshot(queryColRef, (snapshot): any => {
            snapshot.forEach((user) => {
                const fetchedUser = user.data()
                if (fetchedUser.id === id) {
                    const currUser = {
                        name: fetchedUser.name,
                        email: fetchedUser.email,
                        mssv: fetchedUser.mssv,
                        permissions: fetchedUser.permissions,
                        imgUrl: fetchedUser.imgUrl,
                        points: fetchedUser.points,
                        joinDate: fetchedUser.joinDate,
                        id: user.id

                    }
                    addUserToBrowserAndState(currUser)
                }
            })

        },
            (err) => {
                message.error("Mất kết nối, vui lòng kiểm tra đường truyền");
                console.log(err);
            }
        )


    }

    // Update realtime
    const getUserByEmailRealtime = async (email: string, setTargetUser: any) => {
        updateLoading(true, 'Đang tìm kiếm...')

        const queryColRef = query(usersCollectionRef, where("email", "==", email))
        const snapshotListener = await onSnapshot(queryColRef, (snapshot) => {
            setTargetUser(undefined)
            snapshot.forEach((user) => {
                setTargetUser(user.data())
            })
        })

        updateLoading(false)

        //unsubscribe
        const unsubTimeout = setTimeout(() => {
            snapshotListener();

            clearTimeout(unsubTimeout);
        }, 2000)
    }

    // If user not exist, create -> use to custom UID
    const updateUser = async (userData: IUser) => {
        updateLoading(true, 'Đang câp nhật...')

        const user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            mssv: userData.mssv,
            permissions: userData.permissions,
            imgUrl: userData.imgUrl,
            points: userData.points,
            joinDate: userData.joinDate,
        }

        const docRef = doc(usersCollectionRef, user.id)
        const updateStatus = await setDoc(docRef, user)
            .then((res) => {
                return true;
            })
            .catch(err => {
                console.log(err)
                return false;
            })
            .finally(() => {
                updateLoading(false)
            })

        return updateStatus;
    }

    const addUserToBrowserAndState = (user: IUser | null) => {
        const userLocalKey = GlobalConstants.localStorageKeys.user
        setUser(user)
        user ? setToLocalStorage(userLocalKey, user) : removeFromlocalStorage(userLocalKey)
    }

    return { getAllUsers, updateUser, getUserById, getUserByIdRealtime, addUserToBrowserAndState, getCurrentUser, getUserByEmailRealtime, initUserWhenRefresh }
}