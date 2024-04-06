import { FrownOutlined } from "@ant-design/icons"
import "./Empty.scss"

type Props = {}

const Empty = (props: Props) => {
  return (
    <div className="empty">
        <FrownOutlined className="icon" />
        <div className="content">Chưa có bài đăng</div>
    </div>
  )
}

export default Empty