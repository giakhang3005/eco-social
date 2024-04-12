import { useContext, useEffect, useRef, useState } from "react";
import { IContext } from "../../Model/Others";
import { Data } from "../Layout";
import "./Posts.scss";
import ViewPosts from "./ViewPosts";
import { useSessionStorage } from "../../Services/CustomHooks/useSesstionStorage";
import { GlobalConstants } from "../../Share/Constants";
import { usePosts } from "../../Services/CustomHooks/usePosts";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { IPost } from "../../Model/Posts";
import { useLoading } from "../../Services/CustomHooks/UseLoading";

const Posts = () => {
    const { newFeedPosts, setNewFeedPosts, newFeedLoading, setShowLogin } = useContext(Data) as IContext;

    const { getFromSessionStorage } = useSessionStorage();
    const { handleLikeUnlikePost } = usePosts();
    const { getCurrentUser } = useUsers();
    const { updateLoading } = useLoading();

    const [numOfImgLoaded, setNumOfImgLoaded] = useState<number>(0);

    const postRef = useRef<any>(null);

    useEffect(() => {
        updateLoading(true, 'Đang tải...');
        if (numOfImgLoaded !== newFeedPosts.length) return;

        const mainLayout = document.querySelector('.OutletContainer');

        if (!mainLayout) return;

        const postHeight = postRef.current.clientHeight / (newFeedPosts.length);
        const postYPosition = getFromSessionStorage(GlobalConstants.sessionStorageKeys.postsYDistance) || 0;

        mainLayout.scrollTo(0, postYPosition * postHeight + 10);
        
        updateLoading(false, '');
    }, [numOfImgLoaded]);

    const handleLikeUnlike = async (post: IPost) => {
        if (!getCurrentUser()) setShowLogin(true);

        const returnedPost = await handleLikeUnlikePost(post);

        if (!returnedPost) return;

        const updatedNewFeedPosts = newFeedPosts.map((post) => (
            post.postId === returnedPost.postId ? returnedPost : post
        ));

        setNewFeedPosts(updatedNewFeedPosts);
    }

    const triggerImgLoaded = () => {
        setNumOfImgLoaded((prev) => prev + 1);
        // console.log(numOfImgLoaded + 1);
    }

    return (
        <div className="newFeedPostsCtn" ref={postRef}>
            <div className="newFeedPosts">
                {
                    newFeedPosts.map((post, i) => (
                        <ViewPosts post={post} key={i} handleLikeUnlike={handleLikeUnlike} triggerImgLoaded={triggerImgLoaded} />
                    ))
                }
            </div>
        </div>
    )
}

export default Posts