import { useEffect, useState } from "react";
import "./NetworkNotify.scss"
import { WifiOutlined } from "@ant-design/icons"
import { checkingNetwork } from "../../Services/Functions/DeviceMethods";

type Props = {}

const NetworkNotify = (props: Props) => {
    const [conenctionStatus, setConnectionStatus] = useState<boolean>(true);

    useEffect(() => {
        checkingNetwork(setConnectionStatus);
    }, []);

    return (
        <>
            {!conenctionStatus && <div className='networkNotify'>
                <WifiOutlined className="icon" />
                <div className='text'>Không có kết nối Internet</div>
            </div>}
        </>
    )
}

export default NetworkNotify