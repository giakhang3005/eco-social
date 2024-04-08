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

    const [currBaseOnWidth, setCurrBaseOnWidth] = useState<any>();

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

        setCurrBaseOnWidth(naturalWidth > naturalHeight);
        
        // Create crop zone
        const currImgCrop = makeAspectCrop({
            unit: "px",
            width: GlobalConstants.postImageCrop.minWidth,
            height: GlobalConstants.postImageCrop.minWidth,
        },
            GlobalConstants.postImageCrop.ratio,
            width,
            height
        );

        // Make crop zone to center of image
        // const centeredCrop = centerCrop(currImgCrop, width, height);

        setCrop(currImgCrop);
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
            <div style={{justifyContent: 'center', display: 'flex'}}>
                <ReactCrop crop={crop} onChange={c => setCrop(c)} keepSelection aspect={1} minWidth={GlobalConstants.postImageCrop.minWidth} minHeight={GlobalConstants.postImageCrop.minWidth}>
                    <img ref={imgRef} src={dataUrl} onLoad={OnImageLoad} style={currBaseOnWidth ? { width: '100%' } : { height: '65vh' }} />
                </ReactCrop>
            </div>
            <div style={Object.assign({ display: 'flex', justifyContent: 'end', margin: '10px 0 0 0' })}>
                <Button showIcon={false} type="primary" onClick={updateNewFile}>
                    Xác nhận
                </Button>
            </div>

            <canvas ref={previewCanvasRef} style={{ maxWidth: '100%' }} hidden />
        </div>
    )
}

export default ImageCrop