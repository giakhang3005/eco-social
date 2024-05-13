import { getDocs, onSnapshot, orderBy, query, where, limit, startAfter } from "firebase/firestore";
import { IPost } from "../../Model/Posts";
import { postsCollectionRef } from "../Firebase/FirebaseCfg";
import { IUser } from "../../Model/Users";
import { IPostApproveLog } from "../../Model/Logs";
import { message } from "antd";

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

    const getAllPostsNoContext = (status: number, numberOfPosts: number, setLastDocument: any) => {
        const signal = getDocs(query(postsCollectionRef, where("status", "==", status), orderBy("postTime", "desc"), limit(numberOfPosts)))
            .then((snapshot) => {
                const posts: IPost[] = [];
                let index: number = 0;

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
                    index++;

                    if(index === snapshot.docs.length - 1) {
                        setLastDocument(data);
                    }
                });

                (posts.length === 0) && message.error('Kết nối không ổn định, không thể tải bài viết, vui lòng thử lại sau')

                return posts;
            })
            .catch((err) => {
                message.error('Kết nối không ổn định, không thể tải bài viết, vui lòng thử lại sau');
                console.log(err);
            })

        return signal;
    }

    const getAllPostsNoContextWithCursor = (status: number, numberOfPosts: number, lastDocument: any, setLastDocument: any) => {
        const signal = getDocs(query(postsCollectionRef, where("status", "==", status), orderBy("postTime", "desc"), startAfter(lastDocument), limit(numberOfPosts)))
            .then((snapshot) => {
                const posts: IPost[] = [];
                let index: number = 0;

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

                    index > 0 && posts.push(newPost);
                    index++;

                    if(index === snapshot.docs.length - 1) {
                        setLastDocument(data);
                    }
                })
                return posts;
            })
            .catch((err) => {
                message.error('Kết nối không ổn định, không thể tải bài viết, vui lòng thử lại sau');
                console.log(err);
            })

        return signal;
    }

    return { getUnArppvalPostsRealtime, getAllPostsNoContext, getAllPostsNoContextWithCursor }
}