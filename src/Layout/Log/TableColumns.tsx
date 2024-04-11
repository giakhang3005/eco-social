import { Popover, Tag } from "antd"

export const pointsColumn = [
    {
        key: 'time',
        title: 'Thời gian',
        render: (log: any) => {
            return (
                <>{log?.executeTime}</>
            )
        }
    },
    {
        key: 'executedUser',
        title: 'Thực hiện bởi',
        render: (log: any) => {
            return (
                <Popover
                    content={<div>
                        <div><b>ID:</b> {log?.executedUser?.id}</div>
                        <div><b>Tên:</b> {log?.executedUser?.name}</div>
                        <div><b>Email:</b> {log?.executedUser?.email}</div>
                    </div>}
                >
                    <div style={{ cursor: 'help' }}>{log?.executedUser?.name}</div>
                </Popover>
            )
        }
    },
    {
        key: 'targetUser',
        title: 'Đối tượng',
        render: (log: any) => {
            return (
                <Popover
                    content={<div>
                        <div><b>ID:</b> {log?.targetUser?.id}</div>
                        <div><b>Tên:</b> {log?.targetUser?.name}</div>
                        <div><b>Email:</b> {log?.targetUser?.email}</div>
                    </div>}
                >
                    <div style={{ cursor: 'help' }}>{log?.targetUser?.name}</div>
                </Popover>
            )
        }
    },
    {
        key: 'change',
        title: 'Thay đổi',
        render: (log: any) => {
            return (
                <Tag color={log?.change.includes('+') ? 'green' : 'red'}>{log?.change}</Tag>
            )
        }
    },
    {
        key: 'note',
        title: 'Note',
        render: (log: any) => {
            return (
                <>{log?.note}</>
            )
        }
    }
]

export const approvalColumns = [
    {
        key: 'time',
        title: 'Thời gian',
        render: (log: any) => {
            return (
                <>{new Date(Number(log?.approveTime)).toLocaleString()}</>
            )
        }
    },
    {
        key: 'executedUser',
        title: 'Thực hiện bởi',
        render: (log: any) => {
            return (
                <Popover
                    content={<div>
                        <div><b>ID:</b> {log?.approver?.id}</div>
                        <div><b>Tên:</b> {log?.approver?.name}</div>
                        <div><b>Email:</b> {log?.approver?.email}</div>
                    </div>}
                >
                    <div style={{ cursor: 'help' }}>{log?.approver?.name}</div>
                </Popover>
            )
        }
    },
    {
        key: 'postid',
        title: 'Post ID',
        render: (log: any) => {
            return (
                <>{log?.postId}</>
            )
        }
    },
    {
        key: 'status',
        title: 'Trạng thái',
        render: (log: any) => {
            return (
                <Tag color={log?.status === 1 ? 'green' : 'red'}>{log?.status === 1 ? 'Phê duyệt' : 'Từ chối'}</Tag>
            )
        }
    }
]

export const gameColumns = [
    {
        key: 'time',
        title: 'Thời gian',
        render: (log: any) => {
            return (
                <>{new Date(log.time).toLocaleString()}</>
            )
        }
    },
    {
        key: 'executedUser',
        title: 'Thực hiện bởi',
        render: (log: any) => {
            return (
                <Popover
                    content={<div>
                        <div><b>ID:</b> {log?.executer?.id}</div>
                        <div><b>Tên:</b> {log?.executer?.name}</div>
                        <div><b>Email:</b> {log?.executer?.email}</div>
                    </div>}
                >
                    <div style={{ cursor: 'help' }}>{log?.executer?.name}</div>
                </Popover>
            )
        }
    },
    {
        key: 'target',
        title: 'Người chơi',
        render: (log: any) => {
            return (
                <Popover
                    content={<div>
                        <div><b>ID:</b> {log?.targetUser?.id}</div>
                        <div><b>Tên:</b> {log?.targetUser?.name}</div>
                        <div><b>Email:</b> {log?.targetUser?.email}</div>
                    </div>}
                >
                    <div style={{ cursor: 'help' }}>{log?.targetUser?.name}</div>
                </Popover>
            )
        }
    },
    {
        key: 'prev',
        title: 'Trước',
        render: (log: any) => {
            return (
                <>
                    <Tag color={log.beforeChange.game1 ? 'green' : 'red'}>Game 1</Tag>
                    <Tag color={log.beforeChange.game2 ? 'green' : 'red'}>Game 2</Tag>
                    <Tag color={log.beforeChange.game3 ? 'green' : 'red'}>Game 3</Tag>
                </>
            )
        }
    },
    {
        key: 'after',
        title: 'Sau',
        render: (log: any) => {
            return (
                <>
                    <Tag color={log.afterChange.game1 ? 'green' : 'red'}>Game 1</Tag>
                    <Tag color={log.afterChange.game2 ? 'green' : 'red'}>Game 2</Tag>
                    <Tag color={log.afterChange.game3 ? 'green' : 'red'}>Game 3</Tag>
                </>
            )
        }
    }
]