import { Row, Col } from "antd";
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

type Props = {}

// TODO: Cache post array, only load new when user refresh or swipe down
// TODO: Only fetch ... first, when user scroll down, fetch next ... posts and push to original post array

const NewFeed = (props: Props) => {
  const { newFeedPosts, setNewFeedPosts, newFeedLoading } = useContext(Data) as IContext;

  const { getAllPosts, handleViewPost } = usePosts();

  const postContainerRef = useRef(null);

  const [currShowNewFeed, setCurrShowNewFeed] = useState<boolean>(true);


  // useEffect(() => {
  //   fetchPost()
  // }, []);

  // const fetchPost = async () => {
  //   setnewFeedLoading(true);

  //   const signal = await getAllPosts(1);
  //   if (signal) {
  //     setPosts(signal);
  //   }

  //   setnewFeedLoading(false)
  // }

  return (
    <div className="newFeed">
      <Row>
        <Col span={currShowNewFeed ? 24 : 0} md={16} className="postsZone">

          <div className="NTTCtn">
            <div className="NTT">
              <div className="rank">Nhà tài trợ kim cương</div>
              <div className="LogoCtn">
                <img src="./Assets/Logo/oris.png" />
                <img src="./Assets/Logo/ode.png" />
                <img src="./Assets/Logo/coyen.png" />
              </div>
            </div>
            <div className="NTT">
              <div className="rank">Nhà tài trợ vàng</div>
              <div className="LogoCtn">
                <img src="./Assets/Logo/oris.png" />
                <img src="./Assets/Logo/ode.png" />
                <img src="./Assets/Logo/coyen.png" />
              </div>
            </div>
            <div className="NTT">
              <div className="rank">Nhà tài trợ bạc</div>
              <div className="LogoCtn">
                <img src="./Assets/Logo/oris.png" />
                <img src="./Assets/Logo/ode.png" />
                <img src="./Assets/Logo/coyen.png" />
              </div>
            </div>
          </div>


          <div className="quoteOnTop">00 sự kiện đang diễn ra</div>
          <div className="bannerImg">
            <button className="moreBtn" onClick={() => setCurrShowNewFeed(false)}>Xem chi tiết</button>
          </div>
          {currShowNewFeed && <Fact />}
          <div className="postsContainer" ref={postContainerRef}>

            {/* Posts */}
            {
              newFeedPosts.map((post, index) => {
                return <img key={index} className="post" src={post.imageUrl} loading="lazy" onClick={() => handleViewPost(post)} />

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
          <div className="quoteOnTop">00 sự kiện đang diễn ra</div>
          <div className="bannerImg">
            <button className="moreBtn">Xem chi tiết</button>
          </div>
          <div className="bannerImg">
            <button className="moreBtn">Xem chi tiết</button>
          </div>
          <div className="bannerImg">
            <button className="moreBtn">Xem chi tiết</button>
          </div>
          <div className="bannerImg">
            <button className="moreBtn">Xem chi tiết</button>
          </div>
          <div className="bannerImg">
            <button className="moreBtn">Xem chi tiết</button>
          </div>
          <div className="bannerImg">
            <button className="moreBtn">Xem chi tiết</button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default NewFeed