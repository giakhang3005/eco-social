import "./LoginBtn.scss"
import { useAuth } from '../../Services/CustomHooks/useAuth'
import { GoogleOutlined } from '@ant-design/icons'

type Props = {
    showText?: boolean,
    showLogo?: boolean,
    style?: object,
    active?: boolean,
}

const LoginBtn = ({ showText = true, showLogo = true, style, active = false }: Props) => {
    const { handleSigninWithGG } = useAuth()

    const onLogin = () => {
        handleSigninWithGG()
    }

    return (
        <button onClick={onLogin} className={`SignInBtn ${active && "active"}`} style={style}>
            { showLogo && <><GoogleOutlined className="GGLogo" /></> }
            { showLogo && showText && <span className="space"></span> }
            { showText && "Đăng nhập" }
        </button>
    )
}

export default LoginBtn