import { useEffect, useState } from "react";
import { useLog } from "../../Services/CustomHooks/useLog"
import "./Log.scss"
import { Col, Popover, Row, Table } from "antd";

type Props = {}

const Log = (props: Props) => {
    const { getPointsLog } = useLog();
    const [pointsLog, setPointsLog] = useState<any>();

    useEffect(() => {
        getLogs();
    }, []);

    const getLogs = async () => {
        const log = await getPointsLog()
        setPointsLog(log)
    }

    const columns = [
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
                        <div style={{cursor: 'help'}}>{log?.executedUser?.name}</div>
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
                        <div style={{cursor: 'help'}}>{log?.targetUser?.name}</div>
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

    return (
        <div className="pointsLogContainer">
            <Table columns={columns} dataSource={pointsLog} />
        </div>
    )
}

export default Log