export interface IUser {
    id: string;
    name: string;
    email: string;
    imgUrl: string;
    mssv: string | null;
    permissions: string[];
    points: number;
    joinDate: string; //UTC string
}

export class User implements IUser {
    id: string;
    name: string;
    email: string;
    imgUrl: string;
    mssv: string | null;
    permissions: string[];
    points: number;
    joinDate: string;

    constructor(id: string, name: string, email: string, imgUrl: string, mssv: string | null, perrmissions: string[], points: number, joinDate: string) 
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.imgUrl = imgUrl;
        this.mssv = mssv;
        this.permissions = perrmissions;
        this.points = points;
        this.joinDate = joinDate;
    }
}