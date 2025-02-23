import { Outlet, useLocation } from "react-router-dom"
import "./Layout.scss"
import { Modal, Popover, Spin } from "antd"
import { useState, createContext, useLayoutEffect, useEffect, useRef } from "react"
import { IContext, ILoading, ISafeZone } from "../Model/Others"
import { useTheme } from "../Services/CustomHooks/useTheme"
import Navbar from "../Components/Navbar/Navbar"
import { IUser } from "../Model/Users"
import { useLocalStorage } from "../Services/CustomHooks/useLocalStorage"
import { GlobalConstants } from "../Share/Constants"
import LoginModal from "../Components/LoginModal/LoginModal"
import LoginPopup from "../Components/LoginPopup/LoginPopup"
import NetworkNotify from "../Components/NetworkNotify/NetworkNotify"
import { IPost } from "../Model/Posts"
import { useApprovalPosts } from "../Services/CustomHooks/useApprovalPosts"
import { useSessionStorage } from "../Services/CustomHooks/useSesstionStorage"
import { useDeviceMethods } from "../Services/CustomHooks/useDeviceMethods"

export const Data = createContext<IContext | null>(null);

const Layout = () => {
    const { initTheme } = useTheme();
    const { getFromLocalStorage } = useLocalStorage();
    const { getUnArppvalPostsRealtime, getAllPostsNoContext, getAllPostsNoContextWithCursor } = useApprovalPosts();
    const { getFromSessionStorage, setToSessionStorage } = useSessionStorage();
    const { checkScrollFromTop, handleMainLayoutScroll, updateScrollForOutlet } = useDeviceMethods();

    const OutletContainer = useRef<any>(null);

    const location = useLocation();

    const [loading, setLoading] = useState<ILoading>({ loading: false });

    const [user, setUser] = useState<IUser | null>(getFromLocalStorage(GlobalConstants.localStorageKeys.user));

    const [showSigninModal, setShowSigninModal] = useState<boolean>(false);

    const [mobileTopNavBar, setMobileTopNavBar] = useState<number>(0);

    const [lastPosition, setLastPosition] = useState<number>(0);

    const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

    const [distanceFromTop, setDistanceFromTop] = useState<number>(0);

    const [safeZone, setSafeZone] = useState<ISafeZone | undefined>();

    const [currentUserPosts, setCurrentUserPosts] = useState<IPost[]>([]);

    const [postWaitingToApprove, setPostWaitingToApprove] = useState<IPost[]>([]);

    const [newFeedPosts, setNewFeedPosts] = useState<IPost[]>([]);
    const [newFeedLoading, setNewFeedLoading] = useState<boolean>(false);
    const [newFeedScroll, setNewFeedScroll] = useState<number>(0);

    const [showLogin, setShowLogin] = useState<boolean>(false);

    const [lastDocument, setLastDocument] = useState<any>(false);
    const [noMorePost, setNoMorePost] = useState<boolean>(false);

    // Load Theme & add connection listener before layout loaded
    useLayoutEffect(() => {
        const themeType = initTheme();

        themeType && setCurrentTheme(themeType);
    }, []);

    useEffect(() => {
        let unsubscription = () => { };

        if (!user) {
            unsubscription();
            return;
        }

        if (user && user.permissions.includes(GlobalConstants.permissionsKey.approval)) {
            unsubscription = getUnArppvalPostsRealtime(0, setPostWaitingToApprove);
        }

    }, [user]);

    // Init newfeed
    useEffect(() => {
        getNFPosts();
    }, []);

    const getNFPosts = async () => {
        setNewFeedLoading(true);
        const fetchedPosts = await getAllPostsNoContext(1, GlobalConstants.numberOfPostPerReq, setLastDocument);

        setNewFeedLoading(false);

        if (!fetchedPosts) return;
        setNewFeedPosts(fetchedPosts);
    }

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
    // useEffect(() => {
    //     const handleSizeChange = (e: Event) => {
    //         const timeOutResize = setTimeout(() => {
    //             setViewWidth(window.innerWidth)
    //             clearTimeout(timeOutResize)
    //         }, 40)
    //     }

    //     window.addEventListener('resize', handleSizeChange)
    //     // window.addEventListener('orientationchange', handleSizeChange)

    //     return () => {
    //         window.removeEventListener('resize', handleSizeChange)
    //         // window.removeEventListener('orientationchange', handleSizeChange)
    //     }
    // }, []);

    // Check for Logged In
    useEffect(() => {
        if (user) {
            updateScrollForOutlet(true);
        }
    }, [user]);

    const handleUnActiveTimeTracking = () => {
        // TODO: Split to a hook
        // TODO: Implement refresh page when unactive for long time
        // TODO: add onClick to mainLayout, when mousedown/focus on tab get current time - last click time, if > ... seconds, refresh page
        // TODO: else, update current time to session storage
    }

    const handleScroll = async (e: any) => {

        // handle scroll in new feed
        if (location.pathname === '/') {
            const fromTopValue = OutletContainer?.current?.scrollTop;
            const currentScreenPos = fromTopValue + window.innerHeight;
            const containerHeight = OutletContainer?.current?.scrollHeight;
            const validatePostRange = newFeedPosts.length / GlobalConstants.numberOfPostPerReq;
            
            if( Number.isInteger(validatePostRange)  && containerHeight - currentScreenPos < 200 && !newFeedLoading && !noMorePost) {
                setNewFeedLoading(true);
                const currentPost = [...newFeedPosts];
                const nextPost = await getAllPostsNoContextWithCursor(1, GlobalConstants.numberOfPostPerReq + 1, lastDocument, setLastDocument);
                
                if(nextPost) {
                    const newPosts = [...currentPost, ...nextPost];
                    setNewFeedPosts(newPosts);
                } 

                if(nextPost && nextPost.length === 0) {
                    setNoMorePost(true);
                }

                setNewFeedLoading(false);
            }

            setNewFeedScroll(fromTopValue);
        }

        const newValue = handleMainLayoutScroll(e, mobileTopNavBar, lastPosition, safeZone);

        if (!user) {
            checkScrollFromTop(setDistanceFromTop, user);
            return;
        }

        if (newValue === null) return

        setLastPosition(newValue?.newLastPosition);
        setMobileTopNavBar(newValue.newPosition);
    }

    return (
        <Data.Provider value={{ setLastDocument, setCurrentTheme, currentTheme, setShowLogin, loading, setLoading, user, setUser, setCurrentUserPosts, currentUserPosts, postWaitingToApprove, newFeedPosts, newFeedScroll, setNewFeedPosts, getNFPosts, newFeedLoading }}>
            {/* {isMobileLandscape && <BlockedScreen />} */}
            <Modal open={showSigninModal} onCancel={() => setShowSigninModal(false)} footer={null}>
                <LoginModal />
            </Modal>

            <NetworkNotify />

            {((!user && showLogin) || (!user && distanceFromTop >= GlobalConstants.unLoggedInMaximumScroll) || (user && !user?.mssv)) && <LoginPopup />}

            <Spin size="large" spinning={loading.loading} tip={loading.tooltip}>
                <div className="mainLayout" onPointerDown={handleUnActiveTimeTracking}>
                    <Navbar mobileTopNavBar={mobileTopNavBar} setMobileTopNavBar={setMobileTopNavBar} safeZone={safeZone} />
                    <div className="OutletContainer" onScroll={(e) => handleScroll(e)} ref={OutletContainer}>
                        <Outlet />
                    </div>
                </div>
            </Spin>
        </Data.Provider>
    )
}

export default Layout