import { useContext, useEffect, useRef, useState } from "react";
import { usePosts } from "../../Services/CustomHooks/usePosts";
import "./PostApprove.scss";
import { IPost } from "../../Model/Posts";
import { message } from "antd";
import { useLoading } from "../../Services/CustomHooks/UseLoading";
import { GlobalConstants } from "../../Share/Constants";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { usePermissions } from "../../Services/CustomHooks/usePermissions";
import { Data } from "../Layout";
import { IContext } from "../../Model/Others";
import { useNavigate } from "react-router-dom";
import { useLog } from "../../Services/CustomHooks/useLog";
import Empty from "../../Components/Empty/Empty";
import SinglePost from "./SinglePost";

type Props = {}

const PostApprove = (props: Props) => {
    const { postWaitingToApprove } = useContext(Data) as IContext;

    const { setPost } = usePosts();
    const { updateLoading } = useLoading();
    const { getCurrentUser } = useUsers();
    const { checkHavePerm } = usePermissions();
    const { savePostLog } = useLog();

    const navigate = useNavigate();

    const containerRef = useRef<any>(null);
    const imgRef = useRef<any>(null);

    const [imgWidth, setImgWidth] = useState<number>(0);

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (currentUser && checkHavePerm(GlobalConstants.permissionsKey.approval)) return;

        navigate('/');
    }, []);

    const handleUpdateStatus = async (post: IPost, status: 1 | 2) => {

        updateLoading(true, 'Đang cập nhật trạng thái...');
        const user = getCurrentUser();

        if (!user) return;

        const newPost: IPost = {
            postId: post.postId,
            imageUrl: post.imageUrl,
            postTime: new Date(post.postTime).getTime(),
            likesUserId: post.likesUserId,
            isAnonymous: post.isAnonymous,
            isSponsored: post.isSponsored,
            status: status,
            caption: post.caption,
            userData: post.userData
        }


        savePostLog(newPost.postId, user, status);

        const signal = await setPost(newPost);
        if (signal) {
            message.success('Cập nhật trạng thái thành công');
        }
        updateLoading(false, '');
    }

    useEffect(() => {
        initPostHeight();

        window.addEventListener('resize', initPostHeight);

        return () => window.removeEventListener('resize', initPostHeight);
    }, []);

    const initPostHeight = () => {
        const element = imgRef.current;

        if (element) {
            setImgWidth(element.clientWidth);
        }
    }

    return (
        <div className="postApproval" ref={containerRef}>
            {
                postWaitingToApprove.map((post, i) => (
                    <SinglePost key={i} post={post} handleUpdateStatus={handleUpdateStatus} imgRef={imgRef} imgWidth={imgWidth} />
                ))
            }

            {
                postWaitingToApprove.length === 0 && <Empty />
            }
        </div>
    )
}

export default PostApprove