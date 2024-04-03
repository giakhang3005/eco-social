import { ISafeZone } from "../../Model/Others"
import { GlobalConstants } from "../../Share/Constants"

export const handleMainLayoutScroll = (e: any, mobileTopNavBar: number, lastPosition: number, safeZone: ISafeZone | undefined) => {
    const mainLayout = document.querySelector('.OutletContainer')
    const newPosition = mainLayout?.scrollTop;

    const topSafezone = Number(safeZone?.top.replace('px', ''))
    const bottomSafezone = Number(safeZone?.bottom.replace('px', ''))

    if (!newPosition) return null
    const newLastPosition = newPosition

    let diffrence = newPosition - lastPosition

    if (mobileTopNavBar + diffrence > GlobalConstants.topNavHeight + topSafezone) {
        return { newLastPosition, newPosition: 40 }
    }

    if (mobileTopNavBar + diffrence + topSafezone < 0) {
        return { newLastPosition, newPosition: 0 }
    }

    return { newLastPosition, newPosition: mobileTopNavBar + diffrence }
}

export const validateOrientationTablet = () => {
    const isPhone = /iPhone|Android|Windows Phone|IPad|IPod/.test(navigator.userAgent);
    const isLandscape = window.innerHeight < window.innerWidth;

    return isPhone && isLandscape
}