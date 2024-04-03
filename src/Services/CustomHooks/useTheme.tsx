import { GlobalConstants } from "../../Share/Constants"
import { avaiableThemeArr } from "../../Share/Theme/ThemeController"
import { useLocalStorage } from "./useLocalStorage"

export const useTheme = () => {
    const { setToLocalStorage, getFromLocalStorage } = useLocalStorage()

    const getActiveTheme = () => {
        const currentTheme = getFromLocalStorage(GlobalConstants.localStorageKeys.theme)
        return currentTheme ? currentTheme : avaiableThemeArr[0].name
    }

    const setActiveTheme = (theme: string) => {
        const activeTheme = avaiableThemeArr.find(avaiTheme => theme === avaiTheme.name)

        if (!activeTheme) return

        // Set Theme
        Object.keys(activeTheme.theme).forEach((key) => {
            const value = activeTheme.theme[key]
            document.documentElement.style.setProperty(key, value)
        })

        let browserMetaTheme = document.querySelector("meta[name=theme-color]")
        browserMetaTheme && browserMetaTheme.setAttribute("content", activeTheme.theme["--background-color"]);
        console.log(browserMetaTheme)

        // Save active theme to local storage
        setToLocalStorage(GlobalConstants.localStorageKeys.theme, activeTheme.name)

    }

    const initTheme = () => {
        setActiveTheme(getActiveTheme())
    }

    return { setActiveTheme, getActiveTheme, initTheme }
}