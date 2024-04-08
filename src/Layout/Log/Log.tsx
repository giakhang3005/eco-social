import { useEffect, useState } from "react";
import { useLog } from "../../Services/CustomHooks/useLog"
import "./Log.scss"
import { Select, Table } from "antd";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { GlobalConstants } from "../../Share/Constants";
import { useNavigate } from "react-router-dom";
import { approvalColumns, pointsColumn } from "./TableColumns";

const Log = () => {
    const { getPointsLog, getApprovalLog } = useLog();
    const { getCurrentUser } = useUsers();
    const navigate = useNavigate();

    const [currViewLog, setCurrViewLog] = useState<string>('points');
    const viewValue = ['points', 'approval']

    const [pointsLog, setPointsLog] = useState<any>(null);

    const [approvalLog, setApprovalLog] = useState<any>(null);

    useEffect(() => {
        switch (currViewLog) {
            case 'points':
                getPointsLogs();
                break;
            case 'approval':
                getApprovalLogs();
                break;
        }
    }, [currViewLog]);

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (currentUser && currentUser?.permissions?.includes(GlobalConstants.permissionsKey.log)) return;

        navigate('/')
    }, [getCurrentUser()])

    const getPointsLogs = async () => {
        if (pointsLog) return;

        const log = await getPointsLog();
        setPointsLog(log);
    }

    const getApprovalLogs = async () => {
        if (approvalLog) return;

        const log = await getApprovalLog();
        setApprovalLog(log);
    }

    return (
        <div className="pointsLogContainer">
            <Select value={currViewLog} onChange={(e) => setCurrViewLog(e)} options={viewValue.map((val) => ({ value: val, label: val }))} style={{margin: '10px 0 0 20px', width: '110px'}} />
            <Table columns={currViewLog === 'points' ? pointsColumn : approvalColumns} dataSource={currViewLog === 'points' ? pointsLog : approvalLog} />
        </div>
    )
}

export default Log