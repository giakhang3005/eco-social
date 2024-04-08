import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { IPost } from "../../Model/Posts";
import { postsCollectionRef } from "../Firebase/FirebaseCfg";

export const useApprovalPosts = () => {
    const getUnArppvalPostsRealtime = (status: number, setPosts: (value: IPost[]) => void) => {
        const queryRef = query(postsCollectionRef, where("status", "==", status), orderBy("postTime", "desc"));

        const unsubscription = onSnapshot(queryRef, (snapshot) => {
            const posts: IPost[] = [];
            snapshot.forEach((data) => {
                const fetchedData = data.data();
                const newPost: IPost = {
                    postId: fetchedData.postId,
                    imageUrl: fetchedData.imageUrl,
                    postTime: new Date(Number(fetchedData.postTime)).toLocaleString(),
                    likesUserId: fetchedData.likesUserId,
                    isAnonymous: fetchedData.isAnonymous,
                    isSponsored: fetchedData.isSponsored,
                    status: fetchedData.status,
                    caption: fetchedData.caption,
                    userData: fetchedData.userData
                }
                posts.push(newPost);
            })

            setPosts(posts);
        })

        return unsubscription;
    }

    return { getUnArppvalPostsRealtime }
}