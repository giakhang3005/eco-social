interface IUserData {
    userId: string;
    userName: string;
    userImg: string;
}

export interface IPost {
    postId: string;
    userData: IUserData;
    caption: string;
    imageUrl: string;
    postTime: string; //UTC string
    likesUserId: string[];
    status: 0 | 1 | 2; // Pending | Approve | Reject
    isAnonymous: boolean;
    isSponsored: boolean;
}

export class post implements IPost {
    postId: string;
    userData: IUserData
    caption: string;
    imageUrl: string;
    postTime: string; //UTC string
    likesUserId: string[];
    status: 0 | 1 | 2; // Pending | Approve | Reject
    isAnonymous: boolean;
    isSponsored: boolean;

    constructor(postId: string, userData: IUserData, caption: string, imageUrl: string, postTime: string, likesUserId: string[], status: 0 | 1 | 2, isAnonymous: boolean, isSponsored: boolean) 
    {
        this.postId = postId;
        this.userData = userData;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this.postTime = postTime;
        this.likesUserId = likesUserId;
        this.status = status;
        this.isAnonymous = isAnonymous;
        this.isSponsored = isSponsored;
    }

}