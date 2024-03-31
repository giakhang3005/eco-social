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
}

const Button = ({ tooltip, showText = true, showIcon = true, style, active = false, onClick, icon, children, danger = false, hideBorder = false }: Props) => {
    return (
        <Popover content={tooltip} placement="right">
            <button onClick={onClick} className={`Btn ${active && "active"} ${danger && 'danger'} ${hideBorder && 'hideBorder'}`} style={style}>
                {icon && <div className="Btn_icon">{icon}</div>}
                {showIcon && showText && <span className="space"></span>}
                {showText && children}
            </button>
        </Popover>
    )
}

export default Button