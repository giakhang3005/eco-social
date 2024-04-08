import Avatar from "../Avatar/Avatar"
import { useUsers } from "../../Services/CustomHooks/useUsers"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import "./Navbar.scss"
import Button from "../Button/Button"
import { GoogleOutlined, HomeFilled, LogoutOutlined, StarFilled, PlusOutlined, BookFilled, CarryOutFilled } from "@ant-design/icons"
import { useAuth } from "../../Services/CustomHooks/useAuth"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GlobalConstants } from "../../Share/Constants"
import { usePermissions } from "../../Services/CustomHooks/usePermissions"
import { IContext, ISafeZone } from "../../Model/Others"
import { usePosts } from "../../Services/CustomHooks/usePosts"
import { Data } from "../../Layout/Layout"

type Props = {
  mobileTopNavBar: number;
  safeZone: ISafeZone | undefined;

  setMobileTopNavBar: (value: number) => void;
}

const Navbar = ({ mobileTopNavBar, setMobileTopNavBar, safeZone }: Props) => {
  const { postWaitingToApprove } = useContext(Data) as IContext;

  const { handleSigninWithGG, handleLogout } = useAuth();
  const { getCurrentUser, initUserWhenRefresh } = useUsers();
  const { checkHavePerm, checkHaveAnyPerm } = usePermissions();
  const { initCurrentUserPost } = usePosts();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Init user with realtime connection
    initUserWhenRefresh();
  }, []);

  // Init current user posts
  useEffect(() => {
    initCurrentUserPost();
  }, [getCurrentUser()]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setMobileTopNavBar(0);
    }
  }, [location])

  return (
    <div className="Navbar">

      {/* Nav PC */}
      <div className="navPC">
        {getCurrentUser() && (
          <>
            <Button tooltip="Bản tin" onClick={() => navigate('/')} style={{ margin: '0 0 14px 0' }} icon={<HomeFilled />} hideBorder active={location.pathname === "/"}></Button>
            <Button tooltip="Đăng bài" onClick={() => navigate('/new-post')} style={{ margin: '0 0 14px 0' }} icon={<PlusOutlined />} hideBorder active={location.pathname === "/new-post"}></Button>
          </>
        )}
        {
          getCurrentUser()
            ? <Avatar tooltip="Trang cá nhân" onClick={() => navigate('/profile')} src={getCurrentUser()?.imgUrl} hoverable active={location.pathname === "/profile"}></Avatar>
            : <Button onClick={handleSigninWithGG} icon={<GoogleOutlined />} tooltip="Tham gia" showText={false} hideBorder />
        }

        {/* Footer */}
        <div className="footer">
          {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.log)) && <Button tooltip="Log" onClick={() => navigate('/log')} style={{ margin: '6px 0 0 0' }} icon={<BookFilled />} hideBorder active={location.pathname === "/log"}></Button>}
          {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.points)) && <Button tooltip="Điểm tái chế" style={{ margin: '6px 0 0 0' }} onClick={() => navigate('/points')} icon={<StarFilled />} hideBorder active={location.pathname === "/points"}></Button>}
          {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.approval)) && <Button tooltip="Duyệt bài" style={{ margin: '6px 0 0 0' }} onClick={() => navigate('/approval')} icon={<CarryOutFilled />} hideBorder active={location.pathname === "/approval"} badge={postWaitingToApprove.length}></Button>}
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
            iconColor="red"
          >
          </Button>
        }
      </div>

      {/* Nav Mobile */}
      <div className="NavMobile">
        {/* Top Navbar */}
        <div className="NavMobileTop" style={Object.assign({ height: `calc(${GlobalConstants.topNavHeight}px + ${safeZone?.top}` }, { paddingTop: safeZone?.top }, { top: 0 - mobileTopNavBar }, { opacity: 1 - (mobileTopNavBar / (GlobalConstants.topNavHeight - 10)) })}>
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
                style={Object.assign({ position: 'absolute', top: '9px', right: '3px' })}
                iconColor="red"
              >
              </Button>
            }
          </div>
        </div>

        {/* Bottom Sub-Menu */}
        {
          (getCurrentUser() && checkHaveAnyPerm()) &&
          <div className="NavMobileBottom_SubMenu" style={Object.assign({ bottom: `calc(${47 - mobileTopNavBar}px + ${safeZone?.bottom})` }, { opacity: 1 - (mobileTopNavBar / (GlobalConstants.topNavHeight - 10)) })}>
            {(checkHavePerm(GlobalConstants.permissionsKey.log)) && <Button onClick={() => navigate('/log')} icon={<BookFilled />} hideBorder active={location.pathname === "/log"}></Button>}
            {(checkHavePerm(GlobalConstants.permissionsKey.points)) && <Button onClick={() => navigate('/points')} icon={<StarFilled />} hideBorder active={location.pathname === "/points"}></Button>}
            {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.approval)) && <Button tooltip="Duyệt bài" style={{ margin: '0 0 0 0' }} onClick={() => navigate('/approval')} icon={<CarryOutFilled />} hideBorder badge={postWaitingToApprove.length} active={location.pathname === "/approval"}></Button>}
          </div>
        }

        {/* Bottom Navbar */}
        <div className="NavMobileBottom" style={Object.assign(!getCurrentUser() ? { justifyContent: 'center' } : {}, { paddingBottom: safeZone?.bottom }, { height: `calc(${GlobalConstants.topNavHeight}px + ${safeZone?.bottom}` })}>
          {getCurrentUser() && (
            <>
              <Button onClick={() => navigate('/')} icon={<HomeFilled />} hideBorder active={location.pathname === "/"}></Button>
              <Button onClick={() => navigate('/new-post')} icon={<PlusOutlined />} active={location.pathname === "/new-post"}></Button>
              <Avatar onClick={() => navigate('/profile')} src={getCurrentUser()?.imgUrl} style={{ width: '27px' }} active={location.pathname === "/profile"}></Avatar>
            </>
          )}
          {
            !getCurrentUser() && <Button onClick={handleSigninWithGG} icon={<GoogleOutlined />} showText hideBorder>Tham gia</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar