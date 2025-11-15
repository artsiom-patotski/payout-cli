import { getBonusDate, getFileName, getSafeCSVValue, getSalaryDate, parseYear } from './utils';

describe('Utilities', () => {
  describe('parseYear', () => {
    it('should parse valid year strings correctly', () => {
      const year = parseYear('2023');
      expect(year).toBe(2023);
    });

    it.each(['1999', 'nan'])('should throw an error for invalid year strings', (invalidYear) => {
      expect(() => parseYear(invalidYear)).toThrow();
    });
  });

  describe('getFileName', () => {
    it('should return the same filename if it contains an extension', () => {
      const fileName = getFileName('output.txt');
      expect(fileName).toBe('output.txt');
    });

    it('should append .csv extension if missing', () => {
      const fileName = getFileName('output');
      expect(fileName).toBe('output.csv');
    });
  });

  describe('getSalaryDate', () => {
    it('should return last day of month if it is not a weekday', () => {
      const result = getSalaryDate(2025, 8); // September 2025 - Tuesday
      expect(result).toBe('September 30, 2025');
    });

    it('should return previous Friday if last day is Saturday', () => {
      const result = getSalaryDate(2025, 4); // May 2025 - Saturday
      expect(result).toBe('May 30, 2025');
    });

    it('should return previous Friday if last day is Sunday', () => {
      const result = getSalaryDate(2025, 10); // November 2025 - Sunday
      expect(result).toBe('November 28, 2025');
    });
  });

  describe('getBonusDate', () => {
    it('should return 15th of month if it is a weekday', () => {
      const result = getBonusDate(2025, 8); // September 2025 - Monday
      expect(result).toBe('September 15, 2025');
    });

    it('should return next Wednesday if 15th is Saturday', () => {
      const result = getBonusDate(2025, 10); // November 2025 - Saturday
      expect(result).toBe('November 19, 2025');
    });

    it('should return next Wednesday if 15th is Sunday', () => {
      const result = getBonusDate(2025, 5); // June 2025 - Sunday
      expect(result).toBe('June 18, 2025');
    });
  });

  describe('getSafeCSVValue', () => {
    it('should return value as is if it does not contain delimiter', () => {
      const result = getSafeCSVValue('Hello World', ',');
      expect(result).toBe('Hello World');
    });

    it('should wrap value in quotes if it contains delimiter', () => {
      const result = getSafeCSVValue('Hello, World', ',');
      expect(result).toBe('"Hello, World"');
    });
  });
});
