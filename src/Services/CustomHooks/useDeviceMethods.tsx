import { message } from "antd";
import copy from "copy-to-clipboard";
import { GlobalConstants } from "../../Share/Constants";
import { IUser } from "../../Model/Users";
import { ISafeZone } from "../../Model/Others";
import { useSessionStorage } from "./useSesstionStorage";
import { useLocation } from "react-router-dom";

export const useDeviceMethods = () => {
    const { setToSessionStorage } = useSessionStorage();

    const handleMainLayoutScroll = (e: any, mobileTopNavBar: number, lastPosition: number, safeZone: ISafeZone | undefined) => {
        const mainLayout = document.querySelector('.OutletContainer')
        const newPosition = mainLayout?.scrollTop;
        const scrollHeight = mainLayout?.scrollHeight;
        const clientHeight = mainLayout?.clientHeight;

        const topSafezone = Number(safeZone?.top.replace('px', ''));
        const bottomSafezone = Number(safeZone?.bottom.replace('px', ''));

        if (!newPosition || !scrollHeight || !newPosition || !clientHeight) return null

        const newLastPosition = newPosition
        let diffrence = newPosition - lastPosition

        if (newPosition < 30) {
            return { newLastPosition: lastPosition, newPosition: 0 }
        }

        if (scrollHeight - (newPosition + clientHeight) < 20) {
            return { newLastPosition, newPosition: 40 }
        }

        if (mobileTopNavBar + diffrence > GlobalConstants.topNavHeight + topSafezone) {
            return { newLastPosition, newPosition: 40 }
        }

        if (mobileTopNavBar + diffrence + topSafezone < 0) {
            return { newLastPosition, newPosition: 0 }
        }

        return { newLastPosition, newPosition: mobileTopNavBar + diffrence }
    }

    const checkScrollFromTop = (setDistanceFromTop: any, user: IUser | null) => {
        const outletContainer = document.querySelector('.OutletContainer') as HTMLElement;

        if (outletContainer) {
            const newPosition = outletContainer.scrollTop;
            setDistanceFromTop(newPosition);

            if (newPosition > GlobalConstants.unLoggedInMaximumScroll && !user) {
                // outletContainer.scrollTo(0, 0);
                updateScrollForOutlet(false);
            }
        }
    }

    const updateScrollForOutlet = (allowScroll: boolean) => {
        const outletContainer = document.querySelector('.OutletContainer') as HTMLElement;

        if (outletContainer) {
            outletContainer.style.overflowY = allowScroll ? 'scroll' : 'hidden';
        }
    }

    const validateOrientationTablet = () => {
        const isPhone = /iPhone|Android|Windows Phone|IPad|IPod/.test(navigator.userAgent);
        const isLandscape = window.innerHeight < window.innerWidth;

        return isPhone && isLandscape
    }

    const isAccessUsingMessFBBrowser = () => {
        const isMessengerMobile = /FBAN\/Messenger/i.test(navigator.userAgent);
        const isFacebookMobile = /FBAN|FBAV|FB_IAB/i.test(navigator.userAgent);
        // console.log(isMessengerMobile, isFacebookMobile)
        return isMessengerMobile || isFacebookMobile;
    }

    const writeToClipboard = (text: string) => {
        copy(text);
        message.success('Đã copy link')
        // navigator.clipboard.writeText(`${text}`)
        //     .then((res) => {
        //         message.success('Đã copy link')
        //     })
        //     .catch((err: any) => {
        //         console.log(err)
        //     })
    }

    const checkingNetwork = (setConnectionStatus: (value: boolean) => void) => {
        const handleChangeNetwork = (e: any) => {
            if (e.type === 'online') {
                message.success('Đã có kết nối mạng');
                setConnectionStatus(true);
                return;
            }

            if (e.type === 'offline') {
                message.error('Mất kết nối mạng');
                setConnectionStatus(false);
                return;
            }
        }

        window.addEventListener('online', handleChangeNetwork);
        window.addEventListener('offline', handleChangeNetwork);
    }

    const checkIsTablet = () => {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    return { handleMainLayoutScroll, checkIsTablet, checkingNetwork, writeToClipboard, isAccessUsingMessFBBrowser, validateOrientationTablet, updateScrollForOutlet, checkScrollFromTop }
}