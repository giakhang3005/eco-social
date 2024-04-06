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
import LoginModal from "../Components/LoginModal/LoginModal"
import { checkScrollFromTop, handleMainLayoutScroll, updateScrollForOutlet } from "../Services/Functions/DeviceMethods"
import LoginPopup from "../Components/LoginPopup/LoginPopup"

export const Data = createContext<IContext | null>(null);

const Layout = () => {
    const { initTheme } = useTheme();
    const { getFromLocalStorage } = useLocalStorage();

    const [loading, setLoading] = useState<ILoading>({ loading: false });

    const [user, setUser] = useState<IUser | null>(getFromLocalStorage(GlobalConstants.localStorageKeys.user));

    const [showSigninModal, setShowSigninModal] = useState<boolean>(false);

    const [mobileTopNavBar, setMobileTopNavBar] = useState<number>(0);

    const [lastPosition, setLastPosition] = useState<number>(0);

    const [viewWidth, setViewWidth] = useState<number>(window.innerWidth);

    const [distanceFromTop, setDistanceFromTop] = useState<number>(0);

    const [safeZone, setSafeZone] = useState<ISafeZone | undefined>();

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
    }, []);

    // Resize & Orientation
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
    }, []);

    // Check for Logged In
    useEffect(() => {
        if(user) {
            updateScrollForOutlet(true);
        }
    }, [user]);

    const handleUnActiveTimeTracking = () => {
        // TODO: Split to a hook
        // TODO: Implement refresh page when unactive for long time
        // TODO: add onClick to mainLayout, when mousedown/focus on tab get current time - last click time, if > ... seconds, refresh page
        // TODO: else, update current time to session storage
    }

    const handleScroll = (e: any) => {
        const newValue = handleMainLayoutScroll(e, mobileTopNavBar, lastPosition, safeZone)

        if (!user) {
            checkScrollFromTop(setDistanceFromTop, user);
            return;
        }

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

            {(!user && distanceFromTop >= 47) && <LoginPopup />}

            <Spin size="large" spinning={loading.loading} tip={loading.tooltip}>
                <div className="mainLayout" onPointerDown={handleUnActiveTimeTracking}>
                    <Navbar mobileTopNavBar={mobileTopNavBar} safeZone={safeZone} />
                    <div className="OutletContainer" onScroll={(e) => handleScroll(e)}>
                        <Outlet />
                    </div>
                </div>
            </Spin>
        </Data.Provider>
    )
}

export default Layout