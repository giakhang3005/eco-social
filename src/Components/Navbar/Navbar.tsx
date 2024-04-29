import Avatar from "../Avatar/Avatar"
import { useUsers } from "../../Services/CustomHooks/useUsers"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import "./Navbar.scss"
import Button from "../Button/Button"
import { GoogleOutlined, HomeFilled, LogoutOutlined, StarFilled, PlusOutlined, BookFilled, CarryOutFilled, SignatureFilled, MergeFilled } from "@ant-design/icons"
import { useAuth } from "../../Services/CustomHooks/useAuth"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GlobalConstants } from "../../Share/Constants"
import { usePermissions } from "../../Services/CustomHooks/usePermissions"
import { IContext, ISafeZone } from "../../Model/Others"
import { usePosts } from "../../Services/CustomHooks/usePosts"
import { Data } from "../../Layout/Layout"
import { useSessionStorage } from "../../Services/CustomHooks/useSesstionStorage"
import { Modal } from "antd"

type Props = {
  mobileTopNavBar: number;
  safeZone: ISafeZone | undefined;

  setMobileTopNavBar: (value: number) => void;
}

const darkEcoEchoLogo = './Assets/Logo/EchoEcho.png';
const lightEcoEchoLogo = './Assets/Logo/EchoEcho_black.png';
const darkCsgLogo = './Assets/Logo/csg.png';
const lightCsgLogo = './Assets/Logo/csg_black.png';

const Navbar = ({ mobileTopNavBar, setMobileTopNavBar, safeZone }: Props) => {
  const { postWaitingToApprove, currentTheme } = useContext(Data) as IContext;

  const { handleSigninWithGG, handleLogout } = useAuth();
  const { getCurrentUser, initUserWhenRefresh } = useUsers();
  const { checkHavePerm, checkHaveAnyPerm } = usePermissions();
  const { initCurrentUserPost } = usePosts();
  const { getFromSessionStorage, removeFromSessionStorage } = useSessionStorage();

  const navigate = useNavigate();
  const location = useLocation();

  const [confirmLeaveModal, setConfirmLeaveModal] = useState<boolean>(false);
  const [destination, setDestination] = useState<string>('/')

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
  }, [location]);

  const navigateToOtherPage = (path: string) => {
    const isNewPost = getFromSessionStorage(GlobalConstants.sessionStorageKeys.isCreateNewPost);
    if (isNewPost) {
      setConfirmLeaveModal(true);
      setDestination(path);
      return;
    }

    if (path === location.pathname) {
      const OutletContainer = document.querySelector('.OutletContainer');
      OutletContainer?.scrollTo(0, 0);

      return;
    }
    navigate(path);
  }

  const onCloseCFModal = () => {
    setConfirmLeaveModal(false);
    setDestination('/');
  }

  const onConfirmModal = () => {
    removeFromSessionStorage(GlobalConstants.sessionStorageKeys.isCreateNewPost);
    setConfirmLeaveModal(false);

    navigate(destination);
  }

  return (
    <div className="Navbar">

      <Modal title="Lưu ý" onCancel={onCloseCFModal} open={confirmLeaveModal} footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button showIcon={false} onClick={onCloseCFModal}>Huỷ</Button>
          <Button showIcon={false} type="primary" style={{ margin: '0 0 0 12px' }} onClick={onConfirmModal}>Chắc chắn</Button>
        </div>
      }>
        Bạn chưa hoàn tất quá trình đăng bài, nếu chuyển đến trang khác, thông tin bài đăng này sẽ không được lưu.
        <br /><br />
        Bạn có chắc chắn muốn rời khỏi trang này không?
      </Modal>

      {/* Nav PC */}
      <div className="navPC">
        <img className="logo logoPc" src={currentTheme === 'dark' ? darkCsgLogo : lightCsgLogo} />
        <img className="logo logoPc" src={currentTheme === 'dark' ? darkEcoEchoLogo : lightEcoEchoLogo} />
        {getCurrentUser() && (
          <div className="mainbtn">
            <Button tooltip="Bản tin" onClick={() => navigateToOtherPage('/')} style={{ margin: '0 0 14px 0' }} icon={<HomeFilled />} hideBorder active={location.pathname === "/"}></Button>
            <Button tooltip="Đăng bài" onClick={() => navigateToOtherPage('/new-post')} style={{ margin: '0 0 14px 0' }} icon={<PlusOutlined />} hideBorder active={location.pathname === "/new-post"}></Button>
          </div>
        )}
        {
          getCurrentUser()
            ? <Avatar tooltip="Trang cá nhân" onClick={() => navigateToOtherPage('/profile')} src={getCurrentUser()?.imgUrl} hoverable active={location.pathname === "/profile"}></Avatar>
            : <Button onClick={handleSigninWithGG} icon={<GoogleOutlined />} tooltip="Tham gia" showText={false} hideBorder />
        }

        {/* Footer */}
        <div className="footer">
          {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.log)) && <Button tooltip="Log" onClick={() => navigateToOtherPage('/log')} style={{ margin: '6px 0 0 0' }} icon={<BookFilled />} hideBorder active={location.pathname === "/log"}></Button>}
          {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.points)) && <Button tooltip="Điểm môi trường" style={{ margin: '6px 0 0 0' }} onClick={() => navigateToOtherPage('/points')} icon={<StarFilled />} hideBorder active={location.pathname === "/points"}></Button>}
          {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.approval)) && <Button tooltip="Duyệt bài" style={{ margin: '6px 0 0 0' }} onClick={() => navigateToOtherPage('/approval')} icon={<CarryOutFilled />} hideBorder active={location.pathname === "/approval"} badge={postWaitingToApprove.length}></Button>}
          {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.booth)) && <Button tooltip="Minigame" style={{ margin: '6px 0 0 0' }} onClick={() => navigateToOtherPage('/games')} icon={<MergeFilled />} hideBorder active={location.pathname === "/games"}></Button>}
          {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.perm)) && <Button tooltip="Kiểm soát quyền" style={{ margin: '6px 0 0 0' }} onClick={() => navigateToOtherPage('/perm')} icon={<SignatureFilled />} hideBorder active={location.pathname === "/perm"}></Button>}
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
        <div className="NavMobileTop" style={Object.assign({ height: `calc(${GlobalConstants.topNavHeight}px + ${safeZone?.top}` }, { paddingTop: safeZone?.top }, { top: location.pathname !== '/' ? 0 : 0 - mobileTopNavBar }, { opacity: 1 - (mobileTopNavBar / (GlobalConstants.topNavHeight - 10)) })}>
          <img className="logo logoMobile" src={currentTheme === 'dark' ? darkCsgLogo : lightCsgLogo} />
          <img className="logo logoMobile" src={currentTheme === 'dark' ? darkEcoEchoLogo : lightEcoEchoLogo} />
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
          <div className="NavMobileBottom_SubMenu" style={Object.assign({ bottom: location.pathname !== '/' ? `calc(47px + ${safeZone?.bottom}` : `calc(${47 - mobileTopNavBar}px + ${safeZone?.bottom})` }, { opacity: 1 - (mobileTopNavBar / (GlobalConstants.topNavHeight - 10)) })}>
            {(checkHavePerm(GlobalConstants.permissionsKey.log)) && <Button onClick={() => navigateToOtherPage('/log')} icon={<BookFilled />} hideBorder active={location.pathname === "/log"}></Button>}
            {(checkHavePerm(GlobalConstants.permissionsKey.points)) && <Button onClick={() => navigateToOtherPage('/points')} icon={<StarFilled />} hideBorder active={location.pathname === "/points"}></Button>}
            {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.approval)) && <Button style={{ margin: '0 0 0 0' }} onClick={() => navigateToOtherPage('/approval')} icon={<CarryOutFilled />} hideBorder badge={postWaitingToApprove.length} active={location.pathname === "/approval"}></Button>}
            {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.booth)) && <Button onClick={() => navigateToOtherPage('/games')} icon={<MergeFilled />} hideBorder active={location.pathname === "/games"}></Button>}
            {(getCurrentUser() && checkHavePerm(GlobalConstants.permissionsKey.perm)) && <Button onClick={() => navigateToOtherPage('/perm')} icon={<SignatureFilled />} hideBorder active={location.pathname === "/perm"}></Button>}
          </div>
        }

        {/* Bottom Navbar */}
        <div className="NavMobileBottom" style={Object.assign(!getCurrentUser() ? { justifyContent: 'center' } : {}, { paddingBottom: safeZone?.bottom }, { height: `calc(${GlobalConstants.topNavHeight}px + ${safeZone?.bottom}` })}>
          {getCurrentUser() && (
            <>
              <Button onClick={() => navigateToOtherPage('/')} icon={<HomeFilled />} hideBorder active={location.pathname === "/"}></Button>
              <Button onClick={() => navigateToOtherPage('/new-post')} icon={<PlusOutlined />} active={location.pathname === "/new-post"}></Button>
              <Avatar onClick={() => navigateToOtherPage('/profile')} src={getCurrentUser()?.imgUrl} style={{ width: '27px' }} active={location.pathname === "/profile"}></Avatar>
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