import { message } from "antd"
import { auth, provider } from "../Firebase/FirebaseCfg"
import { signInWithPopup } from "firebase/auth"
import { useContext } from "react"
import { Data } from "../../Layout/Layout"
import { IContext } from "../../Model/Others"
import { IUser, User } from "../../Model/Users"
import { useUsers } from "./useUsers"
import { useLoading } from "./UseLoading"

export const useAuth = () => {
    const { updateLoading } = useLoading();
    const { getUserById, updateUser, addUserToBrowserAndState, getUserByIdRealtime } = useUsers()

    const handleSigninWithGG = async () => {
        updateLoading(true, 'Đang đăng nhập...')

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
                updateLoading(false)
            })

        if (!currUserId) return
        const dbUser: IUser | null | void = await getUserById(currUserId)


        if (dbUser) {
            // User existed
            if (dbUser) {
                // addUserToBrowserAndState(dbUser)
                getUserByIdRealtime(dbUser.id)
                message.success(`Xin chào ${dbUser.name}`)
            } else {
                message.error("Đã có lỗi xảy ra, vui lòng tải lại trang")
            }

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
                joinDate: `${new Date().toLocaleString()}`
            }

            const updateStatus = await updateUser(currUser)

            if (updateStatus) {
                message.success(`Chào mừng ${currUser.name} gia nhập ECO`)
                // addUserToBrowserAndState(currUser)
                getUserByIdRealtime(currUser.id)
            } else {
                message.error('Đã có lỗi xảy ra, vui lòng tải lại trang')
            }
        }
    }


    const handleLogout = () => {
        addUserToBrowserAndState(null);
        message.success('Đã đăng xuất');
    }

    return { handleSigninWithGG, handleLogout }
}