import { IUser } from "../../Model/Users";

export const column = [
    {
        key: 'id',
        title: 'ID',
        render: (user: IUser) => (
            <>{user.id}</>
        )
    },
    {
        key: 'name',
        title: 'Tên',
        render: (user: IUser) => (
            <>{user.name}</>
        )
    },
    {
        key: 'email',
        title: 'Email',
        render: (user: IUser) => (
            <>{user.email}</>
        )
    },
    {
        key: 'perm',
        title: 'Quyền',
        render: (user: IUser) => (
            user.permissions.map((perm, i) => (
                <div style={{margin: '0 5px 0 0'}}>{perm}</div>
            ))
        )
    },
    // {
    //     key: 'edit',
    //     title: 'Điều chỉnh',
    //     // render: (user: IUser) => (
    //     //     user.permissions.map((perm, i) => (
    //     //         <div style={{margin: '0 5px 0 0'}}>{perm}</div>
    //     //     )
    //     //     )
    //     // )
    // },
]