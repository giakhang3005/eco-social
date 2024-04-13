import { Col, Modal, Row, Switch, message } from "antd"
import "./NewPost.scss"
import { useEffect, useRef, useState } from "react"
import { CameraOutlined, HeartOutlined, LeftOutlined, RedoOutlined, SendOutlined } from "@ant-design/icons";
import { useImage } from "../../Services/CustomHooks/useImage";
import ImageCrop from "./ImageCrop";
import Button from "../../Components/Button/Button";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import { GlobalConstants } from "../../Share/Constants";
import { useLoading } from "../../Services/CustomHooks/UseLoading";
import { usePosts } from "../../Services/CustomHooks/usePosts";
import { useSessionStorage } from "../../Services/CustomHooks/useSesstionStorage";

const NewPosts = () => {
  const { handleImage, checkLoadedImg, resizeImage, getBase64Size, onResizeBase64 } = useImage();
  const { getCurrentUser } = useUsers();
  const { updateLoading } = useLoading();
  const { addNewPost } = usePosts();
  const { setToSessionStorage, removeFromSessionStorage } = useSessionStorage();

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const [file, setFile] = useState<any>(null);
  const [croppedFile, setCroppedFile] = useState<any>(null);
  const [imgRatioErr, setImgRatioErr] = useState<boolean>(true);

  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>('');

  const [updatedSizeAlready, setUpdatedSizeAlready] = useState<boolean>(false);

  const [dropZoneWidth, setDropZoneWidth] = useState<number>(0);

  useEffect(() => {
    const dropZone = dropZoneRef.current;

    if (!dropZone) return;

    setDropZoneWidth(dropZone.clientWidth)
  }, []);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) navigate('/');
  }, []);

  useEffect(() => {
    if (croppedFile) {
      setToSessionStorage(GlobalConstants.sessionStorageKeys.isCreateNewPost, true)
    }
  }, [croppedFile])

  const handleNextStep = async () => {
    if (currentStep === 3) {
      updateLoading(true, "Đang đăng bài...");

      let uploadedFile = croppedFile;
      if (getBase64Size(croppedFile) >= 1000000) {
        uploadedFile = await onResizeBase64(croppedFile);
      }

      const status = await addNewPost(uploadedFile, caption, isAnonymous);

      if (status) {
        message.success('Đăng thành công');
        removeFromSessionStorage(GlobalConstants.sessionStorageKeys.isCreateNewPost);
        navigate('/profile');
      } else {
        message.error('Đăng thất bại');
      }
      updateLoading(false, '');
      return;
    }
    setCurrentStep(currentStep + 1);
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  }

  const handleDragOver = (e: any) => {
    setIsDraggingOver(true);
    e.preventDefault();
  }

  const handleDragLeave = (e: any) => {
    setIsDraggingOver(false);
  }

  const handleDrop = async (e: any) => {
    setIsDraggingOver(false);
    setUpdatedSizeAlready(false);
    e.preventDefault();

    const currFiles = e.dataTransfer.files;

    if (currFiles.length === 0) return;

    setCroppedFile(null);
    setImgRatioErr(true);

    const resultFile = await handleImage(currFiles);

    if (resultFile) {
      setFile(resultFile);
    }
  }

  const handleChange = async (e: any) => {
    const currFiles = e.target.files;

    if (currFiles.length === 0) return;

    setImgRatioErr(true);
    setCroppedFile(null);
    setUpdatedSizeAlready(false);

    const resultFile = await handleImage(currFiles);

    if (resultFile) {
      setFile(resultFile);
    }
  }

  const checkNaturalSize = (e: any) => {
    if (updatedSizeAlready) return;

    let target = e.currentTarget;
    const result = checkLoadedImg(target);

    setImgRatioErr(result);
    if (result) {
      setFile(null);
      return;
    }

    if (croppedFile) return;

    const { naturalWidth, naturalHeight } = target;

    if (naturalWidth > 3000) {
      setUpdatedSizeAlready(true);
      const newImg = resizeImage(target, 1200);
      setFile(newImg);
    }
  }

  const onRecrop = (e: any) => {
    setCroppedFile(null);
  }

  const onClearImage = () => {
    setFile(null);
    setCroppedFile(null);
  }

  return (
    <div className="newPost">
      <Modal open={file && !croppedFile && !imgRatioErr} footer={null} title="Cắt ảnh" closable={false} className="modalCrop">
        <ImageCrop file={file} setCroppedFile={setCroppedFile} onClearImage={onClearImage} />
      </Modal>

      <Row>
        <Col span={1} md={4}></Col>
        <Col span={22} md={14} className="mainArea">
          <div className="headerArea">
            <div className="title">Tạo bài viết</div>
          </div>
          <div className="btnContainer">
            {
              currentStep > 1 &&
              <Button style={{ position: 'absolute', left: '-10px' }} icon={<LeftOutlined />} showIcon={true} hideBorder disabled={!croppedFile} onClick={handleBack}><span style={{ fontSize: '15px' }}>Quay lại</span></Button>
            }
            <Button style={{ position: 'absolute', right: '0' }} showIcon={false} hideBorder type="primary" disabled={!croppedFile} onClick={handleNextStep}><span style={{ fontSize: '15px' }}>{currentStep === 3 ? "Đăng" : "Tiếp"}</span></Button>
          </div>
          {
            // Step 1: Add image
            currentStep === 1
              ? <>
                <div
                  ref={dropZoneRef}
                  className={`dropZone ${isDraggingOver && 'IsDragFileOver'}`}
                  style={{height: `${dropZoneWidth}px`}}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                >


                  {file
                    ? <img src={croppedFile ? croppedFile : URL.createObjectURL(file)} className="previewImg" alt="No img" onLoad={(e) => checkNaturalSize(e)} />
                    :
                    <div className="instruction">
                      <CameraOutlined className="icon" />
                      <div className="text">Chạm hoặc kéo thả ảnh vào ô này để tải ảnh lên (tối đa 5 mb)</div>
                    </div>}


                  <input type="file" onChange={(e) => handleChange(e)} ref={inputRef} hidden />
                </div>

                {
                  file &&
                  <>
                    <div className="changeFile_text">Chạm hoặc kéo thả ảnh vào ảnh phía trên để đổi ảnh (tối đa 5 mb)</div>
                    <div className="btnContainer">
                      <Button onClick={onRecrop} icon={<RedoOutlined />}>Cắt lại</Button>
                    </div>
                  </>
                }
              </>

              // Step 2: Add content & options
              :
              currentStep === 2
                ?
                <div>
                  <div className="anonyContainer">
                    Đăng ẩn danh <Switch className="switch" value={isAnonymous} onChange={(e) => setIsAnonymous(e)} />
                  </div>
                  <Input value={caption} setValue={setCaption} textarea style={{ width: '90%', height: '200px' }} placeholder="Bạn đang nghĩ gì? (không bắt buộc)" max={2200} />
                </div>

                // Step 3: Preview & post
                :
                <div className="step3">
                  <div className="step3_container">
                    <div className="infoContainer">
                      <img src={isAnonymous ? GlobalConstants.postOption.anonyImgUrl : getCurrentUser()?.imgUrl} className="avatar" />
                      <div className="infor">
                        <div className="name">{isAnonymous ? GlobalConstants.postOption.anonyName : getCurrentUser()?.name}</div>
                        <div className="time">{new Date().toLocaleString()}</div>
                      </div>
                    </div>
                    <img src={croppedFile} className="previewImage" />
                    <div className="previewCaption">{caption}</div>
                    <div className="actionCon">
                      <HeartOutlined className="actionIcon" />
                      <SendOutlined className="actionIcon" />
                    </div>
                  </div>
                </div>
          }

        </Col>
        <Col span={1} md={6}></Col>
      </Row>
    </div>
  )
}

export default NewPosts