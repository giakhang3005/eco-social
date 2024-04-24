import { SunFilled, MoonFilled, CloudFilled } from '@ant-design/icons'
import "./ThemeToggle.scss"
import { useContext, useState } from 'react'
import { useTheme } from '../../Services/CustomHooks/useTheme'
import { Data } from '../../Layout/Layout';
import { IContext } from '../../Model/Others';

interface IProp {
    style?: object;
}

const ThemeToggle = ({ style }: IProp) => {
    const { setCurrentTheme } = useContext(Data) as IContext;
    const { getActiveTheme, setActiveTheme } = useTheme()

    const [currTheme, setCurrTheme] = useState<string>(getActiveTheme())
    const [disableBtn, setDisableBtn] = useState<boolean>(false)

    const onToggleTheme = () => {
        setDisableBtn(true)

        if (disableBtn) return

        const newTheme = currTheme === 'lightTheme' ? 'darkTheme' : 'lightTheme'
        const themeType = setActiveTheme(newTheme);

        themeType && setCurrentTheme(themeType);

        // Handle animation & update local state
        const icon = document.getElementById(currTheme)
        if (icon) icon.style.animation = "moveOut 0.15s linear"

        const outAniTimeout = setTimeout((): void => {
            setCurrTheme(newTheme)
            setDisableBtn(false)

            clearTimeout(outAniTimeout)
        }, 100)
    }

    return (
        <div onClick={onToggleTheme} className='themeToggleContainer' style={style}>
            {
                currTheme === 'lightTheme'
                    ? <div><SunFilled className='sun' id='lightTheme' /></div>
                    : <div><MoonFilled className='moon' id='darkTheme' /></div>
            }
            <CloudFilled className='cloud' />
        </div>
    )
}

export default ThemeToggle