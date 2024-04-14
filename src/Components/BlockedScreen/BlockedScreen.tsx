import { CopyFilled } from "@ant-design/icons";
import { GlobalConstants } from "../../Share/Constants";
import Button from "../Button/Button";
import "./BlockedScreen.scss";
import { useDeviceMethods } from "../../Services/CustomHooks/useDeviceMethods";
type Props = {}

const BlockedScreen = (props: Props) => {
  const { writeToClipboard } = useDeviceMethods();

  return (
    <div className="blockedScreen">
      <div className="title">CHÚ Ý</div>
      <div className="description">
        Eco không hỗ trợ trình duyệt của Messenger & Facebook, bạn vui lòng copy link và truy cập từ trình duyệt của thiết bị (Safari/Google Chrome/...)
        <div className="webUrl">
          {GlobalConstants.webUrl}{window.location.pathname}
          <Button icon={<CopyFilled />} style={{ color: 'white' }} hideBorder onClick={() => writeToClipboard(`${GlobalConstants.webUrl}${window.location.pathname}`)}></Button>
        </div>
      </div>
    </div>
  )
}

export default BlockedScreen