import Excel from "exceljs";
import { saveAs } from "file-saver";

export const saveExcel = async (data, columns) => {
    const makeData = data.map((i, index) => {
        return { index: index + 1, ...i };
    });

    const workSheetName = "Worksheet-1";
    const workBookName = "Отчет";
    const workbook = new Excel.Workbook();
    try {
        const fileName = workBookName;

        // creating one worksheet in workbook
        const worksheet = workbook.addWorksheet(workSheetName);

        // add worksheet columns
        // each columns contains header and its mapping key from data
        worksheet.columns = columns;

        // updated the font for first row.
        worksheet.getRow(1).font = { bold: true };

        // loop through all of the columns and set the alignment with width.
        worksheet.columns.forEach((column) => {
            column.width = column.header.length + 10;
            column.alignment = { horizontal: "center" };
        });

        // loop through data and add each one to worksheet
        makeData.forEach((singleData) => {
            worksheet.addRow(singleData);
        });

        // loop through all of the rows and set the outline style.
        worksheet.eachRow({ includeEmpty: false }, (row) => {
            // store each cell to currentCell
            const currentCell = row._cells;

            // loop through currentCell to apply border only for the non-empty cell of excel
            currentCell.forEach((singleCell) => {
                // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
                const cellAddress = singleCell._address;

                // apply border
                worksheet.getCell(cellAddress).border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
        });

        // write the content using writeBuffer
        const buf = await workbook.xlsx.writeBuffer();

        // download the processed file
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
        console.error("<<<ERRROR>>>", error);
        console.error("Something Went Wrong", error.message);
    } finally {
        // removing worksheet's instance to create new one
        workbook.removeWorksheet(workSheetName);
    }
};
