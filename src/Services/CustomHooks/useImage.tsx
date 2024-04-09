import { message } from "antd";
import { useLoading } from "./UseLoading";
import heic2any from "heic2any";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../Firebase/FirebaseCfg";
import { useUsers } from "./useUsers";

export const useImage = () => {
    const { updateLoading } = useLoading();
    const { getCurrentUser } = useUsers();

    const handleImage = async (currFiles: any) => {
        // Check amount of image user upload (allow 1)
        if (currFiles.length > 1 ) return;

        updateLoading(true, "Đang tải ảnh lên...");
        const uploadFile = currFiles[0];

        // const data = await readDataAsUrl(uploadFile);
        // console.log(data)
        if(!uploadFile || !uploadFile.type) return;

        let finalFile = null;

        if (uploadFile.type.split("/")[0] !== "image") {
            message.error('Bạn vui lòng chỉ tải ảnh lên');
        } else {
            const type = uploadFile.type.split("/")[1].toUpperCase()
            if (type === "HEIC" || type === "HEIF") {
                const convertedFile = await convertHeicFile(uploadFile);
                finalFile = convertedFile;
            } else {
                finalFile = uploadFile;
            }

            // Check size
            if (finalFile.size > 5000 * 1000) {
                message.error('File ảnh quá lớn, vui lòng chọn ảnh khác hoặc cắt ảnh nhỏ lại');
                finalFile = null;
            }
        }

        updateLoading(false, "");
        return finalFile;
    }

    const convertHeicFile = async (file: any) => {
        let blobURL = URL.createObjectURL(file);

        // convert "fetch" the new blob url
        let blobRes = await fetch(blobURL)

        // convert response to blob
        let blob = await blobRes.blob()

        // convert to PNG - response is blob
        let conversionResult = await heic2any({
            blob,
            toType: "image/jpeg",
        });

        return conversionResult;
    }

    const readDataAsUrl = async (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const resultUrl = new Promise(resolve => {
            reader.onload = () => {
                resolve(reader.result);
            }
        });

        return resultUrl;
    }

    const checkLoadedImg = (target: any) => {
        const { naturalWidth, naturalHeight } = target;

        const min = Math.min(naturalWidth, naturalHeight);
        const max = Math.max(naturalWidth, naturalHeight);

        let isError: boolean = false;

        if (max / min >= 19 / 6) {
            message.error('Tỉ lệ ảnh của bạn quá chênh lệch (tối đa 19:6 hoặc 6:19), vui lòng chọn ảnh khác');
            isError = true;
        }

        return isError;
    }

    const setCanvasPreview = (
        image: any, // HTMLImageElement
        canvas: any, // HTMLCanvasElement
        crop: any // PixelCrop
    ) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("No 2d context");
        }

        // devicePixelRatio slightly increases sharpness on retina devices
        // at the expense of slightly slower render times and needing to
        // size the image back down if you want to download/upload and be
        // true to the images natural size.
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = "high";
        ctx.save();

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;

        // Move the crop origin to the canvas origin (0,0)
        ctx.translate(-cropX, -cropY);
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight
        );

        ctx.restore();
    };

    const convertDataUrlToFile = (dataUrl: string, filename: string) => {
        var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/);
        if (arr && mime) {
            var mimeSingle = mime[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, { type: mimeSingle });
        }

    }

    const resizeImage = (image: any, maxWidth: number) => {
        // Create a canvas element
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        const ratio = image.naturalWidth / image.naturalHeight;

        const newWidth = maxWidth * ratio;
        const newHeight = newWidth / ratio;

        // Set the canvas dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the image onto the canvas with the scaled dimensions
        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Extract the resized image as a data URL
        var resizedDataURL = canvas.toDataURL('image/jpeg');

        // Return the resized image data URL
        return convertDataUrlToFile(resizedDataURL, 'test123');
    }

    const uploadImage = (file: any) => {
        const uploadImgRef = ref(firebaseStorage, `PostsImage/${getCurrentUser()?.id}_${new Date().getTime()}`);
        return uploadBytes(uploadImgRef, file)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .catch((err) => console.log(err))
    }

    return { handleImage, readDataAsUrl, checkLoadedImg, setCanvasPreview, convertDataUrlToFile, resizeImage, uploadImage }
}