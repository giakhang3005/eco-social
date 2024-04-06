import "./LoginPopup.scss";
import { useAuth } from "../../Services/CustomHooks/useAuth";
import { GoogleOutlined } from "@ant-design/icons";
import Button from "../Button/Button";

type Props = {}

const LoginPopup = (props: Props) => {
    const { handleSigninWithGG } = useAuth();
  return (
    <div className="LoginPopup">
        <div className="Background"></div>
        <div className="LoginContainer">
            <div className="text">Bạn chưa tham gia, vui lòng tham gia để tiếp tục</div>
            <Button style={Object.assign({position: 'absolute'}, {top: '70px'}, {left: '50%'}, {transform: 'translateX(-50%)'})} onClick={handleSigninWithGG} icon={<GoogleOutlined />} hideBorder={false}>Tham gia với Google</Button>
        </div>
    </div>
  )
}

export default LoginPopup