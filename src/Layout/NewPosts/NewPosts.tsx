import { Col, Modal, Row } from "antd"
import "./NewPost.scss"
import { useEffect, useRef, useState } from "react"
import { CameraOutlined, RedoOutlined } from "@ant-design/icons";
import { useImage } from "../../Services/CustomHooks/useImage";
import ImageCrop from "./ImageCrop";
import Button from "../../Components/Button/Button";
import { useUsers } from "../../Services/CustomHooks/useUsers";
import { useNavigate } from "react-router-dom";

// TODO: Check ảnh coi chiều rộng lớn hơn thì size base on rộng, dài thì base on dài

//TODO: File ảnh chụp bằng cam điện thoại crop ra không được

const NewPosts = () => {
  const { handleImage, checkLoadedImg } = useImage();
  const { getCurrentUser } = useUsers();

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<any>(null);
  const [croppedFile, setCroppedFile] = useState<any>(null);

  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const [imgRatioErr, setImgRatioErr] = useState<boolean>(true);

  useEffect(() => {
    const dropZone = dropZoneRef.current;

    if (!dropZone) return;

    dropZone.style.height = `${dropZone.clientWidth}px`;
  }, []);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) navigate('/');
  })

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
    const target = e.currentTarget;

    const result = checkLoadedImg(target);

    setImgRatioErr(result)
    if (result) setFile(null);
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
          <div className="title">Tạo bài viết</div>

          <div
            ref={dropZoneRef}
            className={`dropZone ${isDraggingOver && 'IsDragFileOver'}`}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >

            {
              file
                ? <img src={URL.createObjectURL(croppedFile ? croppedFile : file)} className="previewImg" alt="No img" onLoad={checkNaturalSize} />
                :
                <div className="instruction">
                  <CameraOutlined className="icon" />
                  <div className="text">Chạm hoặc kéo thả ảnh vào ô này để tải ảnh lên (tối đa 5 mb)</div>
                </div>
            }

            <input type="file" onChange={(e) => handleChange(e)} ref={inputRef} hidden />
          </div>

          {file && <>
            <div className="changeFile_text">Chạm hoặc kéo thả ảnh vào ảnh phía trên để đổi ảnh (tối đa 5 mb)</div>
            <div className="btnContainer">
              <Button onClick={onRecrop} icon={<RedoOutlined />}>Cắt lại</Button>
            </div>
          </>}

        </Col>
        <Col span={1} md={6}></Col>
      </Row>
    </div>
  )
}

export default NewPosts