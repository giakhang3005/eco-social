import { message } from "antd";
import { useLoading } from "./UseLoading";
import heic2any from "heic2any";

export const useImage = () => {
    const { updateLoading } = useLoading();

    const handleImage = async (currFiles: any) => {
        // Check amount of image user upload (allow 1)
        if (currFiles.length > 1) return;

        updateLoading(true, "Đang tải ảnh lên...");
        const uploadFile = currFiles[0];

        let finalFile = null;

        if (uploadFile.type.split("/")[0] !== "image") {
            message.error('Bạn vui lòng chỉ tải ảnh lên');
        } else {
            if (uploadFile.type.split("/")[1] === "heic") {
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

    return { handleImage }
}