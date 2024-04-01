import { GoogleOutlined } from "@ant-design/icons"
import "./LoginModal.scss"
import { useAuth } from "../../Services/CustomHooks/useAuth"
import Button from "../Button/Button"
import { useState } from "react"

type Props = {}

const LoginModal = (props: Props) => {
    const { handleSigninWithGG } = useAuth();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    return (
        <div>
            <div className="actionContainer">
            <Button onClick={handleSigninWithGG} icon={<GoogleOutlined />} showText>Tham gia bằng Google</Button>
            </div>
        </div>
    )
}

export default LoginModal