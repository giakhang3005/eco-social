import { useEffect, useRef, useState } from 'react';
import 'react-image-crop/src/ReactCrop.scss'
import { useImage } from '../../Services/CustomHooks/useImage';
import ReactCrop, { makeAspectCrop, type Crop} from 'react-image-crop';
import { GlobalConstants } from '../../Share/Constants';
import Button from '../../Components/Button/Button';

type Props = {
    file: any;

    setCroppedFile: (file: any) => void;
    onClearImage: () => void;
}

const ImageCrop = ({ file, setCroppedFile, onClearImage }: Props) => {
    const { readDataAsUrl, setCanvasPreview } = useImage();

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
            1,
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
        // console.log(dataUrl)

        // const randName = new Date().getTime();
        // const currUser = getCurrentUser();

        // const croppedFile = convertDataUrlToFile(dataUrl, `${currUser?.id}_${randName}.png`);
        setCroppedFile(dataUrl);
    }

    return (
        <div>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
                <ReactCrop crop={crop} onChange={c => setCrop(c)} keepSelection aspect={1} minWidth={GlobalConstants.postImageCrop.minWidth}>
                    <img ref={imgRef} src={dataUrl} onLoad={OnImageLoad} style={currBaseOnWidth ? { width: '100%' } : { height: '65vh' }} />
                </ReactCrop>
            </div>
            <div style={Object.assign({ display: 'flex', justifyContent: 'end', margin: '10px 0 0 0' })}>
                <Button showIcon={false} onClick={onClearImage} style={{ margin: '0 10px 0 0' }}>
                    Xoá ảnh này
                </Button>
                <Button showIcon={false} type="primary" onClick={updateNewFile}>
                    Xác nhận
                </Button>
            </div>

            <canvas ref={previewCanvasRef} style={{ maxWidth: '100%' }} hidden />
        </div>
    )
}

export default ImageCrop