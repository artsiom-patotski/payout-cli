import fs from 'fs';

import { Options, OutputItem } from './index.types';
import { getBonusDate, getSafeCSVValue, getSalaryDate } from './utils';

const CSV_DELIMITER = ',';
const CSV_DELIMITER_EXCEL = ';';
const CSV_FIELDS: Record<keyof OutputItem, string> = {
  monthName: 'Month',
  salaryDate: 'Salary Payment Date',
  bonusDate: 'Bonus Payment Date',
};

export const saveFile = async (filePath: string, data: OutputItem[], delimiter: string) => {
  const head = [CSV_FIELDS.monthName, CSV_FIELDS.salaryDate, CSV_FIELDS.bonusDate].join(delimiter);
  const dataRows = data.map((row) => {
    const rowValues = [
      getSafeCSVValue(row.monthName, delimiter),
      getSafeCSVValue(row.salaryDate, delimiter),
      getSafeCSVValue(row.bonusDate, delimiter),
    ];
    return rowValues.join(delimiter);
  });

  const csvContent = [head, ...dataRows].join('\n');
  await fs.promises.writeFile(filePath, csvContent, { encoding: 'utf-8' });
};

export const calculatePayments = async (outFilePath: string, options: Options) => {
  const { overwrite, year, excel } = options;

  // Check if file exists, throw error if overwrite is false
  if (!overwrite && fs.existsSync(outFilePath)) {
    console.error(`[ERROR] File ${outFilePath} already exists. Use overwrite option to replace it.`);
    return;
  }

  const result: OutputItem[] = [];
  const targetYear = year || new Date().getFullYear();
  const startMonth = year ? 0 : new Date().getMonth();

  // Calculate payout dates for each month
  for (let month = startMonth; month < 12; month++) {
    result.push({
      monthName: new Date(targetYear, month).toLocaleString('en', { month: 'long' }),
      salaryDate: getSalaryDate(targetYear, month),
      bonusDate: getBonusDate(targetYear, month),
    });
  }

  await saveFile(outFilePath, result, excel ? CSV_DELIMITER_EXCEL : CSV_DELIMITER);

  console.log(`[COMPLETED] File saved to ${outFilePath}`);
};
