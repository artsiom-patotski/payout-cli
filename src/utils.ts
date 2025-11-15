import commander from 'commander';

export const parseYear = (value: string) => {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue) || parsedValue < 2000) {
    throw new commander.InvalidArgumentError('Not a number or less than 2000.');
  }

  return parsedValue;
};

export const getFileName = (value: string): string => (value.indexOf('.') > -1 ? value : `${value}.csv`);

export const getSalaryDate = (year: number, month: number): string => {
  // default target for salary payment (0-day of next month, which is equivalent to last day of target month)
  const salaryDate = new Date(year, month + 1, 0);

  // If last day is Saturday(6) or Sunday(0), move to the previous Friday
  if (salaryDate.getDay() === 0 || salaryDate.getDay() === 6) {
    const offset = salaryDate.getDay() === 6 ? 1 : 2;
    salaryDate.setDate(salaryDate.getDate() - offset);
  }

  return salaryDate.toLocaleString('en', { dateStyle: 'long' });
};

export const getBonusDate = (year: number, month: number): string => {
  // default bonus payment date for the month
  const bonusDate = new Date(year, month, 15);

  // If 15th is Saturday(6) or Sunday(0), move to the next Wednesday
  if (bonusDate.getDay() === 0 || bonusDate.getDay() === 6) {
    const offset = bonusDate.getDay() === 6 ? 4 : 3;
    bonusDate.setDate(bonusDate.getDate() + offset);
  }

  return bonusDate.toLocaleString('en', { dateStyle: 'long' });
};

// Ensure CSV values are safe (handle delimiters in values)
export const getSafeCSVValue = (value: string, delimiter: string): string => (value.includes(delimiter) ? `"${value}"` : value);
