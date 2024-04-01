import { useEffect, useState } from "react"
import "./Points.scss"
import { usePermissions } from "../../Services/CustomHooks/usePermissions"
import { IUser } from "../../Model/Users"
import { validateEmail } from "../../Services/Functions/StringValidation"
import { useUsers } from "../../Services/CustomHooks/useUsers"
import Input from "../../Components/Input/Input"
import Button from "../../Components/Button/Button"
import { Col, Row, message } from "antd"
import { GlobalConstants } from "../../Share/Constants"
import { useNavigate } from "react-router-dom"
import { useLoading } from "../../Services/CustomHooks/UseLoading"
import { useLog } from "../../Services/CustomHooks/useLog"

type Props = {}

const Points = (props: Props) => {
    const { getUserByEmailRealtime, updateUser, getCurrentUser } = useUsers();
    const { LoggedPoints } = useLog();
    const { updateLoading } = useLoading();

    const navigate = useNavigate();

    const [previousInput, setPreviousInput] = useState<string>("");
    const [currentInput, setCurrentInput] = useState<string>("");

    const [currentPointInput, setCurrentPointInput] = useState<number>(0);
    const [newPointsValue, setNewPointsValue] = useState<number>(0);

    const [note, setNote] = useState<string>("");


    useEffect(() => {
        targetUser && setNewPointsValue(Number(targetUser.points) + Number(currentPointInput))
    }, [currentPointInput])

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (currentUser && currentUser?.permissions?.includes(GlobalConstants.permissionsKey.points)) return;

        navigate('/')
    }, [getCurrentUser()])

    const [targetUser, setTargetUser] = useState<IUser | undefined>(undefined);

    const validateTargetUser = () => {
        setPreviousInput(currentInput)
        if (currentInput === previousInput) return
        if (currentInput.trim().length === 0 || !validateEmail(currentInput)) {
            setTargetUser(undefined);
            return;
        }

        getUserByEmailRealtime(currentInput, setTargetUser);
    }

    const handleInteractWithPoints = async () => {
        const executedUser = getCurrentUser()
        if (!targetUser || !executedUser) return

        updateLoading(true, 'Đang cập nhật điểm...')

        const newTargetUser: IUser = {
            id: targetUser.id,
            name: targetUser.name,
            mssv: targetUser.mssv,
            email: targetUser.email,
            imgUrl: targetUser.imgUrl,
            permissions: targetUser.permissions,
            points: newPointsValue,
            joinDate: targetUser.joinDate,
        }

        const change = `${targetUser.points} ${currentPointInput > 0 ? `+ ${currentPointInput}` : currentPointInput} = ${newTargetUser.points}`

        const signal = await updateUser(newTargetUser)
        const logSignal = await LoggedPoints(executedUser, change, note, newTargetUser)

        if (signal) {
            setPreviousInput("")
            setCurrentInput("")
            setCurrentPointInput(0)
            setNote("")
            setTargetUser(undefined)
            message.success('Cập nhật thành công')
        } else {
            message.error('Cập nhật thất bại')
        }

        updateLoading(false)
    }

    const setNumber = (value: any) => {
        if (isNaN(Number(value))) return
        setCurrentPointInput(Number(value))
    }

    // Todo: Implement fetch on Blur
    // Todo: Blocked and not fetch when
    // 1. Empty
    // 2. Not match email regex
    // 3. Same as current user
    // Todo: Blocked edit email until finish (cancel or update completed)
    return (
        <div className="Points">
            <div className="title">ĐIỂM TÁI CHẾ</div>
            <div className="InputContainer">
                <div className="label">Email:</div>
                <Input style={{ width: '90%' }} value={currentInput} setValue={setCurrentInput} onBlur={validateTargetUser} placeholder="cocsaigon@gmail.com" />
            </div>

            <div className="InfoContainer">
                <div className="data"><b>Tên:</b> {!targetUser ? <span style={{ color: 'red' }}>Không tồn tại</span> : targetUser?.name}</div>
                <div className="data"><b>Điểm:</b> {targetUser?.points} {currentPointInput > 0 ? <span style={{ color: 'lime' }}>+ {currentPointInput}</span> : currentPointInput < 0 ? <span style={{ color: 'red' }}>{currentPointInput}</span> : ''} {(targetUser && currentPointInput && currentPointInput !== 0) ? `= ${newPointsValue}` : ''}</div>
            </div>
            <div className="InputContainer">
                <div className="label">Số điểm:</div>
                <Input style={{ width: '90%' }} value={currentPointInput} setValue={setNumber} />
            </div>
            <div className="InputContainer">
                <div className="label">Note:</div>
                <Input textarea style={{ width: '90%' }} value={note} setValue={setNote} />
            </div>

            <div className="BtnContainer">
                <Button disabled={note.trim().length < 5 || !targetUser || !currentPointInput || currentPointInput === 0 || newPointsValue < 0} onClick={handleInteractWithPoints} showIcon={false} type="primary">Cập nhật</Button>
            </div>



        </div>
    )
}

export default Points