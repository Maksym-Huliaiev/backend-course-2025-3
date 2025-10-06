import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
  .requiredOption('-i, --input <path>', 'input file path')
  .option('-o, --output <path>', 'output file path')
  .option('-d, --display', 'display result in console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

const data = fs.readFileSync(options.input, 'utf-8');

if (options.output) {
  fs.writeFileSync(options.output, data, 'utf-8');
}

if (options.display) {
  console.log(data);
}


