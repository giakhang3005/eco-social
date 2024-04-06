import { MouseEventHandler } from "react";
import "./Avatar.scss"
import { Popover } from "antd";

type Props = {
    src: string | undefined;
    hoverable?: boolean;
    style?: object;
    tooltip?: string;
    active?: boolean;

    align?: string;

    onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const Avatar = ({ src, hoverable = false, onClick, style, tooltip, active, align = 'center' }: Props) => {
    return (
        <div onClick={onClick} className={`avatarContainer ${hoverable && "hoverable"}`} style={{justifyContent: align}}>
            <Popover content={tooltip} placement="right">
                <img src={src} style={style} className={`avatar ${active && 'active'}`} />
            </Popover>
        </div>
    )
}

export default Avatar