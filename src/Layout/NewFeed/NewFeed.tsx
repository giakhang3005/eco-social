import { Row, Col, Modal } from "antd";
import "./NewFeed.scss";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../Components/Button/Button";
import { LeftOutlined } from "@ant-design/icons";
import Fact from "../../Components/Fact/Fact";
import { usePosts } from "../../Services/CustomHooks/usePosts";
import SkeletonPosts from "../../Components/SkeletonPosts/SkeletonPosts";
import { Data } from "../Layout";
import { IContext } from "../../Model/Others";
import Empty from "../../Components/Empty/Empty";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../Services/CustomHooks/useSesstionStorage";
import { GlobalConstants } from "../../Share/Constants";
import { ActivityData } from "../../Share/Data/ActivityData";
import CurrentEvent from "./CurrentEvent";
import Challenges from "../../Components/Challanges/Challenges";
import { useUsers } from "../../Services/CustomHooks/useUsers";

type Props = {}

// TODO: Cache post array, only load new when user refresh or swipe down
// TODO: Only fetch ... first, when user scroll down, fetch next ... posts and push to original post array

const NewFeed = (props: Props) => {
  const { newFeedPosts, setNewFeedPosts, newFeedLoading, getNFPosts, newFeedScroll, setShowLogin } = useContext(Data) as IContext;

  const { setToSessionStorage } = useSessionStorage();
  const { getCurrentUser } = useUsers();

  const navigate = useNavigate();

  const postContainerRef = useRef<any>(null);

  const [currShowNewFeed, setCurrShowNewFeed] = useState<boolean>(true);
  const [postHeight, setPostHeight] = useState<number>(0);

  const [currentViewActivity, setCurrentViewActivity] = useState<any>();

  const [touchStartYLocation, setTouchStartYLocation] = useState<number | null>(null);
  const [currentSwipeLocation, setCurrenSwipeLocation] = useState<number>(0);

  useEffect(() => {
    initPostHeight();

    window.addEventListener('resize', initPostHeight);

    return () => window.removeEventListener('resize', initPostHeight);
  }, []);

  const initPostHeight = () => {
    const element = postContainerRef.current;

    if (element) {
      setPostHeight(element.clientWidth);

      const scrollTimeout = setTimeout(() => {
        const OutletContainer = document.querySelector('.OutletContainer');

        if (!OutletContainer) return;

        const currentUser = getCurrentUser();

        OutletContainer.scrollTo(0, currentUser ? newFeedScroll : 0);
        clearTimeout(scrollTimeout);
      }, 150)
    }
  }

  const handlePostErr = (postErrId: string) => {
    const newFeedPostsCopy = newFeedPosts.filter((post) => post.postId !== postErrId);

    setNewFeedPosts(newFeedPostsCopy);
  }

  const handleViewPosts = (postId: string) => {
    const indexOfId = newFeedPosts.findIndex(post => post.postId === postId);
    setToSessionStorage(GlobalConstants.sessionStorageKeys.postsYDistance, indexOfId);

    navigate('/posts');
  }

  const viewEventDetail = (act: any) => {
    setCurrentViewActivity(act);
  }

  const onTouchDown = (e: any) => {
    let YLocation;
    if (e.type === 'mousedown') {
      YLocation = e.clientY;
    } else {
      YLocation = e.touches[0].clientY;
    }

    setTouchStartYLocation(YLocation);
  }

  const onTouchUp = (e: any) => {
    // const YLocation = e.nativeEvent.pageY;
    const currentUser = getCurrentUser();

    if (currentSwipeLocation >= 100 && currentUser) {
      setNewFeedPosts([]);
      getNFPosts();
    }

    if (!currentUser) {
      setShowLogin(true);
    }

    setCurrenSwipeLocation(0);
    setTouchStartYLocation(null);
  }

  const onTouchMove = (e: any) => {
    if (!touchStartYLocation) return;

    let YLocation;
    const outletContainer = document.querySelector('.OutletContainer');

    if (!outletContainer) return;
    if (outletContainer.scrollTop > 0) return;

    if (e.type === 'mousemove') {
      YLocation = e.clientY;
    } else {
      YLocation = e.touches[0].clientY;
    }

    const diff = (touchStartYLocation - YLocation) / 2;

    if (diff <= 0 && diff >= -100) {
      setCurrenSwipeLocation(-diff);
    } else {
      diff >= 0 && setCurrenSwipeLocation(0);
      diff <= -100 && setCurrenSwipeLocation(100);
    }
  }

  return (
    <div className="newFeed">
      {
        currentSwipeLocation > 0 &&
        <div className="progress-bar" style={{ background: `radial-gradient(closest-side, var(--bg-color) 79%, transparent 80% 100%), conic-gradient(var(--pill-color) ${currentSwipeLocation}%, var(--drop-zone-color) 0)` }}>
        </div>
      }

      <div className="swipeReloadText">{currentSwipeLocation === 100 && 'Thả để tải lại bản tin'}</div>

      <Modal open={currentViewActivity} title={`${currentViewActivity?.title}`} footer={null} onCancel={() => setCurrentViewActivity(undefined)}>
        {currentViewActivity?.content}
      </Modal>

      <Row style={{ minHeight: '100vh' }}>
        <Col span={currShowNewFeed ? 24 : 0} md={16} className="postsZone" style={{ paddingTop: `${currentSwipeLocation}px` }} onMouseMove={onTouchMove} onMouseDown={onTouchDown} onMouseUp={onTouchUp} onTouchMove={onTouchMove} onTouchStart={onTouchDown} onTouchEnd={onTouchUp}>
          <div className="NTTCtn">
            <div className="NTT">
              <div className="rank">Nhà tài trợ kim cương</div>
              <div className="LogoCtn">
                <div style={{ fontSize: '10px', textAlign: 'center', width: '100%' }}>Coming Soon</div>
                {/* <img src="./Assets/Logo/oris.png" />
                <img src="./Assets/Logo/ode.png" />
                <img src="./Assets/Logo/coyen.png" /> */}
              </div>
            </div>
            <div className="NTT">
              <div className="rank">Nhà tài trợ vàng</div>
              <div className="LogoCtn">
                <div style={{ fontSize: '10px', textAlign: 'center', width: '100%' }}>Coming Soon</div>
                {/* <img src="./Assets/Logo/oris.png" />
                <img src="./Assets/Logo/ode.png" />
                <img src="./Assets/Logo/coyen.png" /> */}
              </div>
            </div>
            <div className="NTT">
              <div className="rank">Nhà tài trợ bạc</div>
              <div className="LogoCtn">
                <div style={{ fontSize: '10px', textAlign: 'center', width: '100%' }}>Coming Soon</div>
                {/* <img src="./Assets/Logo/oris.png" />
                <img src="./Assets/Logo/ode.png" />
                <img src="./Assets/Logo/coyen.png" /> */}
              </div>
            </div>
          </div>


          <div className="quoteOnTop">{ActivityData.length} hoạt động đang diễn ra</div>
          <div className="bannerImg">
            <img src="./Assets/Img/Event/banner.png"/>
            <button className="moreBtn" onClick={() => setCurrShowNewFeed(false)}>Xem chi tiết</button>
          </div>
          {currShowNewFeed && <Fact />}
          <Challenges />
          <div className="postsContainer" ref={postContainerRef}>
            {/* Posts */}
            {
              newFeedPosts.map((post, index) => {
                return <img draggable={false} onError={() => handlePostErr(post.postId)} key={index} className="post" src={post.imageUrl} style={{ height: `${postHeight / 3}px` }} onClick={() => handleViewPosts(post.postId)} />

              })
            }
            {
              (newFeedPosts.length === 0 && !newFeedLoading) && <Empty />
            }

            {/* Loading */}
            {
              newFeedLoading && <SkeletonPosts eleRef={postContainerRef} numberOfSkeleton={12} />
            }
          </div>
        </Col>
        <Col span={currShowNewFeed ? 0 : 24} md={8} className="bannerSection">
          {!currShowNewFeed && <Button icon={<LeftOutlined />} onClick={() => setCurrShowNewFeed(true)} hideBorder>Quay lại</Button>}
          <div className="quoteOnTop">{ActivityData.length} hoạt động đang diễn ra</div>
          {
            ActivityData.map((act, i) => (
              <CurrentEvent key={i} act={act} viewEventDetail={viewEventDetail} />
            ))
          }
        </Col>
      </Row>
    </div>
  )
}

export default NewFeed