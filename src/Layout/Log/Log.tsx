import { useEffect, useState } from "react";
import { useLog } from "../../Services/CustomHooks/useLog"
import "./Log.scss"
import { Select, Table } from "antd";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { GlobalConstants } from "../../Share/Constants";
import { useNavigate } from "react-router-dom";
import { approvalColumns, gameColumns, pointsColumn } from "./TableColumns";

const Log = () => {
    const { getPointsLog, getApprovalLog, getGameLog } = useLog();
    const { getCurrentUser } = useUsers();
    const navigate = useNavigate();

    const [currViewLog, setCurrViewLog] = useState<string>('points');
    const viewValue = ['points', 'approval', 'game']

    const [pointsLog, setPointsLog] = useState<any>(null);

    const [approvalLog, setApprovalLog] = useState<any>(null);

    const [gameLog, setGameLog] = useState<any>(null);

    useEffect(() => {
        switch (currViewLog) {
            case 'points':
                getPointsLogs();
                break;
            case 'approval':
                getApprovalLogs();
                break;
            case 'game':
                getGameLogs();
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

    const getGameLogs = async () => {
        if (gameLog) return;

        const signal = await getGameLog();
        setGameLog(signal);
    }

    return (
        <div className="pointsLogContainer">
            <Select value={currViewLog} onChange={(e) => setCurrViewLog(e)} options={viewValue.map((val) => ({ value: val, label: val }))} style={{ margin: '10px 0 0 20px', width: '110px' }} />
            <Table style={{marginBottom: '200px'}} columns={currViewLog === 'points' ? pointsColumn : currViewLog === 'approval' ? approvalColumns : gameColumns} dataSource={currViewLog === 'points' ? pointsLog : currViewLog === 'approval' ? approvalLog : gameLog} />
        </div>
    )
}

export default Log