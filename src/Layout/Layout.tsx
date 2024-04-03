import { Outlet } from "react-router-dom"
import "./Layout.scss"
import { Modal, Spin } from "antd"
import { useState, createContext, useLayoutEffect, useEffect } from "react"
import { IContext, ILoading, ISafeZone } from "../Model/Others"
import { useTheme } from "../Services/CustomHooks/useTheme"
import Navbar from "../Components/Navbar/Navbar"
import { IUser } from "../Model/Users"
import { useLocalStorage } from "../Services/CustomHooks/useLocalStorage"
import { GlobalConstants } from "../Share/Constants"
import { useUsers } from "../Services/CustomHooks/useUsers"
import LoginModal from "../Components/LoginModal/LoginModal"
import { handleMainLayoutScroll, validateOrientationTablet } from "../Services/Functions/ScreenMethods"
import BlockedScreen from "../Components/BlockedScreen/BlockedScreen"

export const Data = createContext<IContext | null>(null)

const Layout = () => {
    const { initTheme } = useTheme();
    const { getFromLocalStorage } = useLocalStorage();

    const [loading, setLoading] = useState<ILoading>({ loading: false })

    const [user, setUser] = useState<IUser | null>(getFromLocalStorage(GlobalConstants.localStorageKeys.user))

    const [showSigninModal, setShowSigninModal] = useState<boolean>(false)

    const [mobileTopNavBar, setMobileTopNavBar] = useState<number>(0)

    const [lastPosition, setLastPosition] = useState<number>(0)

    const [viewWidth, setViewWidth] = useState<number>(window.innerWidth)

    const [safeZone, setSafeZone] = useState<ISafeZone | undefined>()

    // Load Theme before layout loaded
    useLayoutEffect(() => {
        initTheme();
    }, [])

    // Init safe zone
    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);

        const safeZone: ISafeZone = {
            top: rootStyles.getPropertyValue('--safe-area-inset-top'),
            bottom: rootStyles.getPropertyValue('--safe-area-inset-bottom'),
            left: rootStyles.getPropertyValue('--safe-area-inset-left'),
            right: rootStyles.getPropertyValue('--safe-area-inset-right'),
        }

        setSafeZone(safeZone);
    }, [])

    useEffect(() => {
        const handleSizeChange = (e: Event) => {
            const timeOutResize = setTimeout(() => {
                setViewWidth(window.innerWidth)
                clearTimeout(timeOutResize)
            }, 40)
        }

        window.addEventListener('resize', handleSizeChange)
        // window.addEventListener('orientationchange', handleSizeChange)

        return () => {
            window.removeEventListener('resize', handleSizeChange)
            // window.removeEventListener('orientationchange', handleSizeChange)
        }
    })

    const handleUnActiveTimeTracking = () => {
        // TODO: Split to a hook
        // TODO: Implement refresh page when unactive for long time
        // TODO: add onClick to mainLayout, when mousedown/focus on tab get current time - last click time, if > ... seconds, refresh page
        // TODO: else, update current time to session storage
    }

    const handleScroll = (e: any) => {
        const newValue = handleMainLayoutScroll(e, mobileTopNavBar, lastPosition, safeZone)
        
        if (newValue === null) return

        setLastPosition(newValue?.newLastPosition)
        setMobileTopNavBar(newValue.newPosition)
    }

    return (
        <Data.Provider value={{ loading, setLoading, user, setUser }}>
            {/* {isMobileLandscape && <BlockedScreen />} */}
            <Modal open={showSigninModal} onCancel={() => setShowSigninModal(false)} footer={null}>
                <LoginModal />
            </Modal>

            <Spin size="large" spinning={loading.loading} tip={loading.tooltip}>
                <div className="mainLayout" onPointerDown={handleUnActiveTimeTracking}>
                    <Navbar mobileTopNavBar={mobileTopNavBar} safeZone={safeZone} />
                    <div className="OutletContainer" onScroll={(e) => handleScroll(e)} style={Object.assign({ marginTop: viewWidth > 768 ? 0 : `${GlobalConstants.topNavHeight - mobileTopNavBar}px`, height: viewWidth > 768 ? '100vh' : `calc(100vh - ${GlobalConstants.topNavHeight - mobileTopNavBar}px - 47px` })}>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <Outlet />
                    </div>
                </div>
            </Spin>
        </Data.Provider>
    )
}

export default Layout