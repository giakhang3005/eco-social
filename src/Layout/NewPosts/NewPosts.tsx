import { Col, Row } from "antd"
import "./NewPost.scss"
import { useEffect, useRef, useState } from "react"
import { useLoading } from "../../Services/CustomHooks/UseLoading";
import { CameraOutlined } from "@ant-design/icons";
import { useImage } from "../../Services/CustomHooks/useImage";

const NewPosts = () => {
  const { handleImage } = useImage();

  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<any>(null);

  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const handleDragOver = (e: any) => {
    setIsDraggingOver(true);
    console.log('dragging over');
    e.preventDefault();
  }

  const handleDragLeave = (e: any) => {
    setIsDraggingOver(false);
    console.log('dragging leave');
  }

  const handleDrop = async (e: any) => {
    setIsDraggingOver(false);
    e.preventDefault();

    const currFiles = e.dataTransfer.files;
    const resultFile = await handleImage(currFiles);

    if (resultFile) {
      setFile(resultFile)
    }
  }

  const handleChange = async (e: any) => {
    const currFiles = e.target.files;
    const resultFile = await handleImage(currFiles);

    if (resultFile) {
      setFile(resultFile)
    }
  }

  return (
    <div className="newPost">
      <Row>
        <Col span={1} md={4}></Col>
        <Col span={22} md={14} className="mainArea">
          <div className="title">Tạo bài viết</div>

          <div className={`dropZone ${isDraggingOver && 'IsDragFileOver'}`} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => inputRef.current?.click()}>

            {
              file
                ? <img src={URL.createObjectURL(file)} className="previewImg" alt="No img" />
                :
                <div className="instruction">
                  <CameraOutlined className="icon" />
                  <div className="text">Chạm hoặc kéo thả ảnh vào ô này để tải ảnh lên (tối đa 5 mb)</div>
                </div>
            }



            <input type="file" onChange={(e) => handleChange(e)} ref={inputRef} hidden />
          </div>

          {file && <div className="changeFile_text">Chạm hoặc kéo thả ảnh vào ảnh phía trên để đổi ảnh (tối đa 5 mb)</div>}

        </Col>
        <Col span={1} md={6}></Col>
      </Row>
    </div>
  )
}

export default NewPosts