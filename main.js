import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
  .requiredOption('-i, --input <path>', 'input file path')
  .option('-o, --output <path>', 'output file path')
  .option('-d, --display', 'display result in console')
  .option('-s, --survived', 'show survived passangers only')
  .option('-a, --age', 'show passangers age');

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

const lines = data.split('\n');

let passangers = lines.map(line => JSON.parse(line));

if (options.survived) {
  passangers = passangers.filter(p => p.Survived === '1');
}

if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(passangers), 'utf-8');
}

if (options.display) {
    passangers.forEach(p => {
      if (options.age) {
        console.log(`${p.Name} ${p.Age} ${p.Ticket}`);
      } else {
        console.log(`${p.Name} ${p.Ticket}`);
      }
    });
}


