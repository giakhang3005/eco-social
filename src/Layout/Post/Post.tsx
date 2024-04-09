import { useParams } from "react-router-dom"
import "./Post.scss"
import { useContext, useEffect, useState } from "react";
import { usePosts } from "../../Services/CustomHooks/usePosts";
import { IPost } from "../../Model/Posts";
import { Col, Row } from "antd";
import { HeartFilled, HeartOutlined, SendOutlined } from "@ant-design/icons";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { checkIsTablet, writeToClipboard } from "../../Services/Functions/DeviceMethods";
import { GlobalConstants } from "../../Share/Constants";
import { useLoading } from "../../Services/CustomHooks/UseLoading";
import Empty from "../../Components/Empty/Empty";
import { Data } from "../Layout";
import { IContext } from "../../Model/Others";

type Props = {}

const tabletShareLink = `fb-messenger://share?link=https%3A%2F%2F${GlobalConstants.webUrl}%2Fpost%2F`;
const PCShareLink = `https://www.facebook.com/dialog/share?link=https%3A%2F%2F${GlobalConstants.webUrl}%2Fpost%2F`;

const Post = (props: Props) => {
    const { setShowLogin } = useContext(Data) as IContext;

    const { getPostToView, handleLikeUnlikePost, checkUserHaveLikedPost } = usePosts();
    const { getCurrentUser } = useUsers();
    const { updateLoading } = useLoading();
    const { id } = useParams();

    const [currentPost, setCurrentPost] = useState<IPost>();

    const [isTablet, setIsTablet] = useState<boolean>(checkIsTablet());

    useEffect(() => {
        initPost();
    }, []);

    // useEffect(() => {
    //     console.log('a')
    // }, [currentPost]);

    const initPost = async () => {
        if (!id) return;

        updateLoading(true, "Đang tải bài viết...");
        const post = await getPostToView(id);

        if (post && (post.status === 1 || post.userData.userId === getCurrentUser()?.id)) {
            setCurrentPost(post);
        }
        updateLoading(false, "Đang tải bài viết...");

    }

    const handleLikeUnlike = async (isLike: boolean) => {
        if(!getCurrentUser()) setShowLogin(true);
        
        const returnedPost = await handleLikeUnlikePost(isLike, currentPost);

        if (!returnedPost) return;


        setCurrentPost(returnedPost);
    }

    const handleShare = () => {
        const url = `${GlobalConstants.webUrl}/post/${currentPost?.postId}`;
        writeToClipboard(url);
    }

    return (
        <Row className="viewPostContainer">
            <Col span={0} md={6}></Col>
            <Col span={24} md={12} className="postCon">
                <div style={{width: '100%'}}>
                    {
                        currentPost ?
                            <>
                                <div className="header">
                                    <img className="avatar" src={currentPost.isAnonymous ? GlobalConstants.postOption.anonyImgUrl : currentPost?.userData.userImg} />
                                    <div className="info">
                                        <div className="name">{currentPost.isAnonymous ? GlobalConstants.postOption.anonyName : currentPost?.userData.userName}</div>
                                        <div className="time">{new Date(Number(currentPost?.postTime)).toLocaleString()}</div>
                                        <div className="status" style={currentPost?.status === 2 ? { color: 'red' } : {}}>{currentPost?.status === 0 ? 'Đang chờ duyệt' : currentPost?.status === 2 ? 'Bị từ chối' : ''}</div>
                                    </div>
                                </div>
                                <img src={currentPost.imageUrl} className="postImg" onLoad={() => updateLoading(false)} />
                                <div className="caption">{currentPost?.caption}</div>
                                <div className="actionCon">
                                    <div className="actionIcon">
                                        {
                                            checkUserHaveLikedPost(currentPost)
                                                ? <HeartFilled className="heart likedIcon" onClick={() => handleLikeUnlike(false)} />
                                                : <HeartOutlined className="heart" onClick={() => handleLikeUnlike(true)} />
                                        }
                                        <div className="LikeCount">{currentPost.likesUserId.length}</div>
                                    </div>
                                    <SendOutlined className="actionIcon" onClick={handleShare} />
                                </div>
                            </>
                            :
                            <>
                                <Empty content="Bài đăng không tồn tại" />
                            </>
                    }
                </div>
            </Col>
            <Col span={0} md={6}></Col>
        </Row>
    )
}

export default Post