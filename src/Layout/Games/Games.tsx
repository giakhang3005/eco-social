import { useEffect, useState } from "react";
import "./Games.scss";
import { IUser } from "../../Model/Users";
import { validateEmail } from "../../Services/Functions/StringValidation";
import { Select, Table, message } from "antd";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { IGameLog } from "../../Model/Logs";
import { useLoading } from "../../Services/CustomHooks/UseLoading";
import { useLog } from "../../Services/CustomHooks/useLog";
import { usePermissions } from "../../Services/CustomHooks/usePermissions";
import { useNavigate } from "react-router-dom";
import { GlobalConstants } from "../../Share/Constants";

type Props = {}

const changedOptions = [
    {
        value: false,
        label: 'Chưa tham gia'
    },
    {
        value: true,
        label: 'Đã tham gia'
    }
]

const Games = (props: Props) => {
    const { getCurrentUser, updateUser, getUserByEmail } = useUsers();
    const { checkHavePerm } = usePermissions();
    const { updateLoading } = useLoading();
    const { saveGameStatusLog } = useLog();
    const navigate = useNavigate();

    const [previousInput, setPreviousInput] = useState<string>("");
    const [currentInput, setCurrentInput] = useState<string>("");

    const [previousTargetUser, setPreviousTargetUser] = useState<IUser | undefined>(undefined);
    const [targetUser, setTargetUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        if (!checkHavePerm(GlobalConstants.permissionsKey.booth)) {
            navigate("/");
        }
    }, []);

    const validateTargetUser = async () => {
        setPreviousInput(currentInput)
        if (currentInput === previousInput) return
        if (currentInput.trim().length === 0 || !validateEmail(currentInput)) {
            setTargetUser(undefined);
            return;
        }

        const signal = await getUserByEmail(currentInput);
        if (signal) {
            setTargetUser(signal[0]);
            setPreviousTargetUser(signal[0]);
        } else {
            setTargetUser(undefined);
            setPreviousTargetUser(undefined);
            message.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại');
        }
    }

    const onUpdateGameStatus = (gameNo: 'game1' | 'game2' | 'game3', newStatus: boolean) => {
        if (!targetUser) return;
        const minigame = { ...targetUser.minigame };

        minigame[gameNo] = newStatus;

        setTargetUser({ ...targetUser, minigame });
    }

    const checkNotChange = () => {
        if (!targetUser || !previousTargetUser) return true;

        const prevMiniGame = previousTargetUser.minigame;
        const miniGame = targetUser.minigame;

        if (prevMiniGame.game1 === miniGame.game1 && prevMiniGame.game2 === miniGame.game2 && prevMiniGame.game3 === miniGame.game3) return true;

        return false;
    }

    const onSubmit = () => {
        const currentUser = getCurrentUser();

        if (!currentUser || !targetUser || !previousTargetUser) return;

        updateLoading(true, 'Đang cập nhật');

        const gameLog: IGameLog = {
            time: new Date().getTime(),
            executer: {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email
            },
            targetUser: {
                id: targetUser.id,
                name: targetUser.name,
                email: targetUser.email
            },
            beforeChange: previousTargetUser.minigame,
            afterChange: targetUser.minigame
        }

        Promise.all([updateUser(targetUser), saveGameStatusLog(gameLog)])
            .then(() => {
                setCurrentInput('');
                setPreviousInput('');
                setPreviousTargetUser(targetUser);
                setTargetUser(undefined);
                message.success('Cập nhật thành công');
            })
            .catch((err) => {
                console.log(err);
                message.error('Đã có lỗi xảy ra, vui lòng thử lại');
            })
            .finally(() => {
                updateLoading(false);
            })


    }

    const columns = [
        {
            key: 'name',
            title: 'Tên',
            render: (user: any) => {
                return (
                    <>{user.name}</>
                )
            }
        },
        {
            key: 'mssv',
            title: 'MSSV',
            render: (user: any) => {
                return (
                    <>{user.mssv}</>
                )
            }
        },
        {
            key: 'game1',
            title: 'Game 1',
            render: (user: any) => {
                return (
                    <Select onChange={(newVal) => onUpdateGameStatus('game1', newVal)} value={user.minigame.game1} options={changedOptions}></Select>
                )
            }
        },
        {
            key: 'game2',
            title: 'Game 2',
            render: (user: any) => {
                return (
                    <Select onChange={(newVal) => onUpdateGameStatus('game2', newVal)} value={user.minigame.game2} options={changedOptions}></Select>
                )
            }
        },
        {
            key: 'game3',
            title: 'Game 3',
            render: (user: any) => {
                return (
                    <Select onChange={(newVal) => onUpdateGameStatus('game3', newVal)} value={user.minigame.game3} options={changedOptions}></Select>
                )
            }
        },
    ]

    return (
        <div className="games">
            <div className="title">MINIGAME</div>
            <div className="InputContainer">
                <div className="label">Email:</div>
                <Input style={{ width: '300px' }} value={currentInput} setValue={setCurrentInput} onBlur={validateTargetUser} placeholder="cocsaigon@gmail.com" />
            </div>
            {
                (targetUser && previousTargetUser) &&
                <>
                    <Table columns={columns} dataSource={[targetUser]} pagination={false}></Table>
                    <Button disabled={checkNotChange()} onClick={onSubmit} showIcon={false} style={{ margin: '25px 0 0 20px', width: '95%' }} type="primary">Cập nhật</Button>
                </>
            }

        </div>
    )
}

export default Games