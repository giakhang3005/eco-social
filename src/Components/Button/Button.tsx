import { MouseEventHandler, ReactNode } from "react"
import "./Button.scss"
import { Popover } from "antd"

type Props = {
    showText?: boolean,
    showIcon?: boolean,
    hideBorder?: boolean,

    tooltip?: string
    style?: object,
    active?: boolean,
    danger?: boolean,

    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
    icon?: ReactNode,
    children?: ReactNode,

    type?: "default" | "primary",
    disabled?: boolean,
}


const Button = ({disabled = false, type = "default", tooltip, showText = true, showIcon = true, style, active = false, onClick, icon, children, danger = false, hideBorder = false }: Props) => {
    const handleOnClick = (e: any) => {
        if(disabled || !onClick) return

        onClick(e)
    }
    return (
        <Popover content={tooltip} placement="right">
            <button onClick={handleOnClick} className={`Btn ${active && "active"} ${danger && 'danger'} ${hideBorder && 'hideBorder'} ${type} ${disabled && "disabled"}`} style={style}>
                {icon && <div className="Btn_icon">{icon}</div>}
                {(showIcon && showText && children) && <span className="space"></span>}
                {showText && children}
            </button>
        </Popover>
    )
}

export default Button