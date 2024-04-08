import { FrownOutlined } from "@ant-design/icons"
import "./Empty.scss"

type Props = {
  content?: string
}

const Empty = ({content = "Chưa có bài đăng"}: Props) => {
  return (
    <div className="empty">
        <FrownOutlined className="icon" />
        <div className="content">{content}</div>
    </div>
  )
}

export default Empty