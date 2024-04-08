import { IPost } from "./Posts";
import { IUser } from "./Users";

export interface IContext {
    loading: ILoading;
    setLoading: (value: ILoading) => void;

    user: IUser | null;
    setUser: (newUser: IUser | null) => void;

    setCurrentUserPosts: (posts: IPost[]) => void;
    currentUserPosts: IPost[];
}

export interface ILoading {
    loading: boolean;
    tooltip?: string;
}

export interface ITheme {
    name: string;
    theme: any
}

export interface ISafeZone {
    top: string;
    bottom: string;
    left: string;
    right: string;
}