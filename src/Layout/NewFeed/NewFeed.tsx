import { Row, Col } from "antd";
import "./NewFeed.scss";
import { useState } from "react";
import Button from "../../Components/Button/Button";
import { LeftOutlined } from "@ant-design/icons";
import Fact from "../../Components/Fact/Fact";

type Props = {}

const NewFeed = (props: Props) => {
  const [currShowNewFeed, setCurrShowNewFeed] = useState<boolean>(true)
  return (
    <div className="newFeed">
      <Row>
        <Col span={currShowNewFeed ? 24 : 0} md={16} className="postsZone">
          <div className="quoteOnTop">00 sự kiện đang diễn ra</div>
          <div className="bannerImg">
            <button className="moreBtn" onClick={() => setCurrShowNewFeed(false)}>Xem chi tiết</button>
          </div>
          <Fact />
          <div className="postsContainer">
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
            <img className="post" src="https://media.istockphoto.com/id/655667264/photo/creative-layout-made-of-green-leaves-with-paper-card-note-flat-lay-nature-concept.jpg?s=612x612&w=0&k=20&c=4Na7uj6sAYGevNQG8Fh442vS5leENcxbzZgmJ2zfcqI=" />
          </div>
        </Col>
        <Col span={currShowNewFeed ? 0 : 24} md={8} className="bannerSection">
          {!currShowNewFeed && <Button icon={<LeftOutlined />} onClick={() => setCurrShowNewFeed(true)}>Quay lại</Button>}
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