import { message } from "antd"
import { usersCollectionRef } from "../Firebase/FirebaseCfg"
import { getDocs, setDoc, doc, getDoc, query, where, onSnapshot, updateDoc, FieldPath } from "firebase/firestore"
import { IUser } from "../../Model/Users"
import { useLocalStorage } from "./useLocalStorage"
import { GlobalConstants } from "../../Share/Constants"
import { Data } from "../../Layout/Layout"
import { useContext } from "react"
import { IContext } from "../../Model/Others"
import { useLoading } from "./UseLoading"
import axios from "axios"

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
                            minigame: {
                                game1: docData?.minigame.game1,
                                game2: docData?.minigame.game2,
                                game3: docData?.minigame.game3
                            },
                            isCsgMember: docData?.isCsgMember,
                        }
                        : null
                )

            })
            .catch(err => console.log(err))

        return user;
    }

    const getUserByIdRealtime = (id: string) => {
        const queryColRef = query(usersCollectionRef, where("id", "==", id));

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
                        id: user.id,
                        minigame: {
                            game1: fetchedUser?.minigame.game1,
                            game2: fetchedUser?.minigame.game2,
                            game3: fetchedUser?.minigame.game3
                        },
                        isCsgMember: fetchedUser?.isCsgMember,
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

    const getUserByEmail = (email: string): Promise<IUser[] | undefined> => {
        const queryColRef = query(usersCollectionRef, where("email", "==", email))

        const user = getDocs(queryColRef)
            .then((snapshot) => {
                const userArr: IUser[] = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    const newUser = {
                        name: data.name,
                        email: data.email,
                        mssv: data.mssv,
                        permissions: data.permissions,
                        imgUrl: data.imgUrl,
                        points: data.points,
                        joinDate: data.joinDate,
                        id: doc.id,
                        minigame: {
                            game1: data?.minigame.game1,
                            game2: data?.minigame.game2,
                            game3: data?.minigame.game3
                        },
                        isCsgMember: data?.isCsgMember,
                    }
                    userArr.push(newUser)
                })

                return userArr;
            })
            .catch((err) => {
                console.log(err)
                return undefined;
            })

        return user;
    }

    // If user not exist, create -> use to custom UID
    const updateUser = async (userData: IUser) => {
        updateLoading(true, 'Đang cập nhật...')

        const user: IUser = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            mssv: userData.mssv,
            permissions: userData.permissions,
            imgUrl: userData.imgUrl,
            points: userData.points,
            joinDate: userData.joinDate,
            minigame: {
                game1: userData.minigame.game1,
                game2: userData.minigame.game2,
                game3: userData.minigame.game3
            },
            isCsgMember: userData.isCsgMember,
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

    const getUserThatHavePermission = () => {
        const queryColRef = query(usersCollectionRef, where("permissions", "!=", []));

        const user = getDocs(queryColRef)
            .then((snapshot) => {
                const userArr: IUser[] = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    const newUser = {
                        name: data.name,
                        email: data.email,
                        mssv: data.mssv,
                        permissions: data.permissions,
                        imgUrl: data.imgUrl,
                        points: data.points,
                        joinDate: data.joinDate,
                        id: doc.id,
                        minigame: {
                            game1: data?.minigame.game1,
                            game2: data?.minigame.game2,
                            game3: data?.minigame.game3
                        },
                        isCsgMember: data?.isCsgMember,
                    }
                    userArr.push(newUser)
                })

                return userArr;
            })
            .catch((err) => {
                console.log(err)
                return undefined;
            })

        return user;
    }

    const updateSomePropsOfUser = (userId: string, changedObject: any) => {
        const docRef = doc(usersCollectionRef, userId);

        return updateDoc(docRef, changedObject, { merge: true })
            .then(() => {
                message.success('Cập nhật thành công');
                console.log("Updated")
            })
            .catch(err => {
                message.error('Cập nhật thất bại');
                console.log(err);
            })
    }

    const checkCsgMemberByMssv = (mssv: string) => {
        const isCsgMember = axios.get(`https://sheetdb.io/api/v1/1i210nhyiyfak/search?MSSV=${mssv}`)
            .then((res) => {
                const user = res.data[0];
                // console.log(user);
                return user.MSSV.toUpperCase() === mssv.toUpperCase();
            })
            .catch((err) => {
                console.log(err);
                message.error('Đã có lỗi xảy ra, vui lòng thử lại sau');
                return false;
            })

        return isCsgMember;
    }

    const getCsgMember = () => {
        const queryColRef = query(usersCollectionRef, where("isCsgMember", "==", true));

        const csgMembersList = getDocs(queryColRef)
            .then((data) => {
                const csgMembers: IUser[] = []
                data.forEach(doc => {
                    const user = doc.data()
                    const newUser = {
                        name: user.name,
                        email: user.email,
                        mssv: user.mssv,
                        permissions: user.permissions,
                        imgUrl: user.imgUrl,
                        points: user.points,
                        joinDate: user.joinDate,
                        id: doc.id,
                        minigame: {
                            game1: user?.minigame.game1,
                            game2: user?.minigame.game2,
                            game3: user?.minigame.game3
                        },
                        isCsgMember: user?.isCsgMember,
                    }
                    csgMembers.push(newUser)
                })
                return csgMembers;
            })
            .catch((err) => {
                console.log(err);
                message.error('Đã có lỗi xảy ra, vui lòng thử lại sau');
            });

        return csgMembersList;
    }

    return { getCsgMember, checkCsgMemberByMssv, updateSomePropsOfUser, getUserThatHavePermission, getUserByEmail, getAllUsers, updateUser, getUserById, getUserByIdRealtime, addUserToBrowserAndState, getCurrentUser, getUserByEmailRealtime, initUserWhenRefresh }
}