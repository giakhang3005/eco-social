import { IPost } from "./Posts";
import { IUser } from "./Users";

export interface IContext {
    setShowLogin: (value: boolean) => void;
    
    loading: ILoading;
    setLoading: (value: ILoading) => void;

    user: IUser | null;
    setUser: (newUser: IUser | null) => void;

    setCurrentUserPosts: (posts: IPost[]) => void;
    currentUserPosts: IPost[];

    postWaitingToApprove: IPost[];

    newFeedPosts: IPost[];
    setNewFeedPosts: (posts: IPost[]) => void;

    getNFPosts: () => void;

    currentTheme: 'dark' | 'light';
    setCurrentTheme: (value: 'dark' | 'light') => void;

    newFeedLoading: boolean;
    newFeedScroll: number;

    setLastDocument: (value: any) => void;
}

export interface ILoading {
    loading: boolean;
    tooltip?: string;
}

export interface ITheme {
    name: string;
    type: 'dark' | 'light';
    theme: any
}

export interface ISafeZone {
    top: string;
    bottom: string;
    left: string;
    right: string;
}