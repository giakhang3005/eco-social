import { MouseEventHandler } from "react";
import "./Avatar.scss"
import { Popover } from "antd";

type Props = {
    src: string | undefined;
    hoverable?: boolean;
    style?: object;
    tooltip?: string;

    onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const Avatar = ({ src, hoverable = false, onClick, style, tooltip }: Props) => {
    return (
        <div onClick={onClick} className={`avatarContainer ${hoverable && "hoverable"}`}>
            <Popover content={tooltip} placement="right">
                <img src={src} style={style} className="avatar" />
            </Popover>
        </div>
    )
}

export default Avatar