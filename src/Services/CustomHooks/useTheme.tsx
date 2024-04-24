import { useContext } from "react"
import { GlobalConstants } from "../../Share/Constants"
import { avaiableThemeArr } from "../../Share/Theme/ThemeController"
import { useLocalStorage } from "./useLocalStorage"
import { Data } from "../../Layout/Layout"
import { IContext } from "../../Model/Others"
import { useUsers } from "./useUsers"

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

        // setCurrentTheme(activeTheme.type)

        let browserMetaTheme = document.querySelector("meta[name=theme-color]")
        browserMetaTheme && browserMetaTheme.setAttribute("content", activeTheme.theme["--bg-color"]);

        // Save active theme to local storage
        setToLocalStorage(GlobalConstants.localStorageKeys.theme, activeTheme.name)

        return activeTheme.type;
    }

    const initTheme = () => {
        return setActiveTheme(getActiveTheme())
    }

    return { setActiveTheme, getActiveTheme, initTheme }
}