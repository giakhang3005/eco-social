export interface IContext {
    loading: ILoading;
    setLoading: (value: ILoading) => void
}

export interface ILoading {
    loading: boolean;
    tooltip?: string;
}

export interface ITheme {
    name: string;
    theme: any
}