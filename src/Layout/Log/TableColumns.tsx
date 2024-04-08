import { Popover } from "antd"

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
                <>{log?.change}</>
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
                <>{log?.approveTime}</>
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
                <>{log?.status === 1 ? 'Phê duyệt' : 'Từ chối'}</>
            )
        }
    }
]