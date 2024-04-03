import "./BlockedScreen.scss";
type Props = {}

const BlockedScreen = (props: Props) => {
  return (
    <div className="blockedScreen">
        <div className="title">CHÚ Ý</div>
        <div className="description">Eco hiện không hỗ trợ landscape mode, vui lòng xoay dọc màn hình để có trải nghiệm tốt nhất</div>
    </div>
  )
}

export default BlockedScreen