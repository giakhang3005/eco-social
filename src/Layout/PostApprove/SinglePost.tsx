import React, { useState } from 'react'
import { IPost } from '../../Model/Posts'

type Props = {
    post: IPost;
    imgRef: any;
    imgWidth: number;

    handleUpdateStatus: (post: IPost, status: 1 | 2) => void;

}

const SinglePost = ({ post, handleUpdateStatus, imgRef, imgWidth }: Props) => {
    const [isShowMore, setIsShowMore] = useState<boolean>(false);
    
    return (
        <div className="post">
            <div className="header">
                <img src={post.userData.userImg} className="avatar" />
                <div className="info">
                    <div className="name">{post.userData.userName}</div>
                    <div className="time">{new Date(post.postTime).toLocaleString()}</div>
                </div>
            </div>
            <img src={post.imageUrl} className="postImg" loading="lazy" ref={imgRef} style={{ height: `${imgWidth}px` }} />
            <div className="caption">
                {
                    post.caption.length >= 200
                        ?
                        <>
                            {
                                isShowMore
                                    ?
                                    <>{post.caption} <b className="viewMore" onClick={() => setIsShowMore(false)}>Thu gọn</b></>
                                    :
                                    <>
                                        {post.caption.substring(0, 200)}... <b className="viewMore" onClick={() => setIsShowMore(true)} >Xem thêm</b>
                                    </>
                            }

                        </>
                        : post.caption
                }
            </div>
            <div className="btnContainer">
                <button className="decline" onClick={() => handleUpdateStatus(post, 2)}>Từ chối</button>
                <button className="approve" onClick={() => handleUpdateStatus(post, 1)}>Phê duyệt</button>
            </div>
        </div>
    )
}

export default SinglePost