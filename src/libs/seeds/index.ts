import * as fs from 'fs';
import * as path from 'path';

const directory = path.join(__dirname, '..', '..', 'seeds');
try {
  fs.lstatSync(directory);
} catch (e) {
  fs.mkdirSync(directory);
}
let seeds = {};

fs
  .readdirSync(directory)
  .filter(file => {
    return (file.indexOf('.') !== 0)/*&& (file !== basename)*/ && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const seed = require(path.join(directory, file));
    seeds[seed.name] = seed.seeds;
  });

export default seeds;
