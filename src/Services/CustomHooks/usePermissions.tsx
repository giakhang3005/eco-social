import { IUser } from "../../Model/Users";
import { GlobalConstants } from "../../Share/Constants";
import { useUsers } from "./useUsers"

export const usePermissions = () => {
    const { getCurrentUser, getUserById, addUserToBrowserAndState } = useUsers();

    const checkHavePerm = (perm: string): boolean => {
        const user = getCurrentUser();

        if (!user) return false

        return user.permissions.includes(perm)
    }

    const checkHaveAnyPerm = (): boolean => {
        const user = getCurrentUser();

        if(!user) return false

        if (user && user.permissions.length > 0) return true

        return false
    }


    return { checkHavePerm, checkHaveAnyPerm }
}