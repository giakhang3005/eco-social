import Button from '../../Components/Button/Button'
import { useUsers } from '../../Services/CustomHooks/useUsers'
import { useLoading } from '../../Services/CustomHooks/UseLoading'
import { useExcel } from '../../Services/CustomHooks/useExcel'
import { usePermissions } from '../../Services/CustomHooks/usePermissions'
import { GlobalConstants } from '../../Share/Constants'

type Props = {}

const ExportCsgPointsData = (props: Props) => {
    const { getCsgMember, getAllUsers } = useUsers();
    const { checkHavePerm } = usePermissions();
    const { updateLoading } = useLoading();
    const { exportExcel } = useExcel();

    const onExport = async () => {
        updateLoading(true, "Đang trích xuất...");

        const csgMembersList = await getCsgMember();

        if (!csgMembersList) {
            updateLoading(false, "Đang trích xuất...");
            return;
        }

        updateLoading(true, "Đang tải...");
        const currTime = new Date();

        const sortedByEcoScoreCsgMembersList = csgMembersList
            .sort((a, b) => b.points - a.points)
            .map((user) => (
                {
                    name: user.name,
                    mssv: user.mssv,
                    points: user.points,
                }
            ));

        const exportedTime = `${currTime.getHours()}:${currTime.getMinutes()}:${currTime.getSeconds()} _ ${currTime.getDate()}/${currTime.getMonth()}/${currTime.getFullYear()}`
        const exportedData = [{ exportedTime: exportedTime }, ...sortedByEcoScoreCsgMembersList]

        const excelName = `CSG_Eco_Points_${currTime.getTime()}`;


        await exportExcel(exportedData, 'Data Eco Points CSG', excelName);
        updateLoading(false, "");
    }

    const onExportAllData = async () => {
        updateLoading(true, "Đang trích xuất...");

        const allMembersList = await getAllUsers();

        if (!allMembersList) {
            updateLoading(false, "Đang trích xuất...");
            return;
        }

        updateLoading(true, "Đang tải...");
        const currTime = new Date();

        const formatedList = allMembersList
            .map((data) => (
                {
                    mssv: data.mssv,
                    name: data.name,
                    email: data.email,
                    points: data.points,
                    joinDate: data.joinDate,
                    avatar: data.imgUrl
                }
            ))
            .sort((a, b) => a.points - b.points);

        const exportedTime = `${currTime.getHours()}:${currTime.getMinutes()}:${currTime.getSeconds()} _ ${currTime.getDate()}/${currTime.getMonth()}/${currTime.getFullYear()}`
        const exportedData = [{ exportedTime: exportedTime }, ...formatedList]

        const excelName = `CSG_Eco_Data_${currTime.getTime()}`;


        await exportExcel(exportedData, 'Data Eco Social', excelName);
        updateLoading(false, "");
    }

    return (
        <>
            {checkHavePerm(GlobalConstants.permissionsKey.export) &&
                (
                    <>
                        <Button onClick={onExport} showIcon={false} showText style={{ margin: '0 0 0 20px' }}>Export Data CSG</Button>
                        <Button onClick={onExportAllData} showIcon={false} showText style={{ margin: '0 0 0 20px' }}>Export All Data</Button>
                    </>
                )
            }
        </>
    )
}

export default ExportCsgPointsData