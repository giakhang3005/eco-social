import Avatar from "../Avatar/Avatar"
import { useUsers } from "../../Services/CustomHooks/useUsers"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import "./Navbar.scss"
import Button from "../Button/Button"
import { GoogleOutlined, HomeFilled, LogoutOutlined, StarFilled, PlusOutlined, BookFilled } from "@ant-design/icons"
import { useAuth } from "../../Services/CustomHooks/useAuth"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GlobalConstants } from "../../Share/Constants"

type Props = {
  mobileTopNavBar: number
}

const Navbar = ({ mobileTopNavBar }: Props) => {
  const { handleSigninWithGG, handleLogout } = useAuth();
  const { getCurrentUser, initUserWhenRefresh } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Init user with realtime connection
    initUserWhenRefresh();
  }, []);

  return (
    <div className="Navbar">
      <div className="navPC">
        {getCurrentUser() && (
          <>
            <Button tooltip="Bản tin" onClick={() => navigate('/')} style={{ margin: '0 0 14px 0' }} icon={<HomeFilled />} hideBorder active={location.pathname === "/"}></Button>
            <Button tooltip="Đăng bài" onClick={() => navigate('/')} style={{ margin: '0 0 14px 0' }} icon={<PlusOutlined />} hideBorder></Button>
          </>
        )}
        {
          getCurrentUser()
            ? <Avatar tooltip="Trang cá nhân" src={getCurrentUser()?.imgUrl} hoverable active={location.pathname === "/profile"}></Avatar>
            : <Button onClick={handleSigninWithGG} icon={<GoogleOutlined />} tooltip="Đăng nhập" showText={false} hideBorder />
        }

        {/* Footer */}
        <div className="footer">
          {(getCurrentUser() && getCurrentUser()?.permissions.includes(GlobalConstants.permissionsKey.log)) && <Button tooltip="Log" onClick={() => navigate('/log')} style={{ margin: '6px 0 0 0' }} icon={<BookFilled />} hideBorder active={location.pathname === "/log"}></Button>}
          {(getCurrentUser() && getCurrentUser()?.permissions.includes(GlobalConstants.permissionsKey.points)) && <Button tooltip="Điểm tái chế" style={{ margin: '6px 0 0 0' }} onClick={() => navigate('/points')} icon={<StarFilled />} hideBorder active={location.pathname === "/points"}></Button>}
        </div>
        <ThemeToggle style={Object.assign({ bottom: getCurrentUser() ? '58px' : '20px' })} />

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

      <div className="NavMobile">
        <div className="NavMobileTop" style={Object.assign({ top: 0 - mobileTopNavBar }, {opacity: 1 - (mobileTopNavBar/(GlobalConstants.topNavHeight - 10))})}>
          <div>ECO</div>
          <div className="button">
            <ThemeToggle style={Object.assign({ right: getCurrentUser() ? '43px' : '8px' }, { top: '9px' })} />
            {
              getCurrentUser() && <Button
                icon={<LogoutOutlined />}
                danger hideBorder
                showText={false}
                tooltip="Đăng xuất"
                onClick={handleLogout}
                style={Object.assign({ position: 'absolute', top: '13px', right: '3px' })}
              >
              </Button>
            }
          </div>
        </div>
        <div className="NavMobileBottom">
          {getCurrentUser() && (
            <>
              <Button onClick={() => navigate('/')} icon={<HomeFilled />} hideBorder active={location.pathname === "/"}></Button>
              <Button onClick={() => navigate('/')} icon={<PlusOutlined />} ></Button>
              <Avatar src={getCurrentUser()?.imgUrl} style={{ width: '27px' }} active={location.pathname === "/profile"}></Avatar>
            </>
          )}
          {
            !getCurrentUser() && <Button onClick={handleSigninWithGG} icon={<GoogleOutlined />} showText={false} hideBorder />
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar