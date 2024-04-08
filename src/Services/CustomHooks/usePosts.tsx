import { doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
import { IPost } from '../../Model/Posts';
import { postsCollectionRef } from '../Firebase/FirebaseCfg';
import { useLoading } from './UseLoading';
import { useImage } from './useImage';
import { useUsers } from './useUsers';
import { IContext } from '../../Model/Others';
import { Data } from '../../Layout/Layout';
import { useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { GlobalConstants } from '../../Share/Constants';
import { useNavigate } from 'react-router-dom';

export const usePosts = () => {
    const { setCurrentUserPosts, currentUserPosts } = useContext(Data) as IContext;

    const { getCurrentUser } = useUsers();
    const { uploadImage } = useImage();
    const { setToLocalStorage, getFromLocalStorage } = useLocalStorage();
    const { updateLoading } = useLoading();
    const navigate = useNavigate();

    const addNewPost = async (file: any, caption: string, isAnonymous: boolean) => {
        const user = getCurrentUser();
        const imageUrl = await uploadImage(file);

        if (!user || !imageUrl) return;

        const currTime = new Date().getTime().toString();

        const newPost: IPost = {
            postId: file.name.split('.')[0],
            userData: {
                userId: user.id,
                userName: user.name,
                userImg: user.imgUrl,
            },
            caption: caption,
            imageUrl: imageUrl,
            postTime: currTime,
            likesUserId: [],
            status: 0,
            isAnonymous: isAnonymous,
            isSponsored: false
        }

        const docRef = doc(postsCollectionRef, newPost.postId);

        const updateStatus = await setDoc(docRef, newPost)
            .then((res) => {
                return true;
            })
            .catch(err => {
                console.log(err)
                return false;
            })

        return updateStatus;
    }

    const setPost = async (newPost: IPost) => {
        const docRef = doc(postsCollectionRef, newPost.postId);

        const updateStatus = await setDoc(docRef, newPost)
            .then((res) => {
                return true;
            })
            .catch(err => {
                console.log(err)
                return false;
            })

        return updateStatus;
    }

    const initCurrentUserPost = () => {
        const currentUser = getCurrentUser();

        if (!currentUser) return;

        const queryColRef = query(postsCollectionRef, where("userData.userId", "==", currentUser.id));
        onSnapshot(queryColRef, (snapshot): any => {
            const postsArr: IPost[] = []
            snapshot.forEach((data) => {
                const currPostData = data.data();
                const newPost: IPost = {
                    postId: currPostData.postId,
                    userData: {
                        userId: currPostData.userData.userId,
                        userName: currPostData.userData.userName,
                        userImg: currPostData.userData.userImg,
                    },
                    caption: currPostData.caption,
                    imageUrl: currPostData.imageUrl,
                    postTime: currPostData.postTime,
                    likesUserId: currPostData.likesUserId,
                    status: currPostData.status,
                    isAnonymous: currPostData.isAnonymous,
                    isSponsored: currPostData.isSponsored
                }
                postsArr.push(newPost);
            });

            setCurrentUserPosts(postsArr);
        })
    }

    const handleViewPost = (post: IPost) => {
        // setToLocalStorage(GlobalConstants.localStorageKeys.tempPost, post);
        navigate(`/post/${post.postId}`);
    }

    const getPostToView = async (postId: string) => {
        // const post = getFromLocalStorage(GlobalConstants.localStorageKeys.tempPost);
        // if (post && post.postId === postId) return post;

        // TODO: Fetch post -> Access by share url
        const fetchedPost = await getPostById(postId);
        return fetchedPost;
    }

    const getPostById = (postId: string) => {
        const docRef = doc(postsCollectionRef, postId);

        const fetchedPost = getDoc(docRef)
            .then((doc) => {
                const docData = doc.data();
                return (
                    docData
                        ? {
                            postId: docData?.postId,
                            imageUrl: docData?.imageUrl,
                            postTime: docData?.postTime,
                            likesUserId: docData?.likesUserId,
                            status: docData?.status,
                            isAnonymous: docData?.isAnonymous,
                            isSponsored: docData?.isSponsored,
                            caption: docData?.caption,
                            userData: {
                                userName: docData?.userData.userName,
                                userImg: docData?.userData.userImg,
                                userId: docData?.userData.userId,
                            }
                        }
                        : null
                )
            })
            .catch((err) => console.log(err));

        return fetchedPost;
    }

    const handleLikeUnlikePost = (isLike: boolean, currentPost: IPost | undefined) => {
        const user = getCurrentUser();

        if (!currentPost || !user) return;

        const post: IPost = {
            postId: currentPost.postId,
            imageUrl: currentPost.imageUrl,
            postTime: currentPost.postTime,
            likesUserId: currentPost.likesUserId,
            status: currentPost.status,
            isAnonymous: currentPost.isAnonymous,
            isSponsored: currentPost.isSponsored,
            caption: currentPost.caption,
            userData: {
                userName: currentPost.userData.userName,
                userImg: currentPost.userData.userImg,
                userId: currentPost.userData.userId,
            }
        }

        if (isLike) {
            post.likesUserId?.push(user.id);
        } else {
            post.likesUserId = post.likesUserId.filter((id) => id !== user.id);
        }

        setToLocalStorage(GlobalConstants.localStorageKeys.tempPost, post);
        setPost(post);

        return post;
    }

    const checkUserHaveLikedPost = (post: IPost | undefined) => {
        const user = getCurrentUser();

        if (!post || !user) return;

        const status = post.likesUserId.includes(user.id);

        return status;
    }

    const getAllPosts = (status: number) => {
        const signal = getDocs(query(postsCollectionRef, where("status", "==", status), orderBy("postTime", "desc")))
            .then((snapshot) => {
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

                return posts;
            })
            .catch((err) => {
                console.log(err);
            })

        return signal;
    }

    const getAllPostsRealtime = (status: number, setPosts: (value: IPost[]) => void) => {
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

    return { getAllPostsRealtime, getAllPosts, addNewPost, initCurrentUserPost, handleViewPost, getPostToView, handleLikeUnlikePost, checkUserHaveLikedPost, setPost };
}
