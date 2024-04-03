import { GlobalConstants } from "../../Share/Constants"

export const handleMainLayoutScroll = (e: any, mobileTopNavBar: number, lastPosition: number) => {
    const mainLayout = document.querySelector('.mainLayout')
    const newPosition = mainLayout?.scrollTop

    if (!newPosition) return null
    const newLastPosition = newPosition

    let diffrence = newPosition - lastPosition

    if (mobileTopNavBar + diffrence > GlobalConstants.topNavHeight) {
        return { newLastPosition, newPosition: 40 }
    }

    if (mobileTopNavBar + diffrence < 0) {
        return { newLastPosition, newPosition: 0 }
    }

    return { newLastPosition, newPosition: mobileTopNavBar + diffrence }
}

export const validateOrientationTablet = () => {
    const isPhone = /iPhone|Android|Windows Phone|IPad|IPod/.test(navigator.userAgent);
    const isLandscape = window.innerHeight < window.innerWidth;

    return isPhone && isLandscape
}