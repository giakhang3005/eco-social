import { IUser } from "./Users";

export interface IContext {
    loading: ILoading;
    setLoading: (value: ILoading) => void;

    user: IUser | null;
    setUser: (newUser: IUser | null) => void;
}

export interface ILoading {
    loading: boolean;
    tooltip?: string;
}

export interface ITheme {
    name: string;
    theme: any
}