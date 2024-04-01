import { IUser } from "../../Model/Users";
import { GlobalConstants } from "../../Share/Constants";
import { useUsers } from "./useUsers"

export const usePermissions = () => {
    const { getCurrentUser, getUserById, addUserToBrowserAndState } = useUsers();

    const validateUserHavePermission = async (permKey: string) => {
        const currentUser = getCurrentUser();
        
        if (!currentUser) return 0;

        const validatedUser = await getUserById(currentUser.id);

        
        if(!validatedUser) return 0;

        // Update users to browser and state
        addUserToBrowserAndState(validatedUser)

        // check permissions
        return validatedUser.permissions.includes(permKey);
    }

    const handleUpdatePoints = async (changeAmount: number, targetUser: IUser) => {
        const pointsKey = GlobalConstants.permissionsKey.points;
        const result = await validateUserHavePermission(pointsKey);

        // Todo: Implement update points
        console.log(result)
    }

    return { validateUserHavePermission, handleUpdatePoints }
}