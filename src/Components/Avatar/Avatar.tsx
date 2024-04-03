import { MouseEventHandler } from "react";
import "./Avatar.scss"
import { Popover } from "antd";

type Props = {
    src: string | undefined;
    hoverable?: boolean;
    style?: object;
    tooltip?: string;
    active?: boolean;

    onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const Avatar = ({ src, hoverable = false, onClick, style, tooltip, active }: Props) => {
    return (
        <div onClick={onClick} className={`avatarContainer ${hoverable && "hoverable"}`}>
            <Popover content={tooltip} placement="right">
                <img src={src} style={style} className={`avatar ${active && 'active'}`} />
            </Popover>
        </div>
    )
}

export default Avatar