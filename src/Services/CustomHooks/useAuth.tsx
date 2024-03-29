import { message } from "antd"
import { auth, provider } from "../Firebase/FirebaseCfg"
import { signInWithPopup } from "firebase/auth"
import { useContext } from "react"
import { Data } from "../../Layout/Layout"
import { IContext } from "../../Model/Others"
import { IUser, User } from "../../Model/Users"
import { useUsers } from "./useUsers"

export const useAuth = () => {
    const { setLoading } = useContext(Data) as IContext
    const { getUserById, updateUser } = useUsers()

    const handleSigninWithGG = async () => {
        setLoading({ loading: true, tooltip: 'Đang đăng nhập...' })

        let googleUser: any
        let currUserId: string | undefined

        // Handle Login
        await signInWithPopup(auth, provider)
            .then(res => {
                const user = res.user
                if (!user) return

                googleUser = user
                currUserId = user.uid
            })
            .catch(err => {
                console.log(err)
                message.error(
                    err.code === "auth/popup-closed-by-user"
                        ? "Bạn đã huỷ quá trình đăng nhập"
                        : err.code === 'auth/user-disabled'
                            ? 'Tài khoản của bạn hiện đang bị khoá'
                            : 'Đã có lỗi xảy ra, vui lòng tải lại trang'
                )
            })
            .finally(() => {
                setLoading({ loading: false })
            })

            if(!currUserId) return
            const dbUser = await getUserById(currUserId)
            if(dbUser) {
                // User existed

            } else {
                // User is not existed
                const currUser: IUser = {
                    id: currUserId,
                    name: googleUser.displayName,
                    email: googleUser.email,
                    mssv: null,
                    permissions: [],
                    imgUrl: googleUser.photoURL,
                    points: 0,
                    joinDate: `${new Date().getTime()}`
                }

                const updateStatus = await updateUser(currUser)
                console.log(updateStatus)
            }
    }

    const addUserToBrowserAndState = (user: IUser) => {

    }


    const handleLogout = () => {
        // Todo: Implement clear local
    }

    return { handleSigninWithGG, handleLogout }
}