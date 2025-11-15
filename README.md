# Payout CLI

A command-line tool for calculating and generating payout dates (salary and bonus payments) in CSV format.

## Installation

```bash
npm ci
```

## Usage

### Build the project

```bash
npm run build
```

### Basic Usage

Generate payout dates for the remaining months of the current year:

```bash
npm run payout payouts.csv
```

Or using the typescript version directly:

```bash
npm run payout:ts -- payouts.csv
```

**Note:** if you're using PowerShell, you might need to use additional `--` to properly pass arguments:

```bash
npm run payout:ts -- -- payouts.csv
```

### Options

- `-y, --year <year>` - Specify a year (must be 2000 or later). If not provided, calculates for the remaining months of the current year.
- `-o, --overwrite` - Overwrite the output file if it already exists (default: false)
- `-e, --excel` - Use Excel-compatible CSV delimiter (`;` instead of `,`)
- `-v, --version` - Display version information

### Examples

Calculate payout dates for the entire year 2024:

```bash
npm run payout -- -y 2024 payouts.csv
```

Generate Excel-compatible CSV:

```bash
npm run payout -- -e -y 2024 payouts.csv
```

Overwrite existing file:

```bash
npm run payout -- -o -y 2024 payouts.csv
```

Combine multiple options:

```bash
npm run payout -- -o -e -y 2025 payouts.csv
```

## Output Format

The generated CSV file contains three columns:

| Month     | Salary Payment Date | Bonus Payment Date  |
|-----------|---------------------|---------------------|
| January   | January 1, 2000     | January 1, 2000     |
| February  | February 1, 2000    | February 1, 2000    |
| ...       | ...                 | ...                 |

## Development

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run tests with Jest
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Fix linting issues automatically

## Testing

Run the test suite:

```bash
npm test
```
