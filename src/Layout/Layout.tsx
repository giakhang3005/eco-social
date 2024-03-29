import { Outlet } from "react-router-dom"
import "./Layout.scss"
import { Spin } from "antd"
import { useState, createContext, useLayoutEffect, useEffect } from "react"
import { IContext, ILoading } from "../Model/Others"
import { useTheme } from "../Services/CustomHooks/useTheme"
import Navbar from "../Components/Navbar/Navbar"

export const Data = createContext<IContext | null>(null)

const Layout = () => {
    const { initTheme } = useTheme()

    const [loading, setLoading] = useState<ILoading>({ loading: false })

    // Load Theme before layout loaded
    useLayoutEffect(() => {
        initTheme()
    }, [])

    const handleUnActiveTimeTracking = () => {
        // TODO: Split to a hook
        // TODO: Implement refresh page when unactive for long time
        // TODO: add onClick to mainLayout, when mousedown/focus on tab get current time - last click time, if > ... seconds, refresh page
        // TODO: else, update current time to session storage
    }
    return (
        <Data.Provider value={{ loading, setLoading }}>
            <Spin size="large" spinning={loading.loading} tip={loading.tooltip}>
                <div className="mainLayout" onPointerDown={handleUnActiveTimeTracking}>
                    <Navbar />
                    {/* <Outlet /> */}
                </div>
            </Spin>
        </Data.Provider>
    )
}

export default Layout