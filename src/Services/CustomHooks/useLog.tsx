import { IGameLog, IPointsLog, IPostApproveLog } from "../../Model/Logs"
import { IUser } from "../../Model/Users"
import { addDoc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import { approvalLogCollectionRef, gameLogCollectionRef, pointsLogCollectionRef } from "../Firebase/FirebaseCfg"

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
                    logs.push({ ...data, executeTime: new Date(Number(data.executeTime)).toLocaleString() })
                })

                return logs;
            })

        return signal;
    }

    const savePostLog = async (postId: string, user: IUser, status: 1 | 2) => {
        const approveTime = new Date().getTime().toString();

        const postApproveLog: IPostApproveLog = {
            postId,
            approver: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            approveTime,
            status: status,
        }

        const addSignal = await addDoc(approvalLogCollectionRef, postApproveLog)
            .then((res) => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            })

        return addSignal;
    }

    const getApprovalLog = () => {
        const signal = getDocs(query(approvalLogCollectionRef, orderBy("approveTime", "desc")))
            .then((snapshot) => {
                const logs: any[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    logs.push({ ...data, executeTime: new Date(Number(data.executeTime)).toLocaleString() })
                })

                return logs;
            })

        return signal;
    }

    const saveGameStatusLog = async (gameLog: IGameLog) => {
        const addSignal = await addDoc(gameLogCollectionRef, gameLog)
            .then((res) => {
                return true;
            })
            .catch((err) => {
                throw new Error(err);
            })

        return addSignal;
    }

    const getGameLog = () => {
        const signal = getDocs(query(gameLogCollectionRef, orderBy("time", "desc")))
            .then((snapshot) => {
                const logs: any[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    logs.push(data)
                })

                return logs;
            })

        return signal;
    }

    return { LoggedPoints, getPointsLog, savePostLog, getApprovalLog, saveGameStatusLog, getGameLog }
}