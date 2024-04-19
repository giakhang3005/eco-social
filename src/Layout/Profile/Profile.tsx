import { Row, Col, Modal } from "antd";
import "./Profile.scss";
import Avatar from "../../Components/Avatar/Avatar";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../Model/Users";
import { CalendarOutlined, MailOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { IPost } from "../../Model/Posts";
import SkeletonPosts from "../../Components/SkeletonPosts/SkeletonPosts";
import Empty from "../../Components/Empty/Empty";
import { usePosts } from "../../Services/CustomHooks/usePosts";
import { IContext } from "../../Model/Others";
import { Data } from "../Layout";
import { ActivityData } from "../../Share/Data/ActivityData";

const notCompleteColor = 'red';
const completeColor = 'green';
const done = 'Đã xong';
const notDone = 'Chưa xong';

const Profile = () => {
    const { currentUserPosts } = useContext(Data) as IContext;
    const { handleViewPost } = usePosts();
    const { getCurrentUser } = useUsers();
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser | null>(getCurrentUser());

    const [postContainerWidth, setPostContainerWidth] = useState<number>(0);

    const [currentModalView, setCurrentModalView] = useState<any>(null);


    useEffect(() => {
        const gotUser = getCurrentUser();

        if (!gotUser) {
            navigate('/');
        } else {
            setUser(gotUser);
        }
    }, [getCurrentUser()]);


    useEffect(() => {
        handleSizeChange();
        window.addEventListener('resize', handleSizeChange);

        return () => window.removeEventListener('resize', handleSizeChange);
    }, []);

    const handleSizeChange = () => {
        const postContainer = document.querySelector('.postContainer');

        if (!postContainer) return;

        setPostContainerWidth(postContainer?.clientWidth);
    }

    const handleViewDescript = (id: string) => {
        let activity
        if (id === 'ecoPoint') {
            activity = {
                title: 'Điểm môi trường',
                content: 'Điểm môi trường sẽ được tích từ hoạt động Cuộc đua quyên góp. Với từng mốc điểm cụ thể, người chơi có thể tham gia đổi quà tại Quầy đổi điểm trong khu vực diễn ra sự kiện.'
            }
        } else {
            activity = ActivityData.find(activity => activity.id === id);
        }
        setCurrentModalView(activity);
    }

    return (
        <div className="ProfileContainer">

            <Modal title={currentModalView?.title} open={currentModalView} onCancel={() => setCurrentModalView(null)} footer={null}>
                {currentModalView?.content}
            </Modal>

            <Row className="Profile">
                <Col span={0} md={3}></Col>

                {/* PROFILE INFORMATIONS */}
                <Col span={12} md={9} className="halfLeft">
                    <Avatar src={getCurrentUser()?.imgUrl} style={window.innerWidth < 768 ? { width: '80px' } : { width: '170px' }} align="left" />
                    <ul className="infoContainer">
                        <li>{user?.name}</li>
                        <li><MailOutlined className="icon" /> {user?.email}</li>
                        <li><UserOutlined className="icon" /> {user?.mssv} {user?.isCsgMember && <i className="csgMember">(CSG Member)</i>} </li>
                        <li><CalendarOutlined className="icon" /> {user?.joinDate}</li>
                    </ul>
                </Col>

                <Col span={12} className="halfRight">
                    {/* ECO POINTS */}
                    <div className="pointsContainer">
                        <div className="points">
                            <div className="points_number">{user?.points}</div>
                            <div className="points_text">Điểm môi trường</div>
                        </div>
                    </div>
                    <div className="questionIcon" onClick={() => handleViewDescript('ecoPoint')}>?</div>

                    {/* GAME STATUS */}
                    <ul className="gamesList">
                        <li>Minigame <div className="questionIcon" onClick={() => handleViewDescript('minigame')}>?</div></li>
                        <li>Game 1: <div className="status" style={{ color: user?.minigame.game1 ? completeColor : notCompleteColor }}>{user?.minigame.game1 ? done : notDone}</div></li>
                        <li>Game 2: <div className="status" style={{ color: user?.minigame.game2 ? completeColor : notCompleteColor }}>{user?.minigame.game2 ? done : notDone}</div></li>
                        <li>Game 3: <div className="status" style={{ color: user?.minigame.game3 ? completeColor : notCompleteColor }}>{user?.minigame.game3 ? done : notDone}</div></li>
                    </ul>
                </Col>
            </Row>

            <Row>
                {/* POSTS */}
                <Col span={24} md={22} className="postContainer">
                    {/* Skeleton Posts */}
                    {/* <SkeletonPosts postContainerWidth={postContainerWidth}/> */}
                    {
                        currentUserPosts.length === 0
                            ? <Empty />
                            :
                            <>
                                {
                                    currentUserPosts.map((post, i) => (
                                        <div className="postReview" key={i} onClick={() => handleViewPost(post)}>
                                            <div className="time">{new Date(Number(post.postTime)).toLocaleString()}</div>
                                            <img style={{ height: `${postContainerWidth / 3}px` }} src={post.imageUrl} loading="lazy" />
                                        </div>
                                    ))
                                }
                            </>

                    }

                </Col>
                {/* <Col span={3}></Col> */}
            </Row>

        </div>
    )
}

export default Profile