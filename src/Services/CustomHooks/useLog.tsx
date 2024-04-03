import { IPointsLog } from "../../Model/Logs"
import { IUser } from "../../Model/Users"
import { addDoc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
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
            executeTime: `${new Date().getTime()}`,
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
        const signal = getDocs(query(pointsLogCollectionRef, orderBy("executeTime", "desc")))
            .then((snapshot) => {
                const logs: any[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    logs.push({...data, executeTime: new Date(Number(data.executeTime)).toLocaleString()})
                })

                return logs;
            })

        return signal;
    }

    return { LoggedPoints, getPointsLog }
}