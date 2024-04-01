import { IPointsLog } from "../../Model/Logs"
import { IUser } from "../../Model/Users"
import { addDoc, getDoc, getDocs } from "firebase/firestore"
import { pointsLogCollectionRef } from "../Firebase/FirebaseCfg"

export const useLog = () => {
    const LoggedPoints = async (executedUser: IUser, change: string, note: string, targetUser: IUser) => {
        const currLog: IPointsLog = {
            executedUser: {
                id: executedUser.id,
                name: executedUser.name,
                email: executedUser.email
            },
            change: change,
            note: note,
            targetUser: {
                id: targetUser.id,
                name: targetUser.name,
                email: targetUser.email,
            },
            executeTime: new Date().toLocaleString()
        }

        const addSignal = await addDoc(pointsLogCollectionRef, currLog)
            .then((res) => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            })

        return addSignal;
    }

    const getPointsLog = () => {
        const signal = getDocs(pointsLogCollectionRef)
            .then((snapshot) => {
                const logs: any[] = [];
                snapshot.forEach((doc) => {
                    logs.push(doc.data())
                })

                return logs;
            })

        return signal;
    }

    return { LoggedPoints, getPointsLog }
}