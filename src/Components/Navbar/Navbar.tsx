import Avatar from "../Avatar/Avatar"
import { useUsers } from "../../Services/CustomHooks/useUsers"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import "./Navbar.scss"
import Button from "../Button/Button"
import { GoogleOutlined, LogoutOutlined } from "@ant-design/icons"
import { useAuth } from "../../Services/CustomHooks/useAuth"

type Props = {}

const Navbar = (props: Props) => {
  const { handleSigninWithGG, handleLogout } = useAuth()
  const { getCurrentUser } = useUsers()
  return (
    <div className="navPC">
      {
        getCurrentUser()
          ? <Avatar src={getCurrentUser()?.imgUrl} hoverable></Avatar>
          : <Button onClick={handleSigninWithGG} icon={<GoogleOutlined />} tooltip="Đăng nhập" showText={false} hideBorder />
      }

      <ThemeToggle style={Object.assign({ bottom: getCurrentUser() ? '60px' : '20px' })} />
      
      {
        getCurrentUser() && <Button
          icon={<LogoutOutlined />}
          danger hideBorder
          showText={false}
          tooltip="Đăng xuất"
          onClick={handleLogout}
          style={Object.assign({ position: 'absolute', bottom: '15px', transform: 'rotate(180deg)' })}
        >
        </Button>
      }
    </div>
  )
}

export default Navbar