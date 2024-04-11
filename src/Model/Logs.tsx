interface IUserData {
    id: string;
    name: string;
    email: string
}
export interface IPointsLog {
    executedUser: IUserData;
    change: string;
    targetUser: IUserData;
    executeTime: string; //UTC
    note: string;
}

export interface IPostApproveLog {
    postId: string
    approver: IUserData;
    approveTime: string; //UTC
    status: 1 | 2;
}

export interface IGameLog {
    time: number;
    executer: IUserData;
    targetUser: IUserData;
    beforeChange: IGame;
    afterChange: IGame;
}

export interface IGame {
    game1: boolean;
    game2: boolean;
    game3: boolean
}


export class pointsLog implements IPointsLog {
    executedUser: IUserData
    change: string;
    targetUser: IUserData;
    executeTime: string;
    note: string;

    constructor(executedUser: IUserData, change: string, targetUser: IUserData, executeTime: string, note: string) {
        this.executedUser = executedUser;
        this.change = change;
        this.targetUser = targetUser;
        this.executeTime = executeTime;
        this.note = note;
    }
}

// export class postApproveLog implements IPostApproveLog {
//     postId: string
//     approver: IUserData;
//     approveTime: string;

//     constructor(postId: string, approver: IUserData, approvalTime: string) {
//         this.approveTime = approvalTime;
//         this.approver = approver;
//         this.postId = postId;
//     }
// }

