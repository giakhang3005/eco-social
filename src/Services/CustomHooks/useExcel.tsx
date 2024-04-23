// @ts-ignore
import * as XLSX from "xlsx/xlsx.mjs";

export const useExcel = () => {

    function getBase64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const exportExcel = (data: any, nameSheet: string, nameFile: string) => {
        return new Promise((resolve, reject) => {
            let wb = XLSX.utils.book_new();

            let ws = XLSX.utils.json_to_sheet(data);
            // let ws2 = data2 !== undefined && XLSX.utils.json_to_sheet(data2);
            // let ws3 = data3 !== undefined && XLSX.utils.json_to_sheet(data3);

            XLSX.utils.book_append_sheet(wb, ws, nameSheet);
            // nameSheet2 !== undefined && XLSX.utils.book_append_sheet(wb, ws2, nameSheet2);
            // nameSheet3 !== undefined && XLSX.utils.book_append_sheet(wb, ws3, nameSheet3);

            XLSX.writeFile(wb, `${nameFile}.xlsx`);
            resolve("ok");
        });
    };

    const readExcelFile = (file: any, setFile: any) => {
        const reader = new FileReader();

        reader.onload = e => {
            if (!e || !e.target) return;

            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            // console.log('Excel Data:', excelData);

            // Now you have 'excelData' that you can use or further process
            // message.success('Excel file read successfully');
            setFile(excelData)
        };

        reader.readAsBinaryString(file);
    };

    return { exportExcel, readExcelFile };
};