export const useLocalStorage = () => {
    const setToLocalStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const getFromLocalStorage = (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    const removeFromlocalStorage = (key: string) => {
        localStorage.removeItem(key);
    }

    return { setToLocalStorage, getFromLocalStorage, removeFromlocalStorage }
}