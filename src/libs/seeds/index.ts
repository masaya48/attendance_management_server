import * as fs from 'fs';
import * as path from 'path';
module.exports = () => {
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
      // console.log('===============');
      // console.log(file);
      // console.log('===============');
      const seed = require(path.join(directory, file));
      // console.log(seed);
      seeds[seed.name] = seed.seeds;
    });

  return seeds;
}