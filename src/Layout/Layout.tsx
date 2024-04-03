import { Outlet } from "react-router-dom"
import "./Layout.scss"
import { Modal, Spin } from "antd"
import { useState, createContext, useLayoutEffect, useEffect } from "react"
import { IContext, ILoading } from "../Model/Others"
import { useTheme } from "../Services/CustomHooks/useTheme"
import Navbar from "../Components/Navbar/Navbar"
import { IUser } from "../Model/Users"
import { useLocalStorage } from "../Services/CustomHooks/useLocalStorage"
import { GlobalConstants } from "../Share/Constants"
import { useUsers } from "../Services/CustomHooks/useUsers"
import LoginModal from "../Components/LoginModal/LoginModal"

export const Data = createContext<IContext | null>(null)

const Layout = () => {
    const { initTheme } = useTheme();
    const { getFromLocalStorage } = useLocalStorage();

    const [loading, setLoading] = useState<ILoading>({ loading: false })

    const [user, setUser] = useState<IUser | null>(getFromLocalStorage(GlobalConstants.localStorageKeys.user))

    const [showSigninModal, setShowSigninModal] = useState<boolean>(false)

    const [mobileTopNavBar, setMobileTopNavBar] = useState<number>(0)

    const [lastPosition, setLastPosition] = useState<number>(0)

    // Load Theme before layout loaded
    useLayoutEffect(() => {
        initTheme();
    }, [])

    const handleUnActiveTimeTracking = () => {
        // TODO: Split to a hook
        // TODO: Implement refresh page when unactive for long time
        // TODO: add onClick to mainLayout, when mousedown/focus on tab get current time - last click time, if > ... seconds, refresh page
        // TODO: else, update current time to session storage
    }

    const handleScroll = (e: any) => {
        const mainLayout = document.querySelector('.mainLayout')
        const newPosition = mainLayout?.scrollTop

        if (!newPosition) return

        setLastPosition(newPosition)
        let diffrence = newPosition - lastPosition

        if (mobileTopNavBar + diffrence > GlobalConstants.topNavHeight) {
            setMobileTopNavBar(GlobalConstants.topNavHeight)
            return
        }
        if (mobileTopNavBar + diffrence < 0) {
            setMobileTopNavBar(0)
            return
        }

        setMobileTopNavBar(mobileTopNavBar + diffrence)
        
    }

    const detectScroll = (e: any) => {
        // console.log(e.movementY)
        // setScrollDownPosition(e.movementY < 0)
    }

    return (
        <Data.Provider value={{ loading, setLoading, user, setUser }}>
            <Modal open={showSigninModal} onCancel={() => setShowSigninModal(false)} footer={null}>
                <LoginModal />
            </Modal>

            <Spin size="large" spinning={loading.loading} tip={loading.tooltip}>
                <div className="mainLayout" onPointerDown={handleUnActiveTimeTracking} onScroll={(e) => handleScroll(e)} onPointerMove={(e) => detectScroll(e)}>
                    <Navbar mobileTopNavBar={mobileTopNavBar} />
                    <div className="OutletContainer" style={Object.assign({ marginTop: `${GlobalConstants.topNavHeight - mobileTopNavBar}px`, height: `calc(100vh - ${GlobalConstants.topNavHeight - mobileTopNavBar}px - 47px` })}>
                        <Outlet />
                    </div>
                </div>
            </Spin>
        </Data.Provider>
    )
}

export default Layout