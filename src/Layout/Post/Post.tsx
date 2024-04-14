import { useNavigate, useParams } from "react-router-dom"
import "./Post.scss"
import { useContext, useEffect, useState } from "react";
import { usePosts } from "../../Services/CustomHooks/usePosts";
import { IPost } from "../../Model/Posts";
import { Col, Modal, Row, message } from "antd";
import { DeleteOutlined, HeartFilled, HeartOutlined, SendOutlined } from "@ant-design/icons";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { GlobalConstants } from "../../Share/Constants";
import { useLoading } from "../../Services/CustomHooks/UseLoading";
import Empty from "../../Components/Empty/Empty";
import { Data } from "../Layout";
import { IContext } from "../../Model/Others";
import Button from "../../Components/Button/Button";
import { useDeviceMethods } from "../../Services/CustomHooks/useDeviceMethods";

type Props = {}

const tabletShareLink = `fb-messenger://share?link=https%3A%2F%2F${GlobalConstants.webUrl}%2Fpost%2F`;
const PCShareLink = `https://www.facebook.com/dialog/share?link=https%3A%2F%2F${GlobalConstants.webUrl}%2Fpost%2F`;

const Post = (props: Props) => {
    const { setShowLogin } = useContext(Data) as IContext;

    const { checkIsTablet, writeToClipboard } = useDeviceMethods();
    const { getPostToView, handleLikeUnlikePost, checkUserHaveLikedPost, onRemovePost } = usePosts();
    const { getCurrentUser } = useUsers();
    const { updateLoading } = useLoading();
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentPost, setCurrentPost] = useState<IPost>();

    const [isTablet, setIsTablet] = useState<boolean>(checkIsTablet());

    const [showConfirm, setShowConfirm] = useState<boolean>(false);

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
        if (!getCurrentUser()) setShowLogin(true);

        const returnedPost = await handleLikeUnlikePost(currentPost);

        if (!returnedPost) return;


        setCurrentPost(returnedPost);
    }

    const handleShare = () => {
        const url = `${GlobalConstants.webUrl}/post/${currentPost?.postId}`;
        writeToClipboard(url);
    }

    const handleRemovePost = async () => {
        if (!currentPost) return;

        setShowConfirm(false);
        updateLoading(true, 'Đang xoá bài viết...');

        const removeSignal = await onRemovePost(currentPost.postId, currentPost.imageUrl);
        if (removeSignal) {
            message.success('Đã xoá thành công');
            navigate('/profile');
        } else {
            message.error('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }

        updateLoading(false, '');
    }

    return (
        <Row className="viewPostContainer">
            <Modal open={showConfirm}
                title="Xác nhận xoá"
                closable={false}
                footer={
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <Button style={{ margin: '0 8px 0 0' }} showIcon={false} onClick={() => setShowConfirm(false)} >Huỷ</Button>
                        <Button showIcon={false} danger onClick={handleRemovePost}>Xác nhận</Button>
                    </div>
                }
            >Bạn có chắc chắn muốn xoá bài viết này không? Sau khi xoá, bạn sẽ vĩnh viễn không thể khôi phục lại bài viết</Modal>

            <Col span={0} md={4}></Col>
            <Col span={24} md={16} className="postCon">
                <div style={{ width: '100%' }}>
                    {
                        currentPost ?
                            <>
                                {(getCurrentUser() && (getCurrentUser()?.id === currentPost.userData.userId)) && <DeleteOutlined className="deleteIcon" onClick={() => setShowConfirm(true)} />}
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
            <Col span={0} md={4}></Col>
        </Row>
    )
}

export default Post