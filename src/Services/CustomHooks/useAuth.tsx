import { message } from "antd"
import { auth, provider } from "../Firebase/FirebaseCfg"
import { signInWithPopup } from "firebase/auth"
import { useContext } from "react"
import { Data } from "../../Layout/Layout"
import { IContext } from "../../Model/Others"
import { IUser } from "../../Model/Users"
import { useUsers } from "./useUsers"
import { useLoading } from "./UseLoading"
import { extractMssvFromEmail } from "../Functions/StringValidation";
import { useNavigate } from "react-router-dom"
import { useSessionStorage } from "./useSesstionStorage"
import { GlobalConstants } from "../../Share/Constants"

export const useAuth = () => {
    const { updateLoading } = useLoading();
    const { removeAllFromSessionStorage } = useSessionStorage();
    const { getUserById, updateUser, addUserToBrowserAndState, getUserByIdRealtime, checkCsgMemberByMssv } = useUsers();
    const navigate = useNavigate();

    const handleSigninWithGG = async () => {
        updateLoading(true, 'Đang đăng nhập...');

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
        // .finally(() => {
        //     updateLoading(false)
        // })

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
            let isCsgMember = false;
            const extractedEmail = extractMssvFromEmail(googleUser.email);

            if (extractedEmail) {
                isCsgMember = await checkCsgMemberByMssv(extractedEmail[0]);
            }

            const currUser: IUser = {
                id: currUserId,
                name: googleUser.displayName,
                email: googleUser.email,
                mssv: extractedEmail ? extractedEmail[0] : null,
                permissions: [],
                imgUrl: googleUser.photoURL,
                points: 0,
                joinDate: `${new Date().toLocaleString()}`,
                minigame: {
                    game1: false,
                    game2: false,
                    game3: false
                },
                isCsgMember: isCsgMember,
            }

            const updateStatus = await updateUser(currUser);

            if (updateStatus) {
                message.success(`Chào mừng ${currUser.name} gia nhập ECO`);
                getUserByIdRealtime(currUser.id);
            } else {
                message.error('Đã có lỗi xảy ra, vui lòng tải lại trang');
            }
        }

        updateLoading(false, 'Đang đăng nhập...');
    }


    const handleLogout = () => {
        addUserToBrowserAndState(null);
        removeAllFromSessionStorage();

        message.success('Đã đăng xuất');

        navigate('/');
    }

    return { handleSigninWithGG, handleLogout }
}