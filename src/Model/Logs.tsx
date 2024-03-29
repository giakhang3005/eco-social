export interface IPointsLog {
    executedUserId: string;
    amount: number;
    targetUserId: string;
    executeTime: string; //UTC
}

export interface IPostApproveLog {
    postId: string
    approverId: string;
    approveTime: string; //UTC
}

export class pointsLog implements IPointsLog {
    executedUserId: string;
    amount: number;
    targetUserId: string;
    executeTime: string;

    constructor(executedUserId: string, amount: number, targetUserId: string, executeTime: string) {
        this.executedUserId = executedUserId;
        this.amount = amount;
        this.targetUserId = targetUserId;
        this.executeTime = executeTime;
    }
}

export class postApproveLog implements IPostApproveLog {
    postId: string
    approverId: string;
    approveTime: string;

    constructor(postId: string, approverId: string, approvalTime: string) {
        this.approveTime = approvalTime;
        this.approverId = approverId;
        this.postId = postId;
    }
}

