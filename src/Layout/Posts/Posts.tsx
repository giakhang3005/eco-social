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

    const postRef = useRef<any>(null);

    const [loadedImg, setLoadedImg] = useState<number>(0);

    useEffect(() => {
        if (loadedImg < newFeedPosts.length) return;
        const mainLayout = document.querySelector('.OutletContainer');

        if (!mainLayout) return;

        const postHeight = (postRef.current.clientHeight) / (newFeedPosts.length);
        const postYPosition = getFromSessionStorage(GlobalConstants.sessionStorageKeys.postsYDistance) || 0;

        mainLayout.scrollTo(0, postYPosition * postHeight - 10);
    }, [loadedImg]);

    const handleLikeUnlike = async (post: IPost) => {
        if (!getCurrentUser()) setShowLogin(true);

        const returnedPost = await handleLikeUnlikePost(post);

        if (!returnedPost) return;

        const updatedNewFeedPosts = newFeedPosts.map((post) => (
            post.postId === returnedPost.postId ? returnedPost : post
        ));

        setNewFeedPosts(updatedNewFeedPosts);
    }

    const checkImgLoaded = () => {
        setLoadedImg((prev) => prev + 1);
    }

    return (
        <div className="newFeedPostsCtn" ref={postRef}>
            <div className="newFeedPosts">
                {
                    newFeedPosts.map((post, i) => (
                        <ViewPosts post={post} key={i} handleLikeUnlike={handleLikeUnlike} checkImgLoaded={checkImgLoaded} />
                    ))
                }
            </div>
        </div>
    )
}

export default Posts