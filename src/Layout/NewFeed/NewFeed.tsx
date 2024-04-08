import { Row, Col } from "antd";
import "./NewFeed.scss";
import { useEffect, useRef, useState } from "react";
import Button from "../../Components/Button/Button";
import { LeftOutlined } from "@ant-design/icons";
import Fact from "../../Components/Fact/Fact";
import { IPost } from "../../Model/Posts";
import { usePosts } from "../../Services/CustomHooks/usePosts";
import SkeletonPosts from "../../Components/SkeletonPosts/SkeletonPosts";

type Props = {}

// TODO: Cache post array, only load new when user refresh or swipe down
// TODO: Only fetch ... first, when user scroll down, fetch next ... posts and push to original post array

const NewFeed = (props: Props) => {
  const { getAllPosts, handleViewPost } = usePosts();

  const postContainerRef = useRef(null);

  const [currShowNewFeed, setCurrShowNewFeed] = useState<boolean>(true);

  const [showSkeletonloading, setShowSkeletonLoading] = useState<boolean>(false);

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchPost()
  }, []);

  const fetchPost = async () => {
    setShowSkeletonLoading(true);

    const signal = await getAllPosts(0);
    if (signal) {
      setPosts(signal);
    }

    setShowSkeletonLoading(false)
  }

  return (
    <div className="newFeed">
      <Row>
        <Col span={currShowNewFeed ? 24 : 0} md={16} className="postsZone">
          <div className="quoteOnTop">00 sự kiện đang diễn ra</div>
          <div className="bannerImg">
            <button className="moreBtn" onClick={() => setCurrShowNewFeed(false)}>Xem chi tiết</button>
          </div>
          {currShowNewFeed && <Fact />}
          <div className="postsContainer" ref={postContainerRef}>

            {/* Posts */}
            {
              posts.map((post, index) => {
                return <img key={index} className="post" src={post.imageUrl} loading="lazy" onClick={() => handleViewPost(post)} />
              })
            }

            {/* Loading */}
            {
              showSkeletonloading && <SkeletonPosts eleRef={postContainerRef} numberOfSkeleton={12} />
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