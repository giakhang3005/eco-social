import "./Posts.scss";
import { IPost } from '../../Model/Posts'
import { useContext, useState } from "react";
import { HeartFilled, HeartOutlined, SendOutlined } from "@ant-design/icons";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { IContext } from "../../Model/Others";
import { Data } from "../Layout";
import { usePosts } from "../../Services/CustomHooks/usePosts";
import { GlobalConstants } from "../../Share/Constants";
import { useDeviceMethods } from "../../Services/CustomHooks/useDeviceMethods";

type Props = {
    post: IPost;

    handleLikeUnlike: (post: IPost) => void;
    checkImgLoaded: () => void;
}

const ViewPosts = ({ post, handleLikeUnlike, checkImgLoaded }: Props) => {
    const { writeToClipboard } = useDeviceMethods();
    const { checkUserHaveLikedPost } = usePosts();

    const [viewMore, setViewMore] = useState<boolean>(false);

    const handleShare = () => {
        const url = `${GlobalConstants.webUrl}/post/${post?.postId}`;
        writeToClipboard(url);
    }

    return (
        <div className="post" id={post.postId}>
            <div className="header">
                <img src={post.userData.userImg} className="avatar" />
                <div className="info">
                    <div className="name">{post.userData.userName}</div>
                    <div className="time">{new Date(post.postTime).toLocaleString()}</div>
                </div>
            </div>
            <img src={post.imageUrl} className="postImg" onLoad={checkImgLoaded}/>
            <div className="caption">
                {
                    post.caption.length >= 200
                        ?
                        <>
                            {
                                viewMore
                                    ?
                                    <>{post.caption} <b className="viewMore" onClick={() => setViewMore(false)}>Thu gọn</b></>
                                    :
                                    <>
                                        {post.caption.substring(0, 200)}... <b className="viewMore" onClick={() => setViewMore(true)} >Xem thêm</b>
                                    </>
                            }

                        </>
                        : post.caption
                }
            </div>
            <div className="actionCon">
                <div className="actionIcon">
                    {
                        checkUserHaveLikedPost(post)
                            ? <HeartFilled className="heart likedIcon" onClick={() => handleLikeUnlike(post)} />
                            : <HeartOutlined className="heart" onClick={() => handleLikeUnlike(post)} />
                    }
                    <div className="LikeCount">{post.likesUserId.length}</div>
                </div>
                <SendOutlined className="actionIcon" onClick={handleShare} />
            </div>
        </div>
    )
}

export default ViewPosts