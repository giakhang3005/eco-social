import { GlobalConstants } from "../../Share/Constants";

export const useSessionStorage = () => {
    const setToSessionStorage = (key: string, value: any) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    const getFromSessionStorage = (key: string) => {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    const removeFromSessionStorage = (key: string) => {
        sessionStorage.removeItem(key);
    }

    const removeAllFromSessionStorage = () => {
        Object.keys(GlobalConstants.sessionStorageKeys).forEach((key) => {
            sessionStorage.removeItem(key)
        })
    }

    return { removeAllFromSessionStorage, setToSessionStorage, getFromSessionStorage, removeFromSessionStorage }
}