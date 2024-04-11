import { deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
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
    const { uploadImage, onRemoveImage } = useImage();
    const { setToLocalStorage, getFromLocalStorage } = useLocalStorage();
    const { updateLoading } = useLoading();
    const navigate = useNavigate();

    const addNewPost = async (file: any, caption: string, isAnonymous: boolean) => {
        const user = getCurrentUser();
        const imageUrl = await uploadImage(file);

        if (!user || !imageUrl) return;

        const currTime = new Date().getTime();

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

    const handleLikeUnlikePost = async (isLike: boolean, currentPost: IPost | undefined) => {
        const user = getCurrentUser();

        if (!currentPost || !user) return;

        const fetchedDoc = await getPostById(currentPost.postId);

        if (!fetchedDoc) return;

        const post: IPost = {
            postId: fetchedDoc.postId,
            imageUrl: fetchedDoc.imageUrl,
            postTime: fetchedDoc.postTime,
            likesUserId: fetchedDoc.likesUserId,
            status: fetchedDoc.status,
            isAnonymous: fetchedDoc.isAnonymous,
            isSponsored: fetchedDoc.isSponsored,
            caption: fetchedDoc.caption,
            userData: {
                userName: fetchedDoc.userData.userName,
                userImg: fetchedDoc.userData.userImg,
                userId: fetchedDoc.userData.userId,
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

    const getAllPostsRealtime = (status: number, setPosts: (value: IPost[]) => void) => {
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

    const onRemovePost = (postId: string, imgUrl: string) => {
        const imgId = imgUrl.replace('https://firebasestorage.googleapis.com/v0/b/eco-social-f76a1.appspot.com/o/PostsImage%2F', '').split('?')[0];
        
        const ImgSignal = onRemoveImage(imgId);

        const docRef = doc(postsCollectionRef, postId);
        const postSignal = deleteDoc(docRef)
            .then(() => {
                return 1;
            })
            .catch((err) => {
                throw err;
            });

        const promisesAll =
            Promise.all([ImgSignal, postSignal])
                .then(() => {
                    return 1;
                })
                .catch((err) => {
                    console.log(err);
                    return 0;
                });

        return promisesAll;
    }

    return { onRemovePost, getAllPostsRealtime, getAllPosts, addNewPost, initCurrentUserPost, handleViewPost, getPostToView, handleLikeUnlikePost, checkUserHaveLikedPost, setPost };
}
