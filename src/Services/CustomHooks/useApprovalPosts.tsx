import { getDocs, onSnapshot, orderBy, query, where, limit } from "firebase/firestore";
import { IPost } from "../../Model/Posts";
import { postsCollectionRef } from "../Firebase/FirebaseCfg";
import { IUser } from "../../Model/Users";
import { IPostApproveLog } from "../../Model/Logs";

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
                    postTime: new Date(Number(fetchedData.postTime)).getTime(),
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

    const getAllPostsNoContext = (status: number, numberOfPosts: number) => {
        const signal = getDocs(query(postsCollectionRef, where("status", "==", status), orderBy("postTime", "desc"), limit(numberOfPosts)))
            .then((snapshot) => {
                const posts: IPost[] = [];
                snapshot.forEach((data) => {
                    const fetchedData = data.data();
                    const newPost: IPost = {
                        postId: fetchedData.postId,
                        imageUrl: fetchedData.imageUrl,
                        postTime: new Date(Number(fetchedData.postTime)).getTime(),
                        likesUserId: fetchedData.likesUserId,
                        isAnonymous: fetchedData.isAnonymous,
                        isSponsored: fetchedData.isSponsored,
                        status: fetchedData.status,
                        caption: fetchedData.caption,
                        userData: fetchedData.userData
                    }

                    posts.push(newPost);
                })

                return posts;
            })
            .catch((err) => {
                console.log(err);
            })

        return signal;
    }

    return { getUnArppvalPostsRealtime, getAllPostsNoContext }
}