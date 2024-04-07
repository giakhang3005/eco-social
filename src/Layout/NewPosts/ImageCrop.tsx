import { useEffect, useRef, useState } from 'react';
import 'react-image-crop/src/ReactCrop.scss'
import { useImage } from '../../Services/CustomHooks/useImage';
import ReactCrop, { makeAspectCrop, type Crop, centerCrop, PixelCrop } from 'react-image-crop';
import { GlobalConstants } from '../../Share/Constants';
import { message } from 'antd';
import { useUsers } from '../../Services/CustomHooks/useUsers';
import Button from '../../Components/Button/Button';

type Props = {
    file: any;
    setCroppedFile: (file: any) => void;
}

const ImageCrop = ({ file, setCroppedFile }: Props) => {
    const { readDataAsUrl, setCanvasPreview, convertDataUrlToFile } = useImage();
    const { getCurrentUser } = useUsers();

    const imgRef = useRef(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const [dataUrl, setDatUrl] = useState<any>();

    const [crop, setCrop] = useState<Crop>();

    useEffect(() => {
        convertImageToDataUrl();
    }, [file]);

    const convertImageToDataUrl = async () => {
        if (file) {
            const result = await readDataAsUrl(file);
            setDatUrl(result);
            return;
        }

        setDatUrl(null);
    }

    const OnImageLoad = (e: any) => {
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget;

        // Create crop zone
        const currImgCrop = makeAspectCrop({
            unit: "px",
            width: GlobalConstants.postImageCrop.minWidth,
        },
            GlobalConstants.postImageCrop.ratio,
            width,
            height
        );

        // Make crop zone to center of image
        const centeredCrop = centerCrop(currImgCrop, width, height);

        setCrop(centeredCrop);
    }

    const updateNewFile = () => {
        setCanvasPreview(imgRef.current, previewCanvasRef.current, crop);

        const canvas = previewCanvasRef.current;

        if (!canvas) return;

        const dataUrl = canvas.toDataURL();

        const randName = new Date().getTime();
        const currUser = getCurrentUser();

        const croppedFile = convertDataUrlToFile(dataUrl, `${currUser?.id}_${randName}.png`);
        setCroppedFile(croppedFile);
    }

    return (
        <div>
            <ReactCrop crop={crop} onChange={c => setCrop(c)} keepSelection aspect={1} minWidth={GlobalConstants.postImageCrop.minWidth}>
                <img ref={imgRef} src={dataUrl} onLoad={OnImageLoad} />
            </ReactCrop>

            <div style={{width: '100%', display: 'flex', justifyContent: 'end', margin: '10px 0 0 0'}}>
                <Button showIcon={false} type="primary" onClick={updateNewFile}>
                    Xác nhận
                </Button>
            </div>

            <canvas ref={previewCanvasRef} />
        </div>
    )
}

export default ImageCrop