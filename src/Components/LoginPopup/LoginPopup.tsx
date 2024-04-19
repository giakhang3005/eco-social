import "./LoginPopup.scss";
import { useAuth } from "../../Services/CustomHooks/useAuth";
import { GoogleOutlined } from "@ant-design/icons";
import Button from "../Button/Button";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import { validateMssv } from "../../Services/Functions/StringValidation";
import { message } from "antd";
import { IUser } from "../../Model/Users";
import { useLoading } from "../../Services/CustomHooks/UseLoading";

type Props = {}

const LoginPopup = (props: Props) => {
  const { handleSigninWithGG } = useAuth();
  const { getCurrentUser, updateUser, checkCsgMemberByMssv } = useUsers();
  const { updateLoading } = useLoading();

  const [mssv, setMssv] = useState<string>('');

  const handleNext = async () => {
    const result = validateMssv(mssv);

    if (!result) {
      message.error('MSSV không hợp lệ');
      return;
    }

    updateLoading(true, "Đang cập nhật");

    const currentUser: IUser | null = getCurrentUser();
    const isCsgMember: boolean = await checkCsgMemberByMssv(mssv);

    if (!currentUser) return;

    currentUser.mssv = mssv;
    currentUser.isCsgMember = isCsgMember;

    const updateStatus = await updateUser(currentUser);

    if (updateStatus) {
      window.scrollTo(0, 0);
      message.success('Cập nhật MSSV thành công');
    } else {
      message.error("Cập nhật MSSV thất bại")
    }

  }

  return (
    <div className="LoginPopup">
      <div className="Background"></div>

      <div className="LoginContainer">
        {
          !getCurrentUser()
            ?
            <>
              <div className="text">Bạn chưa tham gia, vui lòng tham gia để tiếp tục</div>
              <Button style={Object.assign({ position: 'absolute' }, { top: '80px' }, { left: '50%' }, { transform: 'translateX(-50%)' })} onClick={handleSigninWithGG} icon={<GoogleOutlined />} hideBorder={false}>Tham gia với Google</Button>
            </>
            : !getCurrentUser()?.mssv &&
            <>
              <div className="text">MSSV của bạn là</div>
              <i className="moreInfo">(Nếu bạn không học FPT, vui lòng điền tên trường - MSSV)</i>
              <div className="inputCtn">
                <Input placeholder="SE190001" value={mssv} setValue={setMssv} uppercase />
                <Button style={{margin: '0 0 0 5px'}} onClick={handleNext} showIcon={false} hideBorder>Tiếp</Button>
              </div>
              <div className="caution">MSSV sẽ dùng để đổi quà & tham gia các hoạt động offline</div>
            </>
        }
      </div>

    </div>
  )
}

export default LoginPopup