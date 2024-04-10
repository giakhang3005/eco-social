import { useEffect, useState } from "react"
import "./Permissions.scss"
import { usePermissions } from "../../Services/CustomHooks/usePermissions"
import { useNavigate } from "react-router-dom"
import { GlobalConstants } from "../../Share/Constants"
import { Select, Table, message } from "antd"
import { column } from "./PermTable"
import { IUser } from "../../Model/Users"
import { useUsers } from "../../Services/CustomHooks/useUsers"
import Input from "../../Components/Input/Input"
import { validateEmail } from "../../Services/Functions/StringValidation"
import Button from "../../Components/Button/Button"
import { useLoading } from "../../Services/CustomHooks/UseLoading"

type Props = {}

const Permissions = (props: Props) => {
    const { getUserThatHavePermission, getUserByEmail, updateSomePropsOfUser } = useUsers();
    const { updateLoading } = useLoading();
    const { checkHavePerm } = usePermissions();
    const navigate = useNavigate();

    const [usersList, setUsersList] = useState<IUser[]>([]);
    const [filteredList, setFilteredList] = useState<IUser[]>([]);

    const [userEmail, setUserEmail] = useState<string>('');
    const [targetUser, setTargetUser] = useState<IUser | null>(null);

    const [permOption, setPermOption] = useState<string>(GlobalConstants.permissionsKey.points);
    const [actionOption, setActionOption] = useState<string>('add');

    useEffect(() => {
        if (!checkHavePerm(GlobalConstants.permissionsKey.perm)) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        getUserThatHavePerm();
    }, []);

    const getUserThatHavePerm = async () => {
        const signal = await getUserThatHavePermission();
        if (signal) {
            setUsersList(signal);
            setFilteredList(signal);
        }
    }

    const initPermArray = () => {
        const permsList = GlobalConstants.permissionsKey;
        const returnedPermsList: { value: string, label: string }[] = [];

        Object.keys(permsList).forEach((perm) => {
            returnedPermsList.push({ value: perm, label: perm });
        })

        return returnedPermsList;
    }

    const getUser = async () => {
        if (userEmail.trim().length === 0 || !validateEmail(userEmail) || filteredList.length > 0) return;

        const signal = await getUserByEmail(userEmail);

        if (signal) {
            setTargetUser(signal[0]);
        }
    }

    const handleInputEmail = (emailValue: string) => {
        if (emailValue.trim().length < 5) {
            setTargetUser(null);
        }

        const filtered = usersList.filter((user) => user.email.includes(emailValue));
        if (filtered.length === 1) {
            setTargetUser(filtered[0]);
        }

        setUserEmail(emailValue);
        setFilteredList(filtered);
    }

    const handleUpdatePerm = async () => {
        if (!targetUser) return;

        if (actionOption === 'add' && targetUser.permissions.includes(permOption)) {
            message.error('Người dùng đã có quyền này');
            return;
        }

        if (actionOption === 'remove' && !targetUser.permissions.includes(permOption)) {
            message.error('Người dùng không có quyền này');
            return;
        }

        updateLoading(true, 'Đang cập nhật...');

        const userPerms = [...targetUser.permissions]
        if (actionOption === 'add') {
            userPerms.push(permOption);
        } else {
            userPerms.splice(userPerms.indexOf(permOption), 1);
        }

        const updatedObject = { permissions: userPerms };
        await updateSomePropsOfUser(targetUser.id, updatedObject);

        updateLoading(false, '');
    }

    return (
        <div className="permissions">
            <div style={{ display: 'flex', margin: '20px 0 0 20px' }}>
                <Input style={{ margin: '0 10px 0 0', width: '200px' }} value={userEmail} setValue={handleInputEmail} placeholder="Email" onBlur={getUser} />
                <Select style={{ width: '100px', margin: '0 10px 0 0' }} options={[{ value: 'add', label: 'Thêm' }, { value: 'remove', label: 'Xoá' }]} value={actionOption} onChange={setActionOption} />
                <Select style={{ width: '100px', margin: '0 10px 0 0' }} defaultValue={'approval'} options={initPermArray()} value={permOption} onChange={setPermOption} />
                <Button disabled={!targetUser} onClick={handleUpdatePerm} type="primary" showIcon={false}>Thực hiện</Button>
            </div>
            {(validateEmail(userEmail) && targetUser && !usersList.includes(targetUser)) && <div style={{ margin: '5px 0 15px 20px' }}>{targetUser.name} <i>(Chưa có quyền nào)</i></div>}
            <Table key="id" columns={column} dataSource={filteredList} />
        </div>
    )
}

export default Permissions