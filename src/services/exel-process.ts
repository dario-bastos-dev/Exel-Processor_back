import ExcelJS from 'exceljs';
import path from 'path';
import prisma from '../prisma';

export const processExcelFile = async (fileId: string, columnIndex: number, searchValues: string[]) => {
  const excelFile = await prisma.excelFile.findUnique({ where: { id: fileId } });
  if (!excelFile) {
    throw new Error('File not found');
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path.resolve(excelFile.path));
  const worksheet = workbook.worksheets[0];

  const headers: string[] = [];
  const data: any[][] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell) => headers.push(cell.text));
    } else {
      const rowData: any[] = [];
      row.eachCell({ includeEmpty: true }, (cell) => rowData.push(cell.text));
      data.push(rowData);
    }
  });

  const searchResults = data.filter(row => {
    const cellValue = row[columnIndex]?.toString().trim().toLowerCase();
    return searchValues.some(searchValue =>
      cellValue === searchValue.trim().toLowerCase()
    );
  });

  return { headers, searchResults };
};
