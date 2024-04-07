import { Col, Modal, Row, Switch } from "antd"
import "./NewPost.scss"
import { useEffect, useRef, useState } from "react"
import { CameraOutlined, HeartOutlined, RedoOutlined, SendOutlined } from "@ant-design/icons";
import { useImage } from "../../Services/CustomHooks/useImage";
import ImageCrop from "./ImageCrop";
import Button from "../../Components/Button/Button";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import { GlobalConstants } from "../../Share/Constants";

const NewPosts = () => {
  const { handleImage, checkLoadedImg, resizeImage } = useImage();
  const { getCurrentUser } = useUsers();

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

  useEffect(() => {
    const dropZone = dropZoneRef.current;

    if (!dropZone) return;

    dropZone.style.height = `${dropZone.clientWidth}px`;
  }, []);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) navigate('/');
  })

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
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
    e.preventDefault();

    setCroppedFile(null);
    setImgRatioErr(true);

    const currFiles = e.dataTransfer.files;
    const resultFile = await handleImage(currFiles);

    if (resultFile) {
      setFile(resultFile);
    }
  }

  const handleChange = async (e: any) => {
    setImgRatioErr(true);
    setCroppedFile(null);

    const currFiles = e.target.files;
    const resultFile = await handleImage(currFiles);

    if (resultFile) {
      setFile(resultFile)
    }
  }

  const checkNaturalSize = (e: any) => {
    let target = e.currentTarget;
    const result = checkLoadedImg(target);

    setImgRatioErr(result)
    if (result) {
      setFile(null);
      return;
    }

    if (croppedFile) return;

    const { naturalWidth, naturalHeight } = target;

    if (naturalWidth > 1200) {
      const newImg = resizeImage(target, 1200);
      setFile(newImg);
    }
  }

  const onRecrop = (e: any) => {
    setCroppedFile(null);
  }

  return (
    <div className="newPost">
      <Modal open={file && !croppedFile && !imgRatioErr} footer={null} title="Cắt ảnh" closable={false}>
        <ImageCrop file={file} setCroppedFile={setCroppedFile} />
      </Modal>

      <Row>
        <Col span={1} md={4}></Col>
        <Col span={22} md={14} className="mainArea">
          <div className="headerArea">
            <div className="title">Tạo bài viết</div>
            <Button showIcon={false} hideBorder disabled={!croppedFile} onClick={handleNextStep}>{currentStep === 3 ? "Đăng" : "Tiếp"}</Button>
          </div>

          {
            // Step 1: Add image
            currentStep === 1
              ? <>
                <div
                  ref={dropZoneRef}
                  className={`dropZone ${isDraggingOver && 'IsDragFileOver'}`}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                >


                  {file
                    ? <img src={URL.createObjectURL(croppedFile ? croppedFile : file)} className="previewImg" alt="No img" onLoad={(e) => checkNaturalSize(e)} />
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
                  <Input value={caption} setValue={setCaption} textarea style={{ width: '90%', height: '200px' }} placeholder="Bạn đang nghĩ gì? (không bắt buộc)" />
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
                    <img src={URL.createObjectURL(croppedFile)} className="previewImage" />
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