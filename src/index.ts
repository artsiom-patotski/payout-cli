import { program } from 'commander';
import path from 'path';

import pkg from '../package.json';

import { calculatePayments } from './payouts';
import { Options } from './index.types';
import { getFileName, parseYear } from './utils';

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version, '-v, --version')
  .option('-o, --overwrite', 'Overwrite output file if it exists', false)
  .option('-e, --excel', 'Use Excel-compatible CSV delimiter (;)', false)
  .option(
    '-y, --year <year>',
    'Year for which the payout dates will be calculated, if not specified only the rest of current year will be considered',
    parseYear,
  )
  .argument('<output-file>', 'Output file name')
  .parse();

const fileName = getFileName(program.args[0]!);
const fileNamePath = path.join(process.cwd(), fileName);
const options = program.opts() as Options;

console.log('Calculating payout dates:');
console.log(`\tyear: ${options.year || 'rest of current year'}\n\tfile: ${fileNamePath}\n`);

calculatePayments(fileNamePath, options);
