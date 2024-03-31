import { MouseEventHandler } from "react";
import "./Avatar.scss"

type Props = {
    src: string | undefined;
    hoverable?: boolean;
    style?: object;

    onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const Avatar = ({ src, hoverable = false, onClick, style }: Props) => {
    return (
        <div onClick={onClick} className={`avatarContainer ${hoverable && "hoverable"}`}>
            <img src={src} style={style} className="avatar" />
        </div>
    )
}

export default Avatar